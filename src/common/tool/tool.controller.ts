import { Body, Controller, Post } from '@nestjs/common';
import { ApplicationService } from '../application/application.service';
import { AppInfo } from './dto/tool.dto';
import { ToolService } from './tool.service';
import Jenkins from './utils/Jenkins';

@Controller('tool')
export class ToolController {
  constructor(private readonly toolService: ToolService) {}

  @Post('/build/application')
  async generateJenkinsfile(@Body() appInfo: AppInfo) {
    await this.toolService.generateDeployFile(appInfo);
    return { code: 1, message: 'ok', data: null };
  }
}
