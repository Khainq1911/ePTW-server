import { Body, Controller, Post } from '@nestjs/common';
import { MailService } from './mail.service';
import { Public } from 'src/common/decorators/public.decorators';
import { sendMailDto } from './mail.dto';
<<<<<<< HEAD
<<<<<<< HEAD
import { permitRequestTemplate } from './mail.source';
=======
import { permitRequestSource } from './mail.source';
>>>>>>> e6fa043 (feat: mail module)
=======
import { permitRequestTemplate } from './mail.source';
>>>>>>> b48185c (feat: permit module)

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
<<<<<<< HEAD
      html: permitRequestTemplate,
=======
      html: permitRequestSource,
>>>>>>> e6fa043 (feat: mail module)
=======
      html: permitRequestTemplate,
>>>>>>> b48185c (feat: permit module)
    };

    return this.mailService.sendMail(data);
  }
}
