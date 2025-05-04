import { Body, Controller, Post } from '@nestjs/common';
import { TelegramService } from './telegram.service';
import { Public } from 'src/common/decorators/public.decorators';

@Controller('send-poll')
export class TelegramController {
  constructor(private readonly telegramService: TelegramService) {}
  @Public()
  @Post()
  async sendPollToUser(@Body('telegramId') telegramId: number): Promise<void> {
    await this.telegramService.sendPoll(telegramId);
  }
}
