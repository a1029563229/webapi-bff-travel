import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { ApplicationService } from '../application/application.service';
import { AppInfoDto } from './dto/tool.dto';
import { ToolService } from './tool.service';
import Jenkins from './utils/Jenkins';

@Controller('tool')
export class ToolController {
  constructor(
    private readonly toolService: ToolService,
    private readonly applicationService: ApplicationService,
  ) {}

  @Post('/build/application')
  @HttpCode(200)
  async buildApplication(@Body() appInfoDto: AppInfoDto) {
    const application: any = await this.applicationService.getAppEnvInfo(
      appInfoDto.appCode,
      appInfoDto.env,
    );
    if (!application) throw new Error('该应用不存在');
    if (!application.env) throw new Error('该环境信息不存在');

    await this.toolService.updateAppReleaseVersion(appInfoDto);
    await this.toolService.generateDeployFile(appInfoDto);
    return { code: 1, message: 'ok', data: null };
  }
}
