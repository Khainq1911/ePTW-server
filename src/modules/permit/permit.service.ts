import { Injectable, NotFoundException } from '@nestjs/common';
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
import { UserDTO } from 'src/common/decorators/user.decorators';
import { Role } from 'src/common/enums/role.enum';

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
    if (!supervisor) {
      throw new NotFoundException('Receiver not found');
    }

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

  async listPermit(user: UserDTO) {
    const isWorker = user.roleId === Role.Worker;
    let result: unknown;
    if (isWorker) {
      result = await this.permitRepository.find({
        where: { senderId: user.id },
      });
    } else {
      result = await this.permitRepository.find();
    }

    return result;
  }

  async getPermitById(id: number) {
    const result = await this.permitRepository.findOne({
      where: { id },
      relations: ['template', 'sender', 'receiver'],
    });

    if (!result) throw new NotFoundException('Permit not found');

    const { templateId, senderId, receiverId, ...finalData } = result;
    return finalData;
  }
}
