import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PermitStatus } from 'src/common/enums/status.enum';
import { PermitEntity } from 'src/database/entities/permit.entity';
import { Repository } from 'typeorm';

@Injectable()
export class DashboardService {
  constructor(
    @InjectRepository(PermitEntity)
    private readonly permitRepository: Repository<PermitEntity>
  ) {}

  async findAndCount(start?: Date, end?: Date, templateId?: number, senderId?: number) {
    const findDetail = async (status: string) => {
      const query = this.permitRepository.createQueryBuilder('permit');

      query.where('permit.status = :status', { status });

      if (start) query.andWhere('permit.created_at >= :start', { start });
      if (end) query.andWhere('permit.created_at <= :end', { end });
      if (templateId) query.andWhere('permit.templateId = :templateId', { templateId });
      if (senderId) query.andWhere('permit.senderId = :senderId', { senderId });

      return await query.getCount();
    };

    const [total, pending, suspend, revise, accept, close] = await Promise.all([
      this.permitRepository.count(),
      findDetail(PermitStatus.PENDING),
      findDetail(PermitStatus.SUSPEND),
      findDetail(PermitStatus.REVISE),
      findDetail(PermitStatus.ACCEPT),
      findDetail(PermitStatus.CLOSE),
    ]);

    return { total_permits: total, pending, accept, suspend, revise, close };
  }
}
