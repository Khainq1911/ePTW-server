import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { TemplateService } from './template.service';
import { Public } from 'src/common/decorators/public.decorators';
import { TemplateDto, UpdateTemplateDto } from './template.dto';

@Controller('template')
export class TemplateController {
  constructor(private readonly templateService: TemplateService) {}

  @Public()
  @Post()
  addTemplate(@Body() templateDto: TemplateDto) {
    return this.templateService.create(templateDto);
  }

  @Public()
  @Get()
  getTemplate() {
    return this.templateService.get();
  }

  @Public()
  @Patch(':id')
  Update(@Body() payload: UpdateTemplateDto, @Param('id') id: number) {
    return this.templateService.updateTemplate(payload, id);
  }
}
