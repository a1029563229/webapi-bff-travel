// eslint-disable-next-line @typescript-eslint/no-var-requires
const shelljs = require('shelljs');
// eslint-disable-next-line @typescript-eslint/no-var-requires
const fs = require('fs');
// eslint-disable-next-line @typescript-eslint/no-var-requires
const path = require('path');

class Worker {
  private rootPath = './';

  public getRootPath() {
    return this.rootPath;
  }

  public setRootPath(rootPath: string) {
    this.rootPath = rootPath;
  }

  public setWorkDir(workDir: string) {
    shelljs.cd(dir);
  }
}

const worker = new Worker();
export default worker;
