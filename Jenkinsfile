pipeline {

	agent any

  stages{
  
    stage("build"){
    
      steps {
        echo 'building the application...'
	      sh 'pwd'	
	      sh 'git fetch https://github.com/JTAguilar/CapstoneLOL/'
	      stash name: "testFiles"
          dir('html') {
            unstash "testFiles"
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
	sh 'cp -RT html /var/www/'
	      //sh 'ip addr show docker0 | grep -Po 'inet \K[\d.]+'
	
      }
    }
  }
}
