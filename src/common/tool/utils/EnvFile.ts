import ciConfig from './CIConfig';
import { AppInfo } from './Jenkins';

class EnvFile {
  private appInfo: AppInfo;
  private envFileStr: string;

  constructor(appInfo: AppInfo) {
    this.appInfo = appInfo;
  }

  public init() {
    this.envFileStr = this.buildEnvFileStr();
  }

  private buildEnvFileStr(): string {
    const envInfo = this.appInfo.env_info;
    console.log(envInfo);
    return '';
  }

  public writeJenkinsfile() {
    ciConfig.writeConfigFile(`env/${this.appInfo.code}/.env`, this.envFileStr);
  }
}

export default EnvFile;
