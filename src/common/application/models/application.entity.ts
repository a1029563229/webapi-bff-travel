import { Column, Entity, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Application {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  code: string;

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
  is_deleted: number;
}
