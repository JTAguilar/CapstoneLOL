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
          sh 'git fetch https://github.com/JTAguilar/CapstoneLOL/'
          sh 'find ~/my-pipeline -type f -print0 | xargs -0 mv -t ~/my-pipeline/html'
        }
      }
    }
  }
}
