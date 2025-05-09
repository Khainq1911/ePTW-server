import { Module } from '@nestjs/common';
import { TelegramService } from './telegram.service';
import { TelegramController } from './telegram.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from 'src/database/entities/user.entity';
import { MailModule } from '../mail/mail.module';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity]), MailModule],
  providers: [TelegramService],
  controllers: [TelegramController],
  exports: [TelegramService],
})
export class TelegramModule {}
