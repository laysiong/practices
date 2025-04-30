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
        
        stage('Test Docker Plugin') {
            steps {
                script {
                    // Test if Docker plugin is working
                    echo "Testing Docker plugin..."
                    
                    // Using Docker plugin syntax
                    docker.image('hello-world').run()
                    
                    // Or check Docker version
                    sh "docker --version"
                }
            }
        }

       stage('Build Docker Image') {
            steps {
                script {
                  
                    echo "Starting Docker build"
                    def dockerImage = docker.build("${IMAGE_NAME}:latest", "--no-cache .")
                    echo "Finished Docker build"
                }
            }
        }


        stage('Upload App Image') {
            steps {
                script {
                     // Login to Docker Hub (you'll need to configure credentials in Jenkins)
                    withCredentials([usernamePassword(credentialsId: 'dockerhub-credentials', passwordVariable: 'DOCKER_PASSWORD', usernameVariable: 'DOCKER_USERNAME')]) {
                        sh "echo ${DOCKER_PASSWORD} | docker login -u ${DOCKER_USERNAME} --password-stdin"
                    }
                    
                    // Push the image
                    sh "docker push ${IMAGE_NAME}:latest"
                    
                    // Logout for security
                    sh "docker logout"
                }
            }
        }

        stage('Cleanup Docker') {
            steps {
                script {
                    sh 'docker system prune -f'
                }
            }
        }

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
            // Always logout from Docker for security
            sh 'docker logout || true'
            echo "🔒 Docker logout performed"
        }
    }
}
