import { TelegramService } from './../telegram/telegram.service';
import { Injectable, NotFoundException } from '@nestjs/common';
import { PermitDto, UpdatePermitDto, UpdateTotalPermitDto } from './permit.dto';
import { MailService } from '../mail/mail.service';
import { Repository } from 'typeorm';
import { PermitEntity } from 'src/database/entities/permit.entity';
import { InjectRepository } from '@nestjs/typeorm';
import {
  permitRequestTemplate,
  permitUpdateTemplate,
  responseReviseTemplate,
} from '../mail/mail.source';
import { PermitHistoryEntity } from '../../database/entities/permit-histories.entity';
import { UserEntity } from 'src/database/entities/user.entity';
import { UserService } from '../user/user.service';
import { UserDTO } from 'src/common/decorators/user.decorators';
import { Role } from 'src/common/enums/role.enum';
import { MinioService } from '../minio/minio.service';

@Injectable()
export class PermitService {
  constructor(
    @InjectRepository(PermitEntity)
    private readonly permitRepository: Repository<PermitEntity>,

    @InjectRepository(PermitHistoryEntity)
    private readonly permitHistoryEntity: Repository<PermitHistoryEntity>,

    private readonly userService: UserService,

    private readonly mailService: MailService,

    private readonly telegramService: TelegramService,

    private readonly minioService: MinioService
  ) {}

  async create(payload: PermitDto) {
    const { receiverId } = payload;
    const { files, ...data } = payload;
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

    if (supervisor?.telegram_id) {
      this.telegramService.sendMessage(
        supervisor.telegram_id,
        `Hi ${supervisor.name}, a new permit request has been submitted. View status: test`
      );
    }

    const result = await this.permitRepository.save(data);

    if (files) {
      await Promise.all(
        files.map((item: any) => {
          const fileInfor = {
            permitId: result.id,
            fileName: item,
          };
          return this.minioService.createAttachmentFile(fileInfor);
        })
      );
    }

    return { message: 'Permit created successfully' };
  }

  async updateStatus(payload: UpdatePermitDto, id: number) {
    const { status, senderId, permitId, reason } = payload;

    const { email, name, telegram_id } = await this.userService.getEmail(senderId);

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
      }
    );

    this.telegramService.sendMessage(
      telegram_id,
      `Hi ${name}, your permit request (ID: ${permitId}) has been updated to ${status}.\nReason: ${reason || 'No reason provided.'}`
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

  async revisePermit(id: number, payload: UpdateTotalPermitDto) {
    const { sender, receiver, ...data } = payload;
    const finalPayload = { ...data, senderId: sender?.id, receiverId: receiver?.id };

    await this.permitRepository.update(id, finalPayload);

    await this.mailService.sendMail({
      to: receiver.email,
      subject: 'Permit Revision Response',
      data: {
        sender: sender?.name,
        permitId: id,
      },
      html: responseReviseTemplate,
    });
    return { Message: `Update permit successful!` };
  }
}
