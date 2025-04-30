import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PermitEntity } from 'src/database/entities/permit.entity';
import { DashboardController } from './dashboard.controller';
import { DashboardService } from './dashboard.service';

@Module({
  imports: [TypeOrmModule.forFeature([PermitEntity])],
  controllers: [DashboardController],
  providers: [DashboardService],
})
export class DashboardModule {}
