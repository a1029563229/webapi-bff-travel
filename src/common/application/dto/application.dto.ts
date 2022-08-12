import { IsNotEmpty } from 'class-validator';

export class AddApplicationDto {
  @IsNotEmpty({ message: '应用名称不能为空' })
  name: string;

  @IsNotEmpty({ message: 'docker 镜像仓库地址不能为空' })
  docker_hub_url: string;

  @IsNotEmpty({ message: '环境信息不能为空' })
  env: string;

  version: string;

  release_version: string;

  @IsNotEmpty({ message: '服务器端口不能为空' })
  server_host: number;

  @IsNotEmpty({ message: '容器端口不能为空' })
  container_host: number;

  networks: string;
}
