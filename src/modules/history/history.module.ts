import { Module } from '@nestjs/common';
import { StatusHistoryController } from './history.controller';
import { StatusHistoryService } from './history.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PermitHistoryEntity } from 'src/database/entities/permit-histories.entity';

@Module({
  imports: [TypeOrmModule.forFeature([PermitHistoryEntity])],
  controllers: [StatusHistoryController],
  providers: [StatusHistoryService],
})
export class StatusHistoryModule {}
