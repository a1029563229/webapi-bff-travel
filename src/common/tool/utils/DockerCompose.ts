import { stringify } from 'yaml';
import { AppInfo } from './Jenkins';
import dockerComposeTemplate from '../template/docker-compose.template';
import ciConfig from './CIConfig';

class DockerCompose {
  private appList: AppInfo[];
  private env: string;

  constructor(appList: AppInfo[], env: string) {
    this.appList = appList;
    this.env = env;
  }

  public init(): void {
    const template = this.generateTemplate();
    const yamlTemplate = this.convertToYaml(template);
    this.writeDockerComposeFile(yamlTemplate);
  }

  private generateTemplate(): any {
    const template: any = {
      ...dockerComposeTemplate,
    };
    this.appList.forEach((app) => {
      const serviceItem: any = {
        container_name: `${app.env}-${app.code}`,
        image: `${app.docker_hub_url}/${app.code}:${app.version}-${app.release_version}`,
        ports: [`${app.server_port}:${app.container_port}`],
        environment: [`ENV=${app.env}`],
      };
      if (app.networks) {
        serviceItem.networks = [app.networks];
      }

      template.services[`${app.env}-${app.code}`] = serviceItem;
    });
    const networksApp = this.appList.find((app) => !!app.networks);
    if (networksApp) {
      template.networks = {
        [networksApp.networks]: {
          external: true,
        },
      };
    }
    return template;
  }

  private convertToYaml(template: any): string {
    const yamlTemplate = stringify(template);
    return yamlTemplate;
  }

  private writeDockerComposeFile(dockerComposeFile: string) {
    ciConfig.writeConfigFile(
      `docker-compose/docker-compose.${this.env}.yml`,
      dockerComposeFile,
    );
  }
}

export default DockerCompose;
