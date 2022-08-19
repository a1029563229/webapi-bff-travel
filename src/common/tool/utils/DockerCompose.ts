import { AppInfo } from '../dto/tool.dto';

class DockerCompose {
  private appList: AppInfo[];

  constructor(appList: AppInfo[]) {
    this.appList = appList;
  }
}

export default DockerCompose;
