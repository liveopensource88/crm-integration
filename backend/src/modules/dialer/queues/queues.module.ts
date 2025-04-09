import { Module } from '@nestjs/common';
import { QueuesService } from './queues.service';
import { QueuesController } from './queues.controller';

@Module({
  providers: [QueuesService],
  controllers: [QueuesController],
})
export class QueuesModule {}
