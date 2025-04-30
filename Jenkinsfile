pipeline {
    agent {
        docker {
            image 'docker:latest'
        }
    }

    environment {
        IMAGE_NAME = 'laysiong/my-app'
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
                    docker.build("${IMAGE_NAME}:latest")
                    
                     // For push
                    docker.withRegistry('https://registry.hub.docker.com', 'your-dockerhub-credentials-id') {
                        docker.image("${IMAGE_NAME}:latest").push()
                    }
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
    }
}
