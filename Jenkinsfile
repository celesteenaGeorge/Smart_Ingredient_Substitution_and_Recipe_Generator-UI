pipeline {
    agent any

    stages {

        stage('Deploy Frontend to EC2') {
            steps {
                sshagent(credentials: ['ec2-ssh-key']) {

                    sh '''
                    ssh -o StrictHostKeyChecking=no ec2-user@13.61.19.36 "
                        rm -rf ~/frontend
                        mkdir -p ~/frontend
                    "
                    '''

                    sh '''
                    scp -r \
                      Dockerfile nginx.conf package.json package-lock.json vite.config.* src public \
                      ec2-user@13.61.19.36:~/frontend
                    '''

                    sh '''
                    ssh -o StrictHostKeyChecking=no ec2-user@13.61.19.36 "
                        cd ~/frontend
                        sudo docker stop ris-frontend || true
                        sudo docker rm ris-frontend || true
                        sudo docker build -t ris-frontend .
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
