import { Body, Controller, Get, Param } from '@nestjs/common';
import { UserService } from './user.service';
import { Public } from 'src/common/decorators/public.decorators';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}
  @Public()
  @Get()
  listUser() {
    return this.userService.listUser();
  }

  @Public()
  @Get(':id')
  getMail(@Param('id') id: number) {
    return this.userService.getEmail(Number(id));
  }

  @Public()
  @Get('role/:roleId')
  async getUsersByRole(@Param('roleId') roleId: number) {
    return this.userService.ListUserByRole(roleId);
  }
}
