import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PermitHistoryEntity } from 'src/database/entities/permit-histories.entity';
import { Repository } from 'typeorm';

@Injectable()
export class StatusHistoryService {
  constructor(
    @InjectRepository(PermitHistoryEntity)
    private readonly statusHistoryRepository: Repository<PermitHistoryEntity>
  ) {}

  async findAll(id: number) {
    const result = await this.statusHistoryRepository.find({
      where: { permitId: id },
      relations: ['user'],
    });

    const finalData = result.map(item => {
      const { changedBy, user, ...data } = item;
      return { ...data, changedBy: user };
    });
    return finalData;
  }
}
