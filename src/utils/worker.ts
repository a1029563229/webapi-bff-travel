class Worker {
  private rootPath = './';
  private workDir = '';

  public getRootPath() {
    return this.rootPath;
  }

  public setRootPath(rootPath: string) {
    this.rootPath = rootPath;
  }

  public setWorkDir(workDir: string) {
    this.workDir = workDir;
  }

  public getWorkDir() {
    return this.workDir;
  }
}

const worker = new Worker();
export default worker;
