pipeline {

  agent any

  stages{
  
    stage("build"){
    
      steps {
        echo 'building the application...'
        
      }
    }
    
    stage("test") {
    
      steps{
        echo 'testing the application...'
      }
    }
    
    stage("deploy") {
       
      steps {
        dir('html') {
          sh 'pwd'
          sh 'git pull https://github.com/JTAguilar/CapstoneLOL/'
        }
      }
    }
  }
}
