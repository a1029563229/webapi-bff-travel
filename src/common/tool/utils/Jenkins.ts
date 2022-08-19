import Handlebars from 'handlebars';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const shelljs = require('shelljs');
// eslint-disable-next-line @typescript-eslint/no-var-requires
const fs = require('fs');
// import fs from 'fs';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const path = require('path');
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
  cluster: string;
  is_publish: number;
};

class Jenkins {
  private appInfo: AppInfo;

  constructor(appInfo: AppInfo) {
    this.appInfo = appInfo;
  }

  public init(): void {
    const jenkinsfile = this.buildJenkinsFile();
    this.downloadCIConfig();
    this.writeJenkinsfile(jenkinsfile);
    this.uploadCIConfig();
  }

  private buildJenkinsFile(): string {
    const type = this.appInfo.type;
    const template = jenkinsTemplate[type];
    const hTemplate = Handlebars.compile(template);
    const jenkinsfile = hTemplate({
      service_name: this.appInfo.code,
      docker_hub_url: this.appInfo.docker_hub_url,
      version: this.appInfo.version,
      release_version: this.appInfo.release_version,
      account: process.env.DOCKER_ACCOUNT,
      password: process.env.DOCKER_PASSWORD,
    });
    return jenkinsfile;
  }

  private downloadCIConfig() {
    const workdir = path.resolve(__dirname, '../template/ci_config_file');
    shelljs.exec(`rm -rf ${workdir}`);
    shelljs.exec(
      `git clone git@e.coding.net:jt-gmall/mall-script/ci_config_file.git ${workdir}`,
    );
  }

  private writeJenkinsfile(jenkinsfile: string) {
    const filePath = path.resolve(
      __dirname,
      `../template/ci_config_file/jenkinsfile/${this.appInfo.type}/Jenkinsfile`,
    );
    fs.writeFileSync(filePath, jenkinsfile, 'utf-8');
  }

  private uploadCIConfig() {
    const workdir = path.resolve(__dirname, '../template/ci_config_file');
    shelljs.cd(workdir);
    shelljs.exec(`pwd`);
    shelljs.exec('git add .');
    shelljs.exec('git commit -m "update"');
    shelljs.exec('git push origin master');
  }
}

export default Jenkins;
