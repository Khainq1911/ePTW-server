import { MailService } from './../mail/mail.service';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from 'src/database/entities/user.entity';
import { generateCodeTelegram } from 'src/common/utils';
import { telegramOtpTemplate } from '../mail/mail.source';

const TelegramBot = require('node-telegram-bot-api');

@Injectable()
export class TelegramService {
  private readonly bot: any;
  private otpMap = new Map<number, string>();
  private emailMap = new Map<number, string>();
  private attemptMap = new Map<number, number>();
  private readonly MAX_ATTEMPTS = 3;

  constructor(
    private readonly configService: ConfigService,
    @InjectRepository(UserEntity)
    private readonly userRepo: Repository<UserEntity>,
    private readonly MailService: MailService
  ) {
    this.bot = new TelegramBot(this.configService.get<string>('TELEGRAM_BOT_TOKEN'), {
      polling: true,
    });

    this.bot.onText(/\/start/, async message => {
      const telegramUserId = message.from.id;
      const user = await this.userRepo.findOneBy({ telegramId: telegramUserId });

      if (!user) {
        this.bot.sendMessage(
          message.chat.id,
          `Người dùng không tồn tại. Vui lòng nhập /verify <email> để xác minh.`
        );
      } else {
        this.bot.sendMessage(message.chat.id, `Chào bạn ${user.name || ''}!`);
      }
    });

    this.bot.onText(/\/verify/, message => {
      this.getCode(message);
    });

    this.bot.on('message', async message => {
      const telegramUserId = message.from.id;
      const messageText = message.text;
      const currentAttempts = this.attemptMap.get(telegramUserId) || 0;
      const currentEmail = this.emailMap.get(telegramUserId) || '';
      const updatedAttempts = currentAttempts + 1;

      if (messageText.length === 10 && messageText.startsWith('eptw')) {
        const savedOtp = this.otpMap.get(telegramUserId);

        if (messageText === savedOtp) {
          const result = await this.userRepo.update(
            { email: currentEmail },
            { telegramId: telegramUserId }
          );

          if (!result) {
            this.bot.sendMessage(telegramUserId, '⚠️ Đã xảy ra lỗi khi cập nhật tài khoản.');
            return;
          }

          this.bot.sendMessage(
            telegramUserId,
            '✅ Xác thực thành công! Bạn sẽ nhận các thông báo quan trọng tại đây từ bây giờ.'
          );

          this.otpMap.delete(telegramUserId);
          this.attemptMap.delete(telegramUserId);
          this.emailMap.delete(telegramUserId);
        } else {
          if (currentAttempts === this.MAX_ATTEMPTS) {
            this.otpMap.delete(telegramUserId);
            this.attemptMap.delete(telegramUserId);
            this.emailMap.delete(telegramUserId);
            this.bot.sendMessage(
              telegramUserId,
              '❌ Xác thực thất bại. Bạn đã nhập sai quá số lần cho phép. Vui lòng tạo mã OTP mới bằng cách sử dụng lệnh /verify <email>.'
            );
            return;
          }
          this.attemptMap.set(telegramUserId, updatedAttempts);
          this.bot.sendMessage(telegramUserId, '❌ Xác thực không thành công.');
        }
      }
    });
  }

  async getCode(message): Promise<void> {
    const telegramUserId = message.from.id;
    const emailInput = message.text.split(' ')[1];

    if (!emailInput?.includes('@') && !emailInput?.includes('.')) {
      this.bot.sendMessage(telegramUserId, '❌ Vui lòng thêm email.');
      return;
    }

    const user = await this.userRepo.findOneBy({ email: emailInput });

    if (user) {
      const otpCode = await generateCodeTelegram();

      const data = {
        to: emailInput,
        subject: 'Telegram OTP code',
        data: { otp: otpCode },
        html: telegramOtpTemplate,
      };

      await this.MailService.sendMail(data);

      this.attemptMap.set(telegramUserId, 0);
      this.emailMap.set(telegramUserId, emailInput);
      this.otpMap.set(telegramUserId, otpCode);

      this.bot.sendMessage(
        telegramUserId,
        `📧 Mã OTP đã được gửi đến email: *${emailInput}*. Vui lòng kiểm tra hộp thư của bạn.`,
        { parse_mode: 'Markdown' }
      );
    } else {
      this.bot.sendMessage(
        telegramUserId,
        `❌ Tài khoản không tồn tại. Vui lòng đăng ký tại ${process.env.WEBISTE_URL}/auth/register`
      );
    }
  }

  async sendPoll(telegramUserId: number): Promise<void> {
    const question = 'Bạn thích lập trình bằng ngôn ngữ nào?';
    const options = ['JavaScript', 'Go', 'Python', 'Java'];

    try {
      await this.bot.sendPoll(telegramUserId, question, options);
      console.log('✅ Gửi khảo sát thành công.');
    } catch (error) {
      console.error(`❌ Lỗi gửi khảo sát: ${error.message}`);
    }
  }

  async sendMessage(telegramUserId: number, message: string) {
    try {
      await this.bot.sendMessage(telegramUserId, message);
      console.log('✅ Gửi khảo sát thành công.');
    } catch (error) {
      console.error(`❌ Lỗi gửi khảo sát: ${error.message}`);
    }
  }
}
