import { Injectable, OnModuleInit, Logger } from '@nestjs/common';
import { Queue } from 'bullmq';
import { RedisService } from '../redis/redis.service';

@Injectable()
export class QueueService implements OnModuleInit {
  private readonly logger = new Logger(QueueService.name);
  private queues: Map<string, Queue> = new Map();

  constructor(private readonly redisService: RedisService) {}

  onModuleInit() {
    const redisClient = this.redisService.getClient();
    if (!redisClient) {
      this.logger.warn('Redis is not initialized. BullMQ background queues will not function.');
      return;
    }

    const queueNames = [
      'departure-cutoff',
      'passport-expiry',
      'waitlist-promotion',
      'voucher-generation',
      'automation-execution',
    ];

    for (const name of queueNames) {
      try {
        const queue = new Queue(name, {
          connection: redisClient as any,
        });
        this.queues.set(name, queue);
        this.logger.log(`Queue ${name} initialized`);
      } catch (err) {
        this.logger.error(`Failed to initialize queue ${name}: ${err.message}`);
      }
    }
  }

  async addJob(queueName: string, jobName: string, data: any, opts?: any): Promise<any> {
    const queue = this.queues.get(queueName);
    if (!queue) {
      this.logger.warn(`Queue ${queueName} not available. Processing job ${jobName} synchronously or dropping.`);
      return null;
    }
    try {
      const job = await queue.add(jobName, data, opts);
      this.logger.log(`Job ${jobName} added to queue ${queueName} with ID ${job.id}`);
      return job;
    } catch (err) {
      this.logger.error(`Error adding job to queue ${queueName}: ${err.message}`);
      return null;
    }
  }
}
