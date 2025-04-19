pipeline {
    agent any

     environment {
        DOCKER_IMAGE = 'laysiong/my-app:latest'
        REMOTE_USER = 'root'
        REMOTE_HOST = '152.42.251.131'
        SSH_KEY = credentials('your-ssh-private-key-id') // Add this in Jenkins credentials
    }

    stages {
        stage('Build') {
            steps {
                echo 'Building the app...'
                sh 'docker build -t $DOCKER_IMAGE .'
            }
        }

        stage('Push to Docker Hub') {
            steps {
                withCredentials([usernamePassword(credentialsId: 'dockerhub-creds-id', usernameVariable: 'DOCKER_USER', passwordVariable: 'DOCKER_PASS')]) {
                    sh '''
                        echo "$DOCKER_PASS" | docker login -u "$DOCKER_USER" --password-stdin
                        docker push $DOCKER_IMAGE
                    '''
                }
            }
        }

        stage('Deploy to Droplet') {
            steps {
                echo 'Deploying to DigitalOcean...'
                sh '''
                    ssh -i $SSH_KEY -o StrictHostKeyChecking=no $REMOTE_USER@$REMOTE_HOST << EOF
                    docker pull $DOCKER_IMAGE
                    docker stop yourapp || true
                    docker rm yourapp || true
                    docker run -d --name yourapp -p 80:80 $DOCKER_IMAGE
                    EOF
                '''
            }
        }
    }
}
