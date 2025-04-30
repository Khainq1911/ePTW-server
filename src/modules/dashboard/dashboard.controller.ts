import { Controller, Get, Query } from '@nestjs/common';
import { DashboardService } from './dashboard.service';
import { User, UserDTO } from 'src/common/decorators/user.decorators';

@Controller('dashboard')
export class DashboardController {
  constructor(private readonly dashboardService: DashboardService) {}
  @Get()
  getDashboard(
    @Query() query: { start?: any; end?: any; templateId?: number; senderId?: number },
  ) {
    return this.dashboardService.findAndCount(
      query.start,
      query.end,
      query.templateId,
      query.senderId
    );
  }
}
