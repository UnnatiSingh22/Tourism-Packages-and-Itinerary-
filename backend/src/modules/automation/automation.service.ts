import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { QueueService } from '../../queues/queue.service';
import { CreateRuleDto } from './dto/automation.dto';
import { PaginationDto } from '../../common/pagination/pagination.dto';

@Injectable()
export class AutomationService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly queueService: QueueService,
  ) {}

  async listRules(tenantId: string, pagination: PaginationDto) {
    const { page, limit, search } = pagination;
    const skip = (page - 1) * limit;

    const where: any = {
      tenantId,
    };

    if (search) {
      where.name = { contains: search, mode: 'insensitive' };
    }

    const [total, data] = await Promise.all([
      this.prisma.automationRule.count({ where }),
      this.prisma.automationRule.findMany({
        where,
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' },
      }),
    ]);

    return {
      data,
      pagination: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  async createRule(tenantId: string, dto: CreateRuleDto) {
    const rule = await this.prisma.automationRule.create({
      data: {
        tenantId,
        name: dto.name,
        triggerType: dto.triggerType,
        actionType: dto.actionType,
        conditions: dto.conditions || {},
        isActive: dto.isActive ?? true,
      },
    });

    // If active, we can trigger a scheduled job if it runs periodically
    if (rule.isActive) {
      await this.queueService.addJob('automation-execution', 'AutomationExecutionJob', {
        ruleId: rule.id,
        tenantId,
      });
    }

    return rule;
  }

  async getLogs(tenantId: string, pagination: PaginationDto) {
    const { page, limit } = pagination;
    const skip = (page - 1) * limit;

    const [total, data] = await Promise.all([
      this.prisma.automationLog.count({ where: { tenantId } }),
      this.prisma.automationLog.findMany({
        where: { tenantId },
        skip,
        take: limit,
        orderBy: { executedAt: 'desc' },
      }),
    ]);

    return {
      data,
      pagination: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    };
  }
}
