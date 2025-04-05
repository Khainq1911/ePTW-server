import { Module } from '@nestjs/common';
import { PermitService } from './permit.service';
import { MailModule } from '../mail/mail.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PermitEntity } from 'src/database/entities/permit.entity';
import { PermitController } from './permit.controller';
import { PermitHistoryEntity } from 'src/database/entities/permit-histories.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([PermitEntity, PermitHistoryEntity]),
    MailModule,
  ],
  controllers: [PermitController],
  providers: [PermitService],
})
export class PermitModule {}
