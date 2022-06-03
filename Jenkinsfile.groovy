pipeline {
agent any
    stages {
        stage ('Build') {

        }
        stage ('Test') {

        }
        stage ('QA') {

        }
        stage ('Deploy') {

        }
        stage ('Monitor') {

        }

    }
 }
node {
     stage('Applitools build') {
         Applitools('https://blackboardeyes.applitools.com') {
               sh 'mvn clean test'
         }
     }
}
