// eslint-disable-next-line @typescript-eslint/no-var-requires
const shelljs = require('shelljs');
// eslint-disable-next-line @typescript-eslint/no-var-requires
const fs = require('fs');
// import fs from 'fs';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const path = require('path');

class CIConfig {
  public downloadCIConfig() {
    const workdir = path.resolve(__dirname, '../template/ci_config_file');
    shelljs.exec(`rm -rf ${workdir}`);
    shelljs.exec(
      `git clone git@e.coding.net:jt-gmall/mall-script/ci_config_file.git ${workdir}`,
    );
  }

  public writeConfigFile(file: string, fileContent: string) {
    const filePath = path.resolve(
      __dirname,
      `../template/ci_config_file/${file}`,
    );
    fs.writeFileSync(filePath, fileContent, 'utf-8');
  }

  public uploadCIConfig() {
    const workdir = path.resolve(__dirname, '../template/ci_config_file');
    shelljs.cd(workdir);
    shelljs.exec(`pwd`);
    shelljs.exec('git add .');
    shelljs.exec('git commit -m "update"');
    shelljs.exec('git push origin master');
  }
}

const ciConfig = new CIConfig();

export default ciConfig;
