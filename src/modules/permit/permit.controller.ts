import { Controller } from '@nestjs/common';
import { PermitService } from './permit.service';

@Controller('permit')
export class PermitController {
  constructor(private readonly permitService: PermitService) {}
}
