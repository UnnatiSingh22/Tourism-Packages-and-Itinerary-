import { Injectable, OnModuleInit, OnModuleDestroy, Logger } from '@nestjs/common';
import Redis from 'ioredis';

@Injectable()
export class RedisService implements OnModuleInit, OnModuleDestroy {
  private readonly logger = new Logger(RedisService.name);
  private client: Redis | null = null;
  private isConnected = false;

  onModuleInit() {
    const redisUrl = process.env.REDIS_URL || 'redis://localhost:6379';
    try {
      this.client = new Redis(redisUrl, {
        maxRetriesPerRequest: 3,
        enableOfflineQueue: false,
      });

      this.client.on('connect', () => {
        this.isConnected = true;
        this.logger.log('Redis connected successfully');
      });

      this.client.on('error', (err) => {
        this.isConnected = false;
        this.logger.warn(`Redis connection failed: ${err.message}`);
      });
    } catch (error) {
      this.logger.warn(`Could not initialize Redis client: ${error.message}`);
    }
  }

  async get(key: string): Promise<string | null> {
    if (!this.isConnected || !this.client) {
      return null;
    }
    try {
      return await this.client.get(key);
    } catch (error) {
      this.logger.error(`Error reading key ${key} from Redis: ${error.message}`);
      return null;
    }
  }

  async set(key: string, value: string, ttlSeconds?: number): Promise<void> {
    if (!this.isConnected || !this.client) {
      return;
    }
    try {
      if (ttlSeconds) {
        await this.client.set(key, value, 'EX', ttlSeconds);
      } else {
        await this.client.set(key, value);
      }
    } catch (error) {
      this.logger.error(`Error writing key ${key} to Redis: ${error.message}`);
    }
  }

  async del(key: string): Promise<void> {
    if (!this.isConnected || !this.client) {
      return;
    }
    try {
      await this.client.del(key);
    } catch (error) {
      this.logger.error(`Error deleting key ${key} from Redis: ${error.message}`);
    }
  }

  getClient(): Redis | null {
    return this.client;
  }

  onModuleDestroy() {
    if (this.client) {
      this.client.disconnect();
    }
  }
}
