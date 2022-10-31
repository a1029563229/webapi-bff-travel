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
    const { code } = this.appInfo;
    const appDir = path.resolve(__dirname, code);

    console.log({ appDir });
    this.downloadGitRepository();
    this.scanAppEnvFileTemplates(appDir);
    this.clearGitRepository(appDir);
  }

  private downloadGitRepository() {
    console.log(this.appInfo);
    const { code, branch, git_repository } = this.appInfo;
    shelljs.exec(`
      git clone ${git_repository} -b ${branch} ${code}
    `);
  }

  private scanAppEnvFileTemplates(appDir: string) {
    const configTmplDir = path.resolve(appDir, 'config_tmpl');
    console.log({ configTmplDir });
    // shelljs.cd(``)
  }

  private clearGitRepository(appDir: string) {
    shelljs.exec(`rm -rf ${appDir}`);
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
