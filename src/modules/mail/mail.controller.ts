import { Body, Controller, Post } from '@nestjs/common';
import { MailService } from './mail.service';
import { Public } from 'src/common/decorators/public.decorators';
import { sendMailDto } from './mail.dto';
<<<<<<< HEAD
import { permitRequestTemplate } from './mail.source';
=======
import { permitRequestSource } from './mail.source';
>>>>>>> e6fa043 (feat: mail module)

@Controller('email')
export class MailController {
  constructor(private readonly mailService: MailService) {}

  @Public()
  @Post()
  sendMail(@Body() payload: { email: string }) {
    const data: sendMailDto = {
      to: [payload.email],
      subject: 'Test Mail',
      data: {
        name: 'Test User',
        statusLink: 'https://nest-modules.github.io/mailer/docs/mailer.html',
      },
<<<<<<< HEAD
      html: permitRequestTemplate,
=======
      html: permitRequestSource,
>>>>>>> e6fa043 (feat: mail module)
    };

    return this.mailService.sendMail(data);
  }
}
