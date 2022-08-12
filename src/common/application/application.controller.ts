import { Controller, Post } from '@nestjs/common';
import { ApplicationService } from './application.service';
import { AddApplicationDto } from './dto/application.dto';

@Controller('application')
export class ApplicationController {
  constructor(private readonly applicationService: ApplicationService) {}

  @Post('/add')
  addApplication(addApplicationDto: AddApplicationDto) {
    this.applicationService.addApplication(addApplicationDto);
  }
}
