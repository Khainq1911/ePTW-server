import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { sendMailDto } from './mail.dto';
import Handlebars from 'handlebars';

@Injectable()
export class MailService {
  constructor(private readonly mailerService: MailerService) {}

  async sendMail(payload: sendMailDto) {
    const { data, ...rest } = payload;

    rest.html = await Handlebars.compile(rest.html)(data);

    await this.mailerService.sendMail(rest);

    return { status: 'success' };
  }
}
