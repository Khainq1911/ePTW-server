import { Injectable } from '@nestjs/common';
import { PermitDto, UpdatePermitDto } from './permit.dto';
import { MailService } from '../mail/mail.service';
import { Repository } from 'typeorm';
import { PermitEntity } from 'src/database/entities/permit.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { permitRequestTemplate } from '../mail/mail.source';
import { PermitHistoryEntity } from '../../database/entities/permit-histories.entity';

@Injectable()
export class PermitService {
  constructor(
    @InjectRepository(PermitEntity)
    private readonly permitRepository: Repository<PermitEntity>,

    @InjectRepository(PermitHistoryEntity)
    private readonly permitHistoryEntity: Repository<PermitHistoryEntity>,

    private readonly mailService: MailService,
  ) {}

  async create(payload: PermitDto) {
    const { to, ...data } = payload;

    await this.mailService.sendMail({
      to: to.email,
      subject: 'Permit Request',
      data: {
        name: to.name,
        statusLink: 'test',
      },
      html: permitRequestTemplate,
    });

    await this.permitRepository.save(data);

    return { message: 'Permit created successfully' };
  }

  async update(payload: UpdatePermitDto, id: number) {
    const { status } = payload;

    await this.permitRepository.update(
      { id: id },
      {
        status: status,
      },
    );

    const result = await this.permitHistoryEntity.save(payload);

    return { Message: 'Updated permit successful!' };
  }

  async listPermit() {
    const result = await this.permitRepository.find();
    return result ;
  }

}
