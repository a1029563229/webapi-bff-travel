const node = `pipeline {
  agent any

  stages {
    stage("State") {
      steps {
        sh "printenv"
        sh "pwd"
        sh "ls -l"
      }
    }
    stage("Build") {
      steps {
        sh "docker version"
        sh "docker build -t \${PACKET_NAME} ."
        echo "\${PACKET_NAME} image build success!"
      }
    }
    stage("Publish") {
      steps {
        sh "docker login -u \${ACCOUNT} -p \${PASSWORD} registry.cn-zhangjiakou.aliyuncs.com"
        sh "docker image tag \${PACKET_NAME} \${DOCKER_HUB_HOST}/\${PACKET_NAME}"
        sh "docker image push \${DOCKER_HUB_HOST}/\${PACKET_NAME}"
        sh "docker image rm \${PACKET_NAME}"
      }
    }
    stage("Deploy") {
      steps {
        sh """
          cd /project/mall-scripts
          pwd
          npm run build:test \${SERVICE_NAME} \${VERSION}-{{release_version}}
        """.stripIndent().trim()
      }
    }
  }
  environment {
    VERSION = "{{version}}"
    DOCKER_HUB_HOST = "{{docker_hub_url}}"
    SERVICE_NAME = "{{service_name}}"
    ACCOUNT = "{{account}}"
    PASSWORD = "{{password}}"
    PACKET_NAME = "\${env.SERVICE_NAME}:\${VERSION}-{{release_version}}"
  }
}`;

const template = { node };

export default template;
