import { Controller, Post } from '@nestjs/common';
import { ApplicationService } from './application.service';
import {
  AddApplicationDto,
  QueryOneApplicationDto,
  UpdateApplicationDto,
} from './dto/application.dto';

@Controller('application')
export class ApplicationController {
  constructor(private readonly applicationService: ApplicationService) {}

  @Post('/add')
  async addApplication(addApplicationDto: AddApplicationDto) {
    await this.applicationService.addApplication(addApplicationDto);
    return null;
  }

  @Post('/update')
  async updateApplication(updateApplicationDto: UpdateApplicationDto) {
    await this.applicationService.updateApplication(updateApplicationDto);
    return null;
  }

  @Post('/delete')
  async deleteApplication(queryOneApplicationDto: QueryOneApplicationDto) {
    await this.applicationService.deleteApplication(queryOneApplicationDto.id);
    return null;
  }
}
