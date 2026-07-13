import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { RedisModule } from './redis/redis.module';
import { QueueModule } from './queues/queue.module';
import { SocketModule } from './sockets/socket.module';
import { MinioModule } from './shared/minio.module';
import { AuthModule } from './auth/auth.module';
import { PackagesModule } from './modules/packages/packages.module';
import { ItineraryModule } from './modules/itinerary/itinerary.module';
import { DeparturesModule } from './modules/departures/departures.module';
import { TravelersModule } from './modules/travelers/travelers.module';
import { SuppliersModule } from './modules/suppliers/suppliers.module';
import { VouchersModule } from './modules/vouchers/vouchers.module';
import { CostingModule } from './modules/costing/costing.module';
import { ReportsModule } from './modules/reports/reports.module';
import { AutomationModule } from './modules/automation/automation.module';

@Module({
  imports: [
    PrismaModule,
    RedisModule,
    QueueModule,
    SocketModule,
    MinioModule,
    AuthModule,
    PackagesModule,
    ItineraryModule,
    DeparturesModule,
    TravelersModule,
    SuppliersModule,
    VouchersModule,
    CostingModule,
    ReportsModule,
    AutomationModule,
  ],
})
export class AppModule {}
