pipeline {
    agent any

    environment {
        IMAGE_NAME = 'laysiong/my-app'
        DOCKER_HUB_CREDS = credentials('dockerhub-credentials')
    }

    stages {

        stage('Checkout Code') {
            steps {
                checkout scm
            }
        }
        

       stage('Build Docker Image') {
            steps {
                script {
                    // Build the Docker image
                    sh "docker build -t ${IMAGE_NAME}:latest ."
                    
                    // Login to Docker Hub
                    sh "echo ${DOCKER_HUB_CREDS_PSW} | docker login -u ${DOCKER_HUB_CREDS_USR} --password-stdin"
                    
                    // Push the image
                    sh "docker push ${IMAGE_NAME}:latest"
                }
            }
        }


        stage('Upload App Image') {
            steps {
                script {
                    echo "Pushing Docker image..."
                }
            }
        }

        // stage('Cleanup Docker') {
        //     steps {
        //         script {
        //             sh 'docker system prune -f'
        //         }
        //     }
        // }

        // stage('Deploy App') {
        //     steps {
        //         script {
        //             // Stop + remove old container, then run new one
        //             sh """
        //             docker stop my-running-app || true
        //             docker rm my-running-app || true
        //             docker run -d --name my-running-app -p 80:3000 ${IMAGE_NAME}:latest
        //             """
        //         }
        //     }
        // }
    }

    post {
        success {
            echo "✅ Deployment pipeline completed successfully!"
        }
        failure {
            echo "❌ Something went wrong!"
        }
        always {
            // Always logout from Docker
            sh 'docker logout'
        }
    }
}
