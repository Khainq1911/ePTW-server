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
import { PermitDto, UpdatePermitDto } from './permit.dto';
import { User, UserDTO } from 'src/common/decorators/user.decorators';

@Controller('permit')
export class PermitController {
  constructor(private readonly permitService: PermitService) {}

  @Post()
  createPermit(@Body() payload: PermitDto) {
    return this.permitService.create(payload);
  }

  @Patch(':id')
  updateStatus(@Body() payload: UpdatePermitDto, @Param('id') id: number) {
    return this.permitService.update(payload, id);
  }

  @Get()
  listPermit(@User() user: UserDTO) {
    return this.permitService.listPermit(user);
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Get(':id')
  getPermitById(@Param('id') id: number) {
    return this.permitService.getPermitById(id);
  }
}
