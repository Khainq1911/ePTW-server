import { query } from 'express';
import { Body, Controller, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { TemplateService } from './template.service';
import { QueryDto, TemplateDto, UpdateTemplateDto } from './template.dto';

@Controller('template')
export class TemplateController {
  constructor(private readonly templateService: TemplateService) {}

  @Post()
  addTemplate(@Body() templateDto: TemplateDto) {
    return this.templateService.create(templateDto);
  }

  @Get()
  getTemplate(@Query() query: QueryDto) {
    return this.templateService.get(query);
  }

  @Get('list')
  GetAll() {
    return this.templateService.listTemplate();
  }

  @Get(':id')
  GetById(@Param('id') id: number) {
    return this.templateService.getById(id);
  }

  @Patch(':id')
  Update(@Body() payload: UpdateTemplateDto, @Param('id') id: number) {
    return this.templateService.updateTemplate(payload, id);
  }
}
