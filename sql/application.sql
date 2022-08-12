CREATE TABLE IF NOT EXISTS `application` (
  `id` varchar(36) primary key,
  `name` varchar(36) not null default '',
  `docker_hub_url` varchar(255) not null default '',
  `env` varchar(36) not null default '',
  `version` varchar(36) default '1.0.0',
  `release_version` int default 1,
  `server_host` smallint not null default 0,
  `container_port` smallint not null default 0,
  `networks` varchar(36),
  index `name`(`name`)
) engine = InnoDB charset = utf8;