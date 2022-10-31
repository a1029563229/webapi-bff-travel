import ciConfig from './CIConfig';
import { AppInfo } from './Jenkins';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const path = require('path');
// eslint-disable-next-line @typescript-eslint/no-var-requires
const shelljs = require('shelljs');

class EnvFile {
  private appInfo: AppInfo;
  private envFileStr: string;

  constructor(appInfo: AppInfo) {
    this.appInfo = appInfo;
  }

  public init() {
    this.downloadGitRepository();
    this.envFileStr = this.buildEnvFileStr();
  }

  private downloadGitRepository() {
    console.log(this.appInfo);
    const { code, branch, git_repository } = this.appInfo;
    shelljs.exec(`
      git clone ${git_repository} -b ${branch} ${code}
    `);
  }

  private buildEnvFileStr(): string {
    const envInfo = this.appInfo.env_info;
    return '';
  }

  public writeEnvFile() {
    ciConfig.writeConfigFile(`env/${this.appInfo.code}/.env`, this.envFileStr);
  }
}

export default EnvFile;
