pipeline {
    agent any

    environment {
        IMAGE_NAME = 'laysiong/my-app'
    }

    stages {

        stage('Checkout Code') {
            steps {
                checkout scm
            }
        }
        

        stage('Build App Image') {
            steps {
                script {
                    echo "Building Docker image..."
                    dockerImage = docker.build("${IMAGE_NAME}:${BUILD_NUMBER}")
                }
            }
        }


        stage('Upload App Image') {
            steps {
                script {
                    echo "Pushing Docker image..."
                    docker.withRegistry('https://registry.hub.docker.com', 'dockerhub-credentials') {
                        dockerImage.push("${BUILD_NUMBER}")
                        dockerImage.push("latest")
                    }
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
    }
}
