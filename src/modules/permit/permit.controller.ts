import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  UseInterceptors,
} from '@nestjs/common';
import { PermitService } from './permit.service';
import { Public } from 'src/common/decorators/public.decorators';
import { PermitDto, UpdatePermitDto } from './permit.dto';

@Controller('permit')
export class PermitController {
  constructor(private readonly permitService: PermitService) {}

  @Public()
  @Post()
  createPermit(@Body() payload: PermitDto) {
    return this.permitService.create(payload);
  }

  @Public()
  @Patch(':id')
  updateStatus(@Body() payload: UpdatePermitDto, @Param('id') id: number) {
    return this.permitService.update(payload, id);
  }

  @Public()
  @Get()
  listPermit() {
    return this.permitService.listPermit();
  }

  @Public()
  @UseInterceptors(ClassSerializerInterceptor)
  @Get(':id')
  getPermitById(@Param('id') id: number) {
    return this.permitService.getPermitById(id);
  }
}
