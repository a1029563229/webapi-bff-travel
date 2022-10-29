import Handlebars from 'handlebars';
import jenkinsTemplate from '../template/jenkins.template';
import ciConfig from './CIConfig';

export type AppInfo = {
  id: string;
  name: string;
  code: string;
  type: string;
  git_repository: string;
  docker_hub_url: string;
  env: string;
  version: string;
  branch: string;
  release_version: number;
  server_port: number;
  container_port: number;
  networks: string;
  cluster: string;
  is_publish: number;
  env_info: any;
};

class Jenkins {
  private appInfo: AppInfo;
  private jenkinsfile: string;

  constructor(appInfo: AppInfo) {
    this.appInfo = appInfo;
  }

  public init(): void {
    this.jenkinsfile = this.buildJenkinsFile();
  }

  private buildJenkinsFile(): string {
    const type = this.appInfo.type;
    const template = jenkinsTemplate[type];
    const hTemplate = Handlebars.compile(template);
    const jenkinsfile = hTemplate({
      service_name: this.appInfo.code,
      git_repository: this.appInfo.git_repository,
      docker_hub_url: this.appInfo.docker_hub_url,
      version: this.appInfo.version,
      release_version: this.appInfo.release_version,
      account: process.env.DOCKER_ACCOUNT,
      password: process.env.DOCKER_PASSWORD,
      branch: this.appInfo.branch,
      env: this.appInfo.env,
    });
    return jenkinsfile;
  }

  public writeJenkinsfile() {
    ciConfig.writeConfigFile(
      `jenkinsfile/${this.appInfo.type}/Jenkinsfile`,
      this.jenkinsfile,
    );
  }
}

export default Jenkins;
