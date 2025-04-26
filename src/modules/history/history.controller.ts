import { ClassSerializerInterceptor, Controller, Get, Param, UseInterceptors } from '@nestjs/common';
import { StatusHistoryService } from './history.service';

@Controller('status')
export class StatusHistoryController {
  constructor(private readonly statusHistoryService: StatusHistoryService) {}

  @UseInterceptors(ClassSerializerInterceptor)
  @Get(':id')
  listStatus(@Param('id') id: string) {
    return this.statusHistoryService.findAll(Number(id));
  }
}
