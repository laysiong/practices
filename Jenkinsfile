pipeline {
    agent any

    environment {
        IMAGE_NAME = 'laysiong/my-app'
    }

    stages {

        stage('Checkout Code') {
            steps {
                script {  // Add this script block
                    checkout scm

                    // Extract commit message
                    def commitMessage = sh(script: 'git log -1 --pretty=%B', returnStdout: true).trim()
                    echo "Commit messages: ${commitMessage}"
                    
                    // Store the deployment decision in a variable (NOT environment variable)
                    shouldDeploy = commitMessage.toLowerCase().contains("deploy")
                    echo "Should deploy? ${shouldDeploy}"
                }  
            }
        }

    stage('Build and Deploy') {
        when {
            expression { 
                // Reference the variable we created in the previous stage
                echo "Should deploy? ${shouldDeploy}"
                return shouldDeploy 
            }
        }
        stages{
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
                                sh '''
                                        echo "$DOCKER_PASSWORD" | docker login -u "$DOCKER_USERNAME" --password-stdin
                                    '''
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

                stage('Deploy App') {
                    steps {
                        script {
                                withCredentials([sshUserPrivateKey(credentialsId: 'ec2-ssh-key', keyFileVariable: 'KEY_FILE')]) {
                            def ec2Instance = 'ubuntu@ec2-18-141-25-61.ap-southeast-1.compute.amazonaws.com'
                            
                            sh """
                                ssh -o StrictHostKeyChecking=no -i ${KEY_FILE} ${ec2Instance} '
                                # Pull latest image
                                docker pull ${IMAGE_NAME}:latest
                                echo "Pulled latest image"

                                # Stop and remove existing container
                                docker stop my-running-app || true
                                docker rm my-running-app || true
                                
                                # Run new container
                                docker run -d --name my-running-app -p 80:3000 --restart unless-stopped ${IMAGE_NAME}:latest
                                echo "Deployed new container"
                                '
                                """
                            }
                        }
                    }
                }
            }
        }
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
