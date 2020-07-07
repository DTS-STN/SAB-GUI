pipeline {
    agent any
    parameters {
        string(name: 'DOCKER_TAG', defaultValue: 'latest', description: 'Version of docker image')
        string(name: 'TIER', defaultValue: 'frontend', description: 'Target portion of application: frontend,admin,middle,database')
    }
    environment {
        JENKINS_SPN     = credentials('JENKINS_SPN_ID')
        JENKINS_SPN_PASS = credentials('JENKINS_SPN_PASS')
        AZURE_TENANT_ID = credentials('AZURE_TENANT_ID')
    }    
    stages {
        stage('Deploy') {
            steps {
               sh 'az login --service-principal -u $JENKINS_SPN -p $JENKINS_SPN_PASS --tenant $AZURE_TENANT_ID'
               sh '''
                    cd ./helmfile
                    . ./context-dev.sh > /dev/null
                    helmfile --environment dev --selector tier=$TIER apply
                '''
            }
        }
    }
}