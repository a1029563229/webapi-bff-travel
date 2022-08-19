import { Injectable } from '@nestjs/common';
import { ApplicationService } from '../application/application.service';
import { AppInfo } from './dto/tool.dto';
import Jenkins from './utils/Jenkins';

@Injectable()
export class ToolService {
  constructor(private readonly applicationService: ApplicationService) {}

  public async generateDeployFile(appInfo: AppInfo) {
    // await this.generateJenkinsFile(appInfo);
    await this.generateDockerComposeFile(appInfo);
  }

  private async generateJenkinsFile(appInfo: AppInfo) {
    const application: any = await this.applicationService.getAppEnvInfo(
      appInfo.appCode,
      appInfo.env,
    );
    if (!application) throw new Error('该应用不存在');
    if (!application.env) throw new Error('该环境信息不存在');

    const jenkins = new Jenkins(application);
    jenkins.init();
  }

  private async generateDockerComposeFile(appInfo: AppInfo) {
    const appList = await this.applicationService.getPublishAppList(
      appInfo.env,
    );
    console.log(appList);
  }
}
