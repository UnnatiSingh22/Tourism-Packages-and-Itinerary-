import { Injectable, OnModuleInit, Logger } from '@nestjs/common';
import * as Minio from 'minio';

@Injectable()
export class MinioService implements OnModuleInit {
  private readonly logger = new Logger(MinioService.name);
  private client: Minio.Client | null = null;
  private isConnected = false;
  private bucketName = 'traveler-documents';

  onModuleInit() {
    try {
      this.bucketName = process.env.MINIO_BUCKET_NAME || 'traveler-documents';
      this.client = new Minio.Client({
        endPoint: process.env.MINIO_ENDPOINT || 'localhost',
        port: parseInt(process.env.MINIO_PORT || '9000'),
        useSSL: process.env.MINIO_USE_SSL === 'true',
        accessKey: process.env.MINIO_ACCESS_KEY || 'minioadmin',
        secretKey: process.env.MINIO_SECRET_KEY || 'minioadmin',
      });

      this.isConnected = true;
      this.logger.log('MinIO initialized successfully');
      
      // Auto-create bucket if missing
      this.createBucketIfNotExist();
    } catch (error) {
      this.isConnected = false;
      this.logger.warn(`MinIO connection configuration failed: ${error.message}`);
    }
  }

  private async createBucketIfNotExist() {
    if (!this.isConnected || !this.client) return;
    try {
      const exists = await this.client.bucketExists(this.bucketName);
      if (!exists) {
        await this.client.makeBucket(this.bucketName, 'us-east-1');
        this.logger.log(`Created MinIO bucket: ${this.bucketName}`);
      }
    } catch (err) {
      this.logger.warn(`MinIO bucket creation failed: ${err.message}`);
    }
  }

  async uploadFile(fileName: string, buffer: Buffer, size: number, mimeType: string): Promise<string> {
    const objectName = `${Date.now()}-${fileName}`;
    if (!this.isConnected || !this.client) {
      this.logger.warn(`MinIO not connected. Falling back to mock URL for file: ${fileName}`);
      return `https://mock-s3-storage.eventhub360.local/${this.bucketName}/${objectName}`;
    }

    try {
      await this.client.putObject(this.bucketName, objectName, buffer, size, {
        'Content-Type': mimeType,
      });
      const protocol = process.env.MINIO_USE_SSL === 'true' ? 'https' : 'http';
      const host = process.env.MINIO_ENDPOINT || 'localhost';
      const port = process.env.MINIO_PORT || '9000';
      return `${protocol}://${host}:${port}/${this.bucketName}/${objectName}`;
    } catch (err) {
      this.logger.error(`Failed uploading object to MinIO: ${err.message}`);
      return `https://mock-s3-storage.eventhub360.local/${this.bucketName}/${objectName}`;
    }
  }
}
