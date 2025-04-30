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
