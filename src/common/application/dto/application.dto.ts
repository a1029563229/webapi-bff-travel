import { IsNotEmpty } from 'class-validator';

export class AddApplicationDto {
  @IsNotEmpty({ message: '应用名称不能为空' })
  name: string;

  @IsNotEmpty({ message: '应用code不能为空' })
  code: string;

  @IsNotEmpty({ message: 'docker 镜像仓库地址不能为空' })
  docker_hub_url: string;

  @IsNotEmpty({ message: '环境信息不能为空' })
  env: string;

  version: string;

  release_version: number;

  @IsNotEmpty({ message: '服务器端口不能为空' })
  server_port: number;

  @IsNotEmpty({ message: '容器端口不能为空' })
  container_port: number;

  networks: string;
}

export class UpdateApplicationDto extends AddApplicationDto {
  @IsNotEmpty({ message: '应用 ID 不能为空' })
  id: string;
}

export class QueryOneApplicationDto {
  @IsNotEmpty({ message: '应用 ID 不能为空' })
  id: string;
}
