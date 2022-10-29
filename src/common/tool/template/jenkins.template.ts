const node = `pipeline {
  agent any

  stages {
    stage("Init") {
      steps {
        sh "printenv"
        sh "pwd"
        sh "ls -l"
        sh "rm -rf ./\${SERVICE_NAME}"
        sh "git clone \${GIT_REPOSITORY} \${SERVICE_NAME} -b \${BRANCH}"
      }
    }
    stage("Build") {
      steps {
        sh "docker version"
        sh "docker build -t \${PACKET_NAME} ./\${SERVICE_NAME}"
        echo "\${PACKET_NAME} image build success!"
      }
    }
    stage("Publish") {
      steps {
        sh "docker login -u \${ACCOUNT} -p \${PASSWORD} registry.cn-hangzhou.aliyuncs.com"
        sh "docker image tag \${PACKET_NAME} \${DOCKER_HUB_HOST}/\${PACKET_NAME}"
        sh "docker image push \${DOCKER_HUB_HOST}/\${PACKET_NAME}"
        sh "docker image rm \${PACKET_NAME}"
      }
    }
  }
  environment {
    VERSION = "{{version}}"
    DOCKER_HUB_HOST = "{{docker_hub_url}}"
    SERVICE_NAME = "{{service_name}}"
    ACCOUNT = "{{account}}"
    PASSWORD = "{{password}}"
    GIT_REPOSITORY = "{{git_repository}}"
    BRANCH = "{{branch}}"
    ENV="{{env}}"
    PACKET_NAME = "\${env.SERVICE_NAME}:\${VERSION}-{{release_version}}"
  }
}`;

const template = { node };

export default template;
