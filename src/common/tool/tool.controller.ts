import { Body, Controller, Post } from '@nestjs/common';
import { ApplicationService } from '../application/application.service';
import { Application } from '../application/models/application.entity';
import { AppInfo } from './dto/tool.dto';
import { ToolService } from './tool.service';
import Jenkins from './utils/Jenkins';

@Controller('tool')
export class ToolController {
  constructor(
    private readonly toolService: ToolService,
    private readonly applicationService: ApplicationService,
  ) {}

  @Post('/build/application')
  async generateJenkinsfile(@Body() appInfo: AppInfo) {
    const application: Application =
      await this.applicationService.getApplicationByCode(appInfo.appCode);
    const jenkins = new Jenkins(application);
    jenkins.init();
    return { code: 1, message: 'ok', data: null };
  }
}
