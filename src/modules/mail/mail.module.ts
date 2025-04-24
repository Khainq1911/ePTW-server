import { MailerModule } from '@nestjs-modules/mailer';
import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { MailService } from './mail.service';
import { MailController } from './mail.controller';

@Module({
  imports: [
    MailerModule.forRootAsync({
      useFactory: async (configService: ConfigService) => ({
        transport: {
          host: configService.get('MAIL_HOST'),
          //port: +configService.get('MAIL_PORT'),
          secure: false,
          auth: {
            user: configService.get('MAIL_USER'),
            pass: configService.get('MAIL_PASSWORD'),
          },
          defaults: {
            from: `"No Reply" <${configService.get('MAIL_FROM')}>`,
          },
        },
      }),
      inject: [ConfigService],
    }),
  ],
  providers: [MailService],
  controllers: [MailController],
  exports: [MailService]
})
export class MailModule {}
