import { Injectable } from '@nestjs/common';
import { PermitDto, UpdatePermitDto } from './permit.dto';
import { MailService } from '../mail/mail.service';
import { Repository } from 'typeorm';
import { PermitEntity } from 'src/database/entities/permit.entity';
import { InjectRepository } from '@nestjs/typeorm';
import {
  permitRequestTemplate,
  permitUpdateTemplate,
} from '../mail/mail.source';
import { PermitHistoryEntity } from '../../database/entities/permit-histories.entity';
import { UserEntity } from 'src/database/entities/user.entity';
import { UserService } from '../user/user.service';

@Injectable()
export class PermitService {
  constructor(
    @InjectRepository(PermitEntity)
    private readonly permitRepository: Repository<PermitEntity>,

    @InjectRepository(PermitHistoryEntity)
    private readonly permitHistoryEntity: Repository<PermitHistoryEntity>,

    private readonly userService: UserService,

    private readonly mailService: MailService,
  ) {}

  async create(payload: PermitDto) {
    const { receiverId } = payload;

    const supervisor = await this.userService.getEmail(receiverId);

    await this.mailService.sendMail({
      to: supervisor.email,
      subject: 'New Permit Request Submitted',
      data: {
        name: supervisor.name,
        statusLink: 'test',
      },
      html: permitRequestTemplate,
    });

    await this.permitRepository.save(payload);

    return { message: 'Permit created successfully' };
  }

  async update(payload: UpdatePermitDto, id: number) {
    const { status, senderId, permitId, reason } = payload;

    const { email, name } = await this.userService.getEmail(senderId);

    await this.mailService.sendMail({
      to: email,
      subject: 'Permit Status Updated',
      data: {
        permitId: permitId,
        status: status,
        name: name,
        reason: reason,
      },
      html: permitUpdateTemplate,
    });

    await this.permitRepository.update(
      { id: id },
      {
        status: status,
      },
    );

    await this.permitHistoryEntity.save(payload);

    return { Message: 'Updated permit successful!' };
  }

  async listPermit() {
    const result = await this.permitRepository.find();
    return result;
  }
}
