import { Module } from '@nestjs/common';
import { PermitService } from './permit.service';
import { MailModule } from '../mail/mail.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PermitEntity } from 'src/database/entities/permit.entity';
import { PermitController } from './permit.controller';
import { PermitHistoryEntity } from 'src/database/entities/permit-histories.entity';
import { AuthModule } from '../auth/auth.module';
import { UserModule } from '../user/user.module';
import { TelegramModule } from '../telegram/telegram.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([PermitEntity, PermitHistoryEntity]),
    MailModule,
    AuthModule,
    UserModule,
    TelegramModule,
  ],
  controllers: [PermitController],
  providers: [PermitService],
})
export class PermitModule {}
