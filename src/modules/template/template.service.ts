import { query } from 'express';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TemplateEntity } from 'src/database/entities/template.entity';
import { ILike, Repository } from 'typeorm';
import { TemplateDto, UpdateTemplateDto } from './template.dto';

@Injectable()
export class TemplateService {
  constructor(
    @InjectRepository(TemplateEntity)
    private readonly templateRepository: Repository<TemplateEntity>
  ) {}

  async create(templateDto: TemplateDto) {
    return await this.templateRepository.save(templateDto);
  }

  async get(query) {
    const limit = query.limit || 10;
    const page = query.page || 0;
    const [data, total] = await this.templateRepository.findAndCount({
      where: { name: ILike(`%${query.q}%`) },
      skip: page * limit,
      take: query.limit,
      order: { name: 'DESC' },
    });

    return { data, total };
  }

  async listTemplate() {
    return await this.templateRepository.find();
  }

  async getById(id: number) {
    const result = await this.templateRepository.findOneBy({ id: id });

    if (!result) {
      throw new NotFoundException(`Template with ID ${id} not found`);
    }

    return result;
  }

  async updateTemplate(payload: UpdateTemplateDto, id: number) {
    const result = await this.templateRepository.update({ id }, payload);
    if (result.affected === 0) {
      throw new NotFoundException(`Template with ID ${id} not found`);
    }
    return { status: 'success' };
  }
}
