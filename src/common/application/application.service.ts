import { Injectable } from '@nestjs/common';
import { Connection } from 'typeorm';
import { AddApplicationDto, UpdateApplicationDto } from './dto/application.dto';
import { Application } from './models/application.entity';

@Injectable()
export class ApplicationService {
  constructor(private readonly connection: Connection) {}

  getApplicationByCode(code: string): Promise<Application> {
    return this.connection
      .getRepository(Application)
      .createQueryBuilder('application')
      .where('code = :code', { code })
      .getOne();
  }

  addApplication(addApplicationDto: AddApplicationDto) {
    let application: Application = new Application();

    application = this.getApplication(application, addApplicationDto);
    return this.connection.manager.save(application);
  }

  getApplication(
    application: Application,
    addApplicationDto: AddApplicationDto,
  ): Application {
    application.name = addApplicationDto.name;
    application.code = addApplicationDto.code;
    application.docker_hub_url = addApplicationDto.docker_hub_url;
    application.env = addApplicationDto.env;
    application.version = addApplicationDto.version;
    application.release_version = addApplicationDto.release_version;
    application.server_port = addApplicationDto.server_port;
    application.container_port = addApplicationDto.container_port;
    application.networks = addApplicationDto.networks;
    return application;
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
}
