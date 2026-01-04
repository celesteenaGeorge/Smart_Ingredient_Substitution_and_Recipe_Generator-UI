pipeline {
    agent any

    stages {

        stage('Build Frontend Image') {
            steps {
                sh 'docker build -t ris-frontend .'
            }
        }

        stage('Deploy Frontend to EC2') {
            steps {
                sshagent(credentials: ['ec2-ssh-key']) {

                    sh '''
                    ssh -o StrictHostKeyChecking=no ec2-user@13.61.19.36 "
                        sudo docker stop ris-frontend || true
                        sudo docker rm ris-frontend || true

                        sudo docker run -d --name ris-frontend \
                          --restart unless-stopped \
                          -p 80:80 \
                          ris-frontend
                    "
                    '''
                }
            }
        }
    }
}
