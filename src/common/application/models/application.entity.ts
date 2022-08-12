import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity()
export class Application {
  @PrimaryColumn()
  id: string;

  @Column()
  name: string;

  @Column()
  docker_hub_url: string;

  @Column()
  env: string;

  @Column()
  version: string;

  @Column()
  release_version: number;

  @Column()
  server_host: number;

  @Column()
  container_host: number;

  @Column()
  networks: string;
}
