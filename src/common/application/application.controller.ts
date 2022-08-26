import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { ApplicationService } from './application.service';
import { AddAppEnvDto, UpdateAppEnvDto } from './dto/appEnv.dto';
import {
  AddApplicationDto,
  QueryOneApplicationDto,
  UpdateApplicationDto,
} from './dto/application.dto';

@Controller('application')
export class ApplicationController {
  constructor(private readonly applicationService: ApplicationService) {}

  @Post('/add')
  @HttpCode(200)
  async addApplication(@Body() addApplicationDto: AddApplicationDto) {
    await this.applicationService.addApplication(addApplicationDto);
    return { code: 1, message: 'ok', data: null };
  }

  @Post('/update')
  @HttpCode(200)
  async updateApplication(@Body() updateApplicationDto: UpdateApplicationDto) {
    await this.applicationService.updateApplication(updateApplicationDto);
    return { code: 1, message: 'ok', data: null };
  }

  @Post('/delete')
  @HttpCode(200)
  async deleteApplication(
    @Body() queryOneApplicationDto: QueryOneApplicationDto,
  ) {
    await this.applicationService.deleteApplication(queryOneApplicationDto.id);
    return { code: 1, message: 'ok', data: null };
  }

  @Post('/addEnv')
  @HttpCode(200)
  async addAppEnv(@Body() addAppEnvDto: AddAppEnvDto) {
    await this.applicationService.addAppEnv(addAppEnvDto);
    return { code: 1, message: 'ok', data: null };
  }

  @Post('/updateEnv')
  @HttpCode(200)
  async updateAppEnv(@Body() updateAppEnvDto: UpdateAppEnvDto) {
    await this.applicationService.updateAppEnv(updateAppEnvDto);
    return { code: 1, message: 'ok', data: null };
  }
}
