import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Put,
  Query,
  UseInterceptors,
} from '@nestjs/common';
import { PermitService } from './permit.service';
import { PermitDto, QueryDto, UpdatePermitDto, UpdateTotalPermitDto } from './permit.dto';
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
    return this.permitService.updateStatus(payload, id);
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Get()
  listPermit(@User() user: UserDTO, @Query() query: QueryDto) {
    return this.permitService.listPermit(user, query);
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Get(':id')
  getPermitById(@Param('id') id: number) {
    return this.permitService.getPermitById(id);
  }

  @Put('revise/:id')
  updatePermit(@Param('id') id: number, @Body() payload: UpdateTotalPermitDto) {
    return this.permitService.revisePermit(id, payload);
  }
}
