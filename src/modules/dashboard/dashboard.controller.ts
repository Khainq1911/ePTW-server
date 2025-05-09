import { Controller, Get, Query } from '@nestjs/common';
import { DashboardService } from './dashboard.service';

@Controller('dashboard')
export class DashboardController {
  constructor(private readonly dashboardService: DashboardService) {}
  @Get()
  getDashboard(@Query() query: { start?: any; end?: any; templateId?: number; senderId?: number }) {
    return this.dashboardService.findAndCount(
      query.start,
      query.end,
      query.templateId,
      query.senderId
    );
  }
}
