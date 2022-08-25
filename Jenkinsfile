pipeline {
  agent none

  environment {
    PROJECT_NAME = 'evmos-hackathon'
    REGISTRY_HOST = credentials('docker-registry-host')
    REGISTRY_HOST_REMOTE = credentials('docker-registry-domain')
    JENKINS_SERVER = credentials('jenkins-server')
    SLACK_CHANNEL = ''
  }

  stages {
    stage ('Check build') {
      agent any

      when { changeRequest() }

      steps {
        build_pr('node', '16-alpine')
      }
    }

    stage('Build') {
      agent any

      when {
        allOf {
          not {
            changeRequest()
          }
          anyOf {
            branch 'main'
          }
        }
      }

      steps {
        script {
          def GIT_REPO_NAME = env.GIT_URL.replaceFirst(/^.*\/([^\/]+?).git$/, '$1').toLowerCase()
          sh """
            DOCKERFILE=Dockerfile

            docker build . \
              -f \${DOCKERFILE} \
              --build-arg DOCKER_ENV=\${DOCKER_ENV} \
              -t ${GIT_REPO_NAME}.\${BRANCH_NAME} \
              -t ${GIT_REPO_NAME}.\${BRANCH_NAME}:\${BUILD_NUMBER} \
              -t \${REGISTRY_HOST}/${GIT_REPO_NAME}.\${BRANCH_NAME} \
              -t \${REGISTRY_HOST}/${GIT_REPO_NAME}.\${BRANCH_NAME}:\${BUILD_NUMBER} \
              -t ${GIT_REPO_NAME}-\${BRANCH_NAME} \
              -t ${GIT_REPO_NAME}-\${BRANCH_NAME}:\${BUILD_NUMBER} \
              -t \${REGISTRY_HOST}/${GIT_REPO_NAME}-\${BRANCH_NAME} \
              -t \${REGISTRY_HOST}/${GIT_REPO_NAME}-\${BRANCH_NAME}:\${BUILD_NUMBER}

            docker push -a \${REGISTRY_HOST}/${GIT_REPO_NAME}.\${BRANCH_NAME}
          """
        }
      }
    }

    stage('Start') {
      parallel {
        stage('development') {
          agent any

          when {
            allOf {
              not {
                changeRequest()
              }
              anyOf {
                branch 'main'
              }
            }
          }

          steps {
            script {
              def IMAGE_EXPOSED_PORT = 80
              def GIT_REPO_NAME = env.GIT_URL.replaceFirst(/^.*\/([^\/]+?).git$/, '$1').toLowerCase()
              sh """
                echo REGISTRY_HOST=${REGISTRY_HOST} >> .development.env
                echo GIT_REPO_NAME=${GIT_REPO_NAME} >> .development.env
                echo BRANCH_NAME=${BRANCH_NAME} >> .development.env
                echo PROJECT_NAME=${PROJECT_NAME} >> .development.env

                if [ "\$(docker-compose port traefik $IMAGE_EXPOSED_PORT)" ]; then
                  IMAGE_PREVIOUS_PORT="\$(docker-compose port traefik $IMAGE_EXPOSED_PORT | egrep "[0-9]+\$" -o)"
                fi

                docker-compose down -v

                if [ -z "\${IMAGE_PREVIOUS_PORT}" ]; then
                  WEB_PORT=$IMAGE_EXPOSED_PORT \
                    docker-compose --env-file .development.env up -d
                else
                  WEB_PORT="\${IMAGE_PREVIOUS_PORT}:$IMAGE_EXPOSED_PORT" \
                    docker-compose --env-file .development.env up -d
                fi
              """
              def GIT_URL = sh(returnStdout: true, script: "git remote -v | awk -F ' ' '{print \$2}' | head -1").trim()
              def GITHUB_URL = GIT_URL.replaceAll(/.git$/, '')
              def REPO = "<$GITHUB_URL/tree/$env.BRANCH_NAME|$GIT_REPO_NAME/$env.BRANCH_NAME>"

              def IMAGE_PREVIOUS_PORT = sh(returnStdout: true, script: "docker-compose --env-file .development.env port traefik $IMAGE_EXPOSED_PORT | egrep '[0-9]+\$' -o").trim()
              slackSend channel: env.SLACK_CHANNEL, color: "good", message: "Build for $REPO is successfull: http://${env.JENKINS_SERVER}:${IMAGE_PREVIOUS_PORT}."
            }
            // notify_slack("Production deployment success")
          }
        }
      }
    }
  }

  post {
    failure {
      node(null) {
        script {
          if (env.BRANCH_NAME == "main") {
            notify_slack('Build failure')
          }
        }
      }
    }
  }
}
