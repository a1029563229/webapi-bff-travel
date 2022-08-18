const node = `epipeline {
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
        sh "docker login -u a1029563229 -p qwe1029563229 registry.cn-zhangjiakou.aliyuncs.com"
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
          npm run build:test \${SERVICE_NAME} \${VERSION}-\${BUILD_ID}
        """.stripIndent().trim()
      }
    }
  }
  environment {
    VERSION = {{version}}
    DOCKER_HUB_HOST = {{DOCKER_HUB_HOST}}
    SERVICE_NAME = {{SERVICE_NAME}}
    PACKET_NAME = "\${env.SERVICE_NAME}:\${VERSION}-\${BUILD_ID}"
  }
}`;

const template = { node };

export default template;
