import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TemplateEntity } from 'src/database/entities/template.entity';
import { Repository } from 'typeorm';
import { TemplateDto, UpdateTemplateDto } from './template.dto';

@Injectable()
export class TemplateService {
  constructor(
    @InjectRepository(TemplateEntity)
    private readonly templateRepository: Repository<TemplateEntity>,
  ) {}

  async create(templateDto: TemplateDto) {
    return await this.templateRepository.save(templateDto);
  }

  async get() {
    return await this.templateRepository.find();
  }

  async updateTemplate(payload: UpdateTemplateDto, id: number) {
    const result = await this.templateRepository.update({ id }, payload);
    if (result.affected === 0) {
      throw new NotFoundException(`Template with ID ${id} not found`);
    }
    return { status: 'success' };
  }
}
