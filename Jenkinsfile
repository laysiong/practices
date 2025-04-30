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
        

       stage('Build Docker Image') {
            steps {
                script {

                    // Build the Docker image
                    sh "docker build -t ${IMAGE_NAME}:latest ."
                    
                    // Log in to Docker Hub (if pushing to Docker Hub)
                    withCredentials([usernamePassword(credentialsId: 'your-dockerhub-credentials-id', passwordVariable: 'DOCKER_PASSWORD', usernameVariable: 'DOCKER_USERNAME')]) { // Replace with your Docker Hub credentials ID
                        sh "docker login -u ${DOCKER_USERNAME} -p ${DOCKER_PASSWORD}"
                        
                        // Push the Docker image to Docker Hub
                        sh "docker push ${IMAGE_NAME}:latest"
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
