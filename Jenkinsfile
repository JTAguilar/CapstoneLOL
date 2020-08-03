pipeline {

	agent any
	environment{
	Host
	}
  stages{
  
    stage("build"){
    
      steps {
        echo 'building the application...'
          dir('html') {
            sh 'pwd'
            sh 'git fetch https://github.com/JTAguilar/CapstoneLOL/'
            //sh 'find ~/my-pipeline -type f -print0 | xargs -0 mv -t ~/my-pipeline/html'
		
          }
        
        }
     }
    
    stage("test") {
    
      steps{
        echo 'testing the application...'
      }
    }
    
    stage("deploy") {
       
      steps {
        echo 'Deploying the applicaiton...'
	sh 'docker cp trusting_elbakyan:var/jenkins_home/workspace/my-pipeline /var/www/'
	      //sh 'ip addr show docker0 | grep -Po 'inet \K[\d.]+'
	
      }
    }
  }
}
