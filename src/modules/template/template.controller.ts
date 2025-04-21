import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { TemplateService } from './template.service';
import { Public } from 'src/common/decorators/public.decorators';
import { TemplateDto, UpdateTemplateDto } from './template.dto';

@Controller('template')
export class TemplateController {
  constructor(private readonly templateService: TemplateService) {}

  @Post()
  addTemplate(@Body() templateDto: TemplateDto) {
    return this.templateService.create(templateDto);
  }

  @Get()
  getTemplate(@Query('q') q: string) {
    return this.templateService.get(q);
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
