pipeline {
    agent any
    environment {
        DOCKER_HUB_REPO = 'ouail02/math3raphe-web'
        SPRING_PROFILES_ACTIVE = 'production'
        BRANCH = 'Main'
        Git_REPO = 'https://github.com/LaamiriOuail/MATH3RAPHE-WEB'
    }

    stages {
        stage('Checkout') {
            steps {
                script {
                    checkout([$class: 'GitSCM', branches: [[name: "${BRANCH}"]], doGenerateSubmoduleConfigurations: false, extensions: [], submoduleCfg: [], userRemoteConfigs: [[url: "${Git_REPO}"]]])
                }
            }
        }
        stage('Build Docker Image') {
            steps {
                sh "docker build -t ${DOCKER_HUB_REPO}:${env.BUILD_NUMBER} ."
            }
        }
        stage('Push to Docker Hub') {
            steps {
                script {
                    withCredentials([string(credentialsId: 'DOCKER_HUB_USERNAME', variable: 'DOCKER_HUB_USERNAME'), string(credentialsId: 'DOCKER_HUB_PASSWORD', variable: 'DOCKER_HUB_PASSWORD')]) {
                        sh "docker login -u ${DOCKER_HUB_USERNAME} -p ${DOCKER_HUB_PASSWORD}"
                    }
                    sh "docker push ${DOCKER_HUB_REPO}:${env.BUILD_NUMBER}"
                }
            }
        }
    }
    post {
            always {
                script {
                    sh "docker rmi ${DOCKER_HUB_REPO}:${env.BUILD_NUMBER}"
                }
            }
        }
}