// eslint-disable-next-line @typescript-eslint/no-var-requires
const shelljs = require('shelljs');
// import shelljs from 'shelljs';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const fs = require('fs');
// import fs from 'fs';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const path = require('path');

class CIConfig {
  private workdir: string = __dirname;

  public setWorkDir(workdir: string) {
    this.workdir = workdir;
  }

  public downloadCIConfig() {
    console.log('downloadCIConfig');
    this.entryWorkDir();
    this.downloadGitRepository();
    this.clearCIConfig();
  }

  private entryWorkDir() {
    shelljs.cd(this.workdir);
  }

  private downloadGitRepository() {
    shelljs.exec(`pwd`);
    shelljs.exec(
      `git clone git@e.coding.net:jt-gmall/mall-script/ci_config_file.git ci_config_file`,
    );
  }

  private clearCIConfig() {
    const ciConfigFile = path.resolve(this.workdir, './ci_config_file');
    shelljs.exec(`rm -rf ${ciConfigFile}`);
  }

  public writeConfigFile(file: string, fileContent: string) {
    const filePath = path.resolve(this.workdir, `./ci_config_file/${file}`);

    this.createDirIfNotExists(file);
    fs.writeFileSync(filePath, fileContent, 'utf-8');
  }

  public createDirIfNotExists(filePath: string) {
    const dirs = filePath.split('/').slice(0, -1);
    let dirPath = path.resolve(this.workdir, `./ci_config_file`);
    dirs.forEach((dirName) => {
      dirPath = path.join(dirPath, dirName);
      if (!fs.existsSync(dirPath)) {
        fs.mkdirSync(dirPath);
      }
    });
  }

  public uploadCIConfig() {
    const workdir = path.resolve(this.workdir, './ci_config_file');
    shelljs.cd(workdir);
    shelljs.exec(`pwd`);
    shelljs.exec('git add .');
    shelljs.exec('git commit -m "update"');
    shelljs.exec('git push origin master');
  }
}

const ciConfig = new CIConfig();

export default ciConfig;
