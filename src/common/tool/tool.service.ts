import { Injectable } from '@nestjs/common';
import { ApplicationService } from '../application/application.service';
import { Application } from '../application/models/application.entity';
import { AppInfoDto } from './dto/tool.dto';
import ciConfig from './utils/CIConfig';
import DockerCompose from './utils/DockerCompose';
import EnvFile from './utils/EnvFile';
import Jenkins from './utils/Jenkins';

@Injectable()
export class ToolService {
  private applicationInfo: any;

  constructor(private readonly applicationService: ApplicationService) {}

  public async updateAppReleaseVersion(appInfoDto: AppInfoDto) {
    await this.applicationService.updateAppReleaseVersion(
      appInfoDto.appCode,
      appInfoDto.env,
    );
  }

  public async generateDeployFile(appInfoDto: AppInfoDto) {
    ciConfig.downloadCIConfig();
    this.applicationInfo = await this.applicationService.getAppEnvInfo(
      appInfoDto.appCode,
      appInfoDto.env,
    );
    this.applicationInfo.branch = appInfoDto.branch || 'master';

    await Promise.all([
      this.generateEnvFile(),
      // this.generateJenkinsFile(),
      // this.generateDockerComposeFile(appInfoDto),
    ]);
    // ciConfig.uploadCIConfig();
  }

  private async generateEnvFile() {
    const envFile = new EnvFile(this.applicationInfo);
    envFile.init();
    envFile.writeJenkinsfile();
  }

  private async generateJenkinsFile() {
    const jenkins = new Jenkins(this.applicationInfo);
    jenkins.init();
    jenkins.writeJenkinsfile();
  }

  private async generateDockerComposeFile(appInfoDto: AppInfoDto) {
    const appList = await this.applicationService.getPublishAppList(
      appInfoDto.env,
    );
    const dockerCompose = new DockerCompose(appList, appInfoDto.env);
    dockerCompose.init();
    dockerCompose.writeDockerComposeFile();
  }
}
