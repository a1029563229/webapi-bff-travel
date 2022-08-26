import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('app_env')
export class AppEnv {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  app_code: string;

  @Column()
  docker_hub_url: string;

  @Column()
  env: string;

  @Column()
  version: string;

  @Column()
  release_version: number;

  @Column()
  server_port: number;

  @Column()
  container_port: number;

  @Column()
  networks: string;

  @Column()
  cluster: string;

  @Column()
  env_info: string;

  @Column()
  is_publish: number;

  @Column()
  is_deleted: number;
}
