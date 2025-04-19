pipeline {
    agent any

    stages {
        stage('Build') {
            steps {
                echo 'Building...'
                sh 'echo Hello from Build stage'
            }
        }

        stage('Test') {
            steps {
                echo 'Running tests...'
                sh 'echo Hello from Test stage'
            }
        }

        stage('Deploy') {
            when {
                branch 'main'
            }
            steps {
                echo 'Deploying to production...'
                // Add your docker build + droplet deploy steps here
            }
        }
    }
}
