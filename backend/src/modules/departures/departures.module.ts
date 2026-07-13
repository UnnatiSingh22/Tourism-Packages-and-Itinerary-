import { Module } from '@nestjs/common';
import { DeparturesController } from './departures.controller';
import { DeparturesService } from './departures.service';
import { QueueModule } from '../../queues/queue.module';

@Module({
  imports: [QueueModule],
  controllers: [DeparturesController],
  providers: [DeparturesService],
  exports: [DeparturesService],
})
export class DeparturesModule {}
