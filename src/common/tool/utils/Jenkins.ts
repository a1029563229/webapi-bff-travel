import jenkinsTemplate from '../template/jenkins.template';

export type AppInfo = {
  id: string;
  name: string;
  code: string;
  type: string;
  docker_hub_url: string;
  env: string;
  version: string;
  release_version: number;
  server_port: number;
  container_port: number;
  networks: string;
};

class Jenkins {
  private appInfo: AppInfo;

  constructor(appInfo: AppInfo) {
    this.appInfo = appInfo;
  }

  public init(): void {
    this.buildJenkinsFile();
  }

  private buildJenkinsFile() {
    const type = this.appInfo.type;
    const template = jenkinsTemplate[type];
    console.log(template);
  }
}

export default Jenkins;
