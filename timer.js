// file to store the tiemr object
// constructor should get the initial time
// the getCurrentTime should return the current time - the initial time
class Timer{
    constructor(){
        // creates the data object
        this.timer = new Date();
        // get the initial time when the program is started
        this.initSec =this.timer.getTime()/1000;
        //this.rockPrev = -1;
        //this.trackerPrev = -1;
        //this.prevTime = -1;
        //this.shooterPrev = -1;
        this.pausedSec = 0;
        this.pausedMin = 0;
        this.totalPausedSec = 0;
        this.totalPausedMin = 0;
        this.startPauseTime = 0;
        this.deathTime = new Date()
        this.minute = 0;
        this.flag = false;

    }
    startPause(){
        var temp = new Date();
        this.startPauseTime = Math.floor(temp.getTime()/1000)
    }
    endPause(){
        this.startPauseTime = 0;
        this.totalPausedSec += this.pausedSec;
        this.totalPausedMin += this.pausedMin;
    }
    
    pausedTime(){
        var temp = new Date();
        let time = Math.floor(temp.getTime()/1000 - this.startPauseTime)
        print(time)
        this.pausedSec = time%60
        this.pausedMin = Math.floor(time/60)

        
    }
    endTimer(){
        this.deathTime = new Date()
    }
    // gets the amount of seconds
    getCurrentSec(timer = new Date()){
        // substracts the current time by the initial time
        // modulus 60 to wrap the seconds
        var temp = timer;
        var num = (Math.floor(temp.getTime()/1000 - this.initSec) - this.totalPausedSec )% 60;
        // puts a 0 infront if the seconds are single digits
        
        // example: 1:01
        if(num > 0){
            this.flag =true
        }
        if(num == 0 && this.flag){
            this.minute +=1;
            this.flag = false;
        }
        if(Math.floor(num/10) == 0){
            let newNum = "0"+String(num)   
            return (newNum);         
        }
        return (num %60);
    }
    getMillis(){
        var temp = new Date();
        var num = temp.getTime();
        return (num);
    }
    // gets the amount of seconds
    getCurrentMin(timer = new Date()){
        return this.minute
    }
    // prints the timer to the screen
    printTimer(x,y){
        textSize(60);
        textAlign(CENTER);
      //  textFont("comic sans");
        text("Time: " + timer.getCurrentMin() + ":"+ timer.getCurrentSec(), x,y);
    }
    printFinalTimer(x,y){
        textSize(60);
        textAlign(CENTER);
      //  textFont("comic sans");
        text("Time: " + timer.getCurrentMin(this.deathTime) + ":"+ timer.getCurrentSec(this.deathTime), x,y);
    }
    enemySpawn(asteroids,trackers){
        let rockNow = parseInt(timer.getCurrentSec());
        let trackerNow = parseInt(timer.getCurrentSec());
        let shooterNow = parseInt(timer.getCurrentSec());
        if(rockNow %2  == 0 &&  rockNow != this.rockPrev){
            for(let i = 0; i < Math.ceil(player.getLevel()/2);++i){
            let rock = new Asteroid();
            rock.movement();
            }
            this.rockPrev = rockNow;
          }
          if(trackerNow %5 == 0 && trackerNow !=this.trackerPrev){
            for(let i = 0; i < Math.ceil(player.getLevel()/2);++i){
            let track = new Tracker();
            track.movement();
            }
            this.trackerPrev = trackerNow;
          }
          if(shooterNow %20 == 0 && shooterNow !=this.shooterPrev){
            for(let i = 0; i < Math.ceil(player.getLevel()/2);++i){
            let shoot = new Shooter();
            shoot.movement();
            }
            this.shooterPrev = shooterNow;
          }
    }

    activatePowers(){
        let time = frameCount;
        activePowers.forEach(e => {
            if(time % e.getRate() == 0 && e.getTime() != time){
                e.run()
                e.setTime(time)
            }
        });
       
    
    }

}