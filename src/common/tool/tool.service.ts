import { Injectable } from '@nestjs/common';
import { ApplicationService } from '../application/application.service';
import { Application } from '../application/models/application.entity';
import { AppInfoDto } from './dto/tool.dto';
import ciConfig from './utils/CIConfig';
import DockerCompose from './utils/DockerCompose';
import Jenkins from './utils/Jenkins';

@Injectable()
export class ToolService {
  constructor(private readonly applicationService: ApplicationService) {}

  public async updateAppReleaseVersion(appInfoDto: AppInfoDto) {
    await this.applicationService.updateAppReleaseVersion(
      appInfoDto.appCode,
      appInfoDto.env,
    );
  }

  public async generateDeployFile(appInfoDto: AppInfoDto) {
    ciConfig.downloadCIConfig();
    await this.generateJenkinsFile(appInfoDto);
    await this.generateDockerComposeFile(appInfoDto);
    ciConfig.uploadCIConfig();
  }

  private async generateJenkinsFile(appInfoDto: AppInfoDto) {
    const application: any = await this.applicationService.getAppEnvInfo(
      appInfoDto.appCode,
      appInfoDto.env,
    );

    const jenkins = new Jenkins(application);
    application.branch = appInfoDto.branch || 'master';
    jenkins.init();
  }

  private async generateDockerComposeFile(appInfoDto: AppInfoDto) {
    const appList = await this.applicationService.getPublishAppList(
      appInfoDto.env,
    );
    const dockerCompose = new DockerCompose(appList, appInfoDto.env);
    dockerCompose.init();
  }
}
