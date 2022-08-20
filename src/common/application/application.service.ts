import { Injectable } from '@nestjs/common';
import { Connection } from 'typeorm';
import { AddAppEnvDto } from './dto/appEnv.dto';
import { AddApplicationDto, UpdateApplicationDto } from './dto/application.dto';
import { AppEnv } from './models/appEnv.entity';
import { Application } from './models/application.entity';

@Injectable()
export class ApplicationService {
  constructor(private readonly connection: Connection) {}

  getApplicationDetail(code: string): Promise<Application> {
    return this.connection
      .getRepository(Application)
      .createQueryBuilder('application')
      .where('code = :code', { code })
      .getOne();
  }

  getAppEnvDetail(appCode: string, env: string): Promise<AppEnv> {
    return this.connection
      .getRepository(AppEnv)
      .createQueryBuilder('app_env_info')
      .where('app_code = :appCode and env = :env', { appCode, env })
      .getOne();
  }

  getAppEnvInfo(appCode: string, env: string) {
    return this.connection
      .getRepository(Application)
      .createQueryBuilder('application')
      .leftJoinAndSelect(
        AppEnv,
        'app_env',
        'app_code = :appCode and env = :env',
        { appCode, env },
      )
      .select(
        `
        application.id as id,
        application.name as name,
        application.code as code,
        application.type as type,
        application.git_repository as git_repository,
        app_env.docker_hub_url as docker_hub_url,
        app_env.env as env,
        app_env.version as version,
        app_env.release_version as release_version,
        app_env.server_port as server_port,
        app_env.container_port as container_port,
        app_env.networks as networks,
        app_env.cluster as cluster,
        app_env.is_publish as is_publish
      `,
      )
      .where('code = :appCode', { appCode })
      .getRawOne();
  }

  getPublishAppList(env: string) {
    return this.connection
      .getRepository(AppEnv)
      .createQueryBuilder('app_env')
      .leftJoinAndSelect(
        Application,
        'application',
        'application.code = app_env.app_code',
      )
      .select(
        `application.id as id,
    application.name as name,
    application.code as code,
    application.type as type,
    app_env.docker_hub_url as docker_hub_url,
    app_env.env as env,
    app_env.version as version,
    app_env.release_version as release_version,
    app_env.server_port as server_port,
    app_env.container_port as container_port,
    app_env.networks as networks,
    app_env.cluster as cluster,
    app_env.is_publish as is_publish
    `,
      )
      .where(
        'app_env.env = :env and app_env.is_publish = 1 and app_env.is_deleted = 0',
        { env },
      )
      .getRawMany();
  }

  async addApplication(addApplicationDto: AddApplicationDto) {
    let application: Application = await this.getApplicationDetail(
      addApplicationDto.code,
    );

    if (application) throw new Error('该应用信息已存在');

    application = new Application();
    application = this.getApplication(application, addApplicationDto);

    return this.connection.manager.save(application);
  }

  async addAppEnv(addAppEnvDto: AddAppEnvDto) {
    let appEnv: AppEnv = await this.getAppEnvDetail(
      addAppEnvDto.appCode,
      addAppEnvDto.env,
    );

    if (appEnv) throw new Error('该环境信息已存在');

    appEnv = new AppEnv();
    appEnv = this.getAppEnv(appEnv, addAppEnvDto);

    return this.connection.manager.save(appEnv);
  }

  getApplication(
    application: Application,
    addApplicationDto: AddApplicationDto,
  ): Application {
    application.name = addApplicationDto.name;
    application.code = addApplicationDto.code;
    return application;
  }

  getAppEnv(appEnv: AppEnv, addAppEnvDto: AddAppEnvDto): AppEnv {
    appEnv.app_code = addAppEnvDto.appCode;
    appEnv.docker_hub_url = addAppEnvDto.docker_hub_url;
    appEnv.env = addAppEnvDto.env;
    appEnv.version = addAppEnvDto.version;
    appEnv.release_version = addAppEnvDto.release_version;
    appEnv.server_port = addAppEnvDto.server_port;
    appEnv.container_port = addAppEnvDto.container_port;
    appEnv.networks = addAppEnvDto.networks;
    return appEnv;
  }

  async updateApplication(updateApplicationDto: UpdateApplicationDto) {
    let application = await this.connection.manager.findOne(
      Application,
      updateApplicationDto.id,
    );

    application = this.getApplication(application, updateApplicationDto);
    return this.connection.manager.save(application);
  }

  async deleteApplication(id: string) {
    const application = await this.connection.manager.findOne(Application, id);
    application.is_deleted = 1;
    this.connection.manager.save(application);
  }

  async updateAppReleaseVersion(appCode: string, env: string) {
    const appEnv = await this.connection
      .getRepository(AppEnv)
      .createQueryBuilder('app_env')
      .where('app_code = :appCode and env = :env', { appCode, env })
      .getOne();
    appEnv.release_version += 1;
    await this.connection.manager.save(appEnv);
  }
}
