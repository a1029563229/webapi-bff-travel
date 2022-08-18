CREATE TABLE IF NOT EXISTS `application` (
  `id` varchar(36) primary key,
  `name` varchar(36) not null default '' comment '应用名称' unique key,
  `code` varchar(36) not null default '' comment '应用CODE' unique key,
  `is_deleted` tinyint unsigned DEFAULT 0 COMMENT '是否删除',
  `created_on` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `updated_on` datetime COMMENT '更新时间'
) engine = InnoDB charset = utf8;

CREATE TABLE IF NOT EXISTS `app_env` (
  `id` varchar(36) primary key,
  `app_code` varchar(36) comment '应用code',
  `env` varchar(36) not null default '' comment '环境信息',
  `docker_hub_url` varchar(255) not null default '' comment 'docker镜像仓库地址',
  `version` varchar(36) default '1.0.0' comment '大版本号',
  `release_version` int default 1 comment '热更新版本号',
  `server_port` smallint not null default 0 comment '服务对外暴露端口',
  `container_port` smallint not null default 0 comment '容器内部端口',
  `networks` varchar(36) comment '服务网络',
  `is_deleted` tinyint unsigned DEFAULT 0 COMMENT '是否删除',
  `created_on` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `updated_on` datetime COMMENT '更新时间',
  index `app_code`(`app_code`),
  unique index `app_code_env`(`app_code`, `env`)
) engine = InnoDB charset = utf8;

alter table `application` add column (
  `type` varchar(36) not null default ''
)