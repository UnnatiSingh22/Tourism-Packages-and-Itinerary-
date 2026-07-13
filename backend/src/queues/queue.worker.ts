import { Injectable, OnModuleInit, OnModuleDestroy, Logger, Inject, forwardRef } from '@nestjs/common';
import { Worker, Job } from 'bullmq';
import { RedisService } from '../redis/redis.service';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class QueueWorker implements OnModuleInit, OnModuleDestroy {
  private readonly logger = new Logger(QueueWorker.name);
  private workers: Worker[] = [];

  constructor(
    private readonly redisService: RedisService,
    private readonly prisma: PrismaService,
  ) {}

  onModuleInit() {
    const redisClient = this.redisService.getClient();
    if (!redisClient) {
      this.logger.warn('Redis not connected. Workers will not start.');
      return;
    }

    const queueConfigs = [
      { name: 'departure-cutoff', handler: this.handleDepartureCutoff.bind(this) },
      { name: 'passport-expiry', handler: this.handlePassportExpiry.bind(this) },
      { name: 'waitlist-promotion', handler: this.handleWaitlistPromotion.bind(this) },
      { name: 'voucher-generation', handler: this.handleVoucherGeneration.bind(this) },
      { name: 'automation-execution', handler: this.handleAutomationExecution.bind(this) },
    ];

    for (const config of queueConfigs) {
      try {
        const worker = new Worker(config.name, async (job) => {
          this.logger.log(`Starting job ${job.name} [ID: ${job.id}] in queue ${config.name}`);
          try {
            await config.handler(job);
            this.logger.log(`Completed job ${job.name} [ID: ${job.id}]`);
          } catch (error) {
            this.logger.error(`Error executing job ${job.name} in queue ${config.name}: ${error.message}`);
            throw error;
          }
        }, {
          connection: redisClient as any,
        });

        this.workers.push(worker);
      } catch (err) {
        this.logger.error(`Failed to register worker for ${config.name}: ${err.message}`);
      }
    }
  }

  // 1. Cutoff: Auto close departures
  private async handleDepartureCutoff(job: Job) {
    const { departureId, tenantId } = job.data;
    this.logger.log(`Processing departure cutoff for departure ${departureId}`);
    await this.prisma.departure.update({
      where: { id: departureId },
      data: { status: 'CLOSED' },
    });
    // Record audit trail
    await this.prisma.auditTrail.create({
      data: {
        tenantId,
        userId: 'system',
        action: 'CLOSE_CUTOFF',
        entityName: 'Departure',
        entityId: departureId,
        newValues: { status: 'CLOSED' },
      },
    });
  }

  // 2. Compliance check for upcoming expirations
  private async handlePassportExpiry(job: Job) {
    const { travelerId, departureId, tenantId } = job.data;
    this.logger.log(`Processing passport expiry verification for traveler ${travelerId}`);
    const traveler = await this.prisma.traveler.findUnique({
      where: { id: travelerId },
    });
    const departure = await this.prisma.departure.findUnique({
      where: { id: departureId },
    });

    if (!traveler || !departure) return;

    const expiryLimit = new Date(departure.startDate);
    expiryLimit.setMonth(expiryLimit.getMonth() + 6);

    const isCompliant = new Date(traveler.passportExpiry) >= expiryLimit;
    const complianceStatus = isCompliant ? 'clear' : 'blocked';

    await this.prisma.traveler.update({
      where: { id: travelerId },
      data: { complianceStatus },
    });
  }

  // 3. Promote a traveler from the waitlist
  private async handleWaitlistPromotion(job: Job) {
    const { waitlistId, tenantId } = job.data;
    this.logger.log(`Processing waitlist promotion for waitlist record ${waitlistId}`);
    
    await this.prisma.$transaction(async (tx) => {
      const waitlist = await tx.departureWaitlist.findUnique({
        where: { id: waitlistId },
        include: { departure: true, traveler: true },
      });

      if (!waitlist || waitlist.status !== 'PENDING') return;

      if (waitlist.departure.availableCapacity > 0) {
        // Promote waitlist
        await tx.departureWaitlist.update({
          where: { id: waitlistId },
          data: { status: 'PROMOTED' },
        });

        // Update traveler status
        await tx.traveler.update({
          where: { id: waitlist.travelerId },
          data: { status: 'BOOKED' },
        });

        // Decrease available capacity
        await tx.departure.update({
          where: { id: waitlist.departureId },
          data: { availableCapacity: { decrement: 1 } },
        });
      }
    }).catch(err => {
      this.logger.error(`Failed transaction in waitlist promotion: ${err.message}`);
    });
  }

  // 4. Voucher generation
  private async handleVoucherGeneration(job: Job) {
    const { travelerId, departureId, tenantId } = job.data;
    this.logger.log(`Generating voucher for traveler ${travelerId}`);

    const traveler = await this.prisma.traveler.findUnique({
      where: { id: travelerId },
    });

    if (!traveler || traveler.complianceStatus !== 'clear') {
      this.logger.warn(`Traveler ${travelerId} compliance is not clear. Skipping voucher generation.`);
      return;
    }

    const voucherCode = `VOU-${Date.now()}-${traveler.passportNumber.slice(-4).toUpperCase()}`;

    await this.prisma.voucher.create({
      data: {
        tenantId,
        travelerId,
        departureId,
        voucherCode,
        status: 'ISSUED',
        details: `Auto-generated voucher for departure: ${departureId}`,
      },
    });
  }

  // 5. Automation execution
  private async handleAutomationExecution(job: Job) {
    const { ruleId, tenantId } = job.data;
    this.logger.log(`Executing automation rule ${ruleId}`);
    const rule = await this.prisma.automationRule.findUnique({
      where: { id: ruleId },
    });

    if (!rule || !rule.isActive) return;

    try {
      // Execute dummy action or trigger email
      await this.prisma.automationLog.create({
        data: {
          tenantId,
          ruleId,
          status: 'SUCCESS',
          message: `Automation execution completed. Action: ${rule.actionType}`,
        },
      });
    } catch (err) {
      await this.prisma.automationLog.create({
        data: {
          tenantId,
          ruleId,
          status: 'FAILED',
          message: `Automation execution failed: ${err.message}`,
        },
      });
    }
  }

  onModuleDestroy() {
    for (const worker of this.workers) {
      worker.close();
    }
  }
}
