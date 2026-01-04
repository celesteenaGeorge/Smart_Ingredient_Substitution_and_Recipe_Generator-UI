pipeline {
    agent any

    stages {

        stage('Build & Deploy Frontend') {
            steps {
                sshagent(credentials: ['ec2-ssh-key']) {

                    sh '''
                        ssh -o StrictHostKeyChecking=no ec2-user@13.61.19.36 "
                            mkdir -p ~/frontend
                        "
                    '''

                    sh '''
                        scp -r . ec2-user@13.61.19.36:~/frontend
                    '''

                    sh '''
                        ssh -o StrictHostKeyChecking=no ec2-user@13.61.19.36 "
                            cd ~/frontend
                            sudo docker stop ris-frontend || true
                            sudo docker rm ris-frontend || true
                            sudo docker build -t ris-frontend .
                            sudo docker run -d \
                              --name ris-frontend \
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
