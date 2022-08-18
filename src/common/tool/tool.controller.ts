import { Body, Controller, Post } from '@nestjs/common';
import { ApplicationService } from '../application/application.service';
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
    const application: any = await this.applicationService.getAppEnvInfo(
      appInfo.appCode,
      appInfo.env,
    );
    if (!application) throw new Error('该应用不存在');
    if (!application.env) throw new Error('该环境信息不存在');

    const jenkins = new Jenkins(application);
    jenkins.init();
    return { code: 1, message: 'ok', data: null };
  }
}
