// file to store the tiemr object
// constructor should get the initial time
// the getCurrentTime should return the current time - the initial time
class Timer{
    constructor(){
        // creates the data object
        this.timer = new Date();
        // get the initial time when the program is started
        this.initSec =this.timer.getTime()/1000;
        this.prev = -1;
    }
    // gets the amount of seconds
    getCurrentSec(){
        // substracts the current time by the initial time
        // modulus 60 to wrap the seconds
        var temp = new Date();
        var num = Math.floor(temp.getTime()/1000 - this.initSec)% 60;
        // puts a 0 infront if the seconds are single digits
        // example: 1:01
        if(Math.floor(num/10) == 0){
            let newNum = "0"+String(num)   
            return (newNum);         
        }
        return (num);
    }
    // gets the amount of seconds
    getCurrentMin(){
        let temp = new Date();
        return Math.floor(temp.getTime()/(1000 * 60) - this.initSec/60);
    }
    // prints the timer to the screen
    printTimer(x,y){
        textSize(20);
        textAlign(CENTER);
        textFont("comic sans");
        text("Time: " + timer.getCurrentMin() + ":"+ timer.getCurrentSec(), x,y);
    }
    asteroidSpawn(asteroids){
        this.now = parseInt(timer.getCurrentSec());
        if(this.now %1 == 0 && this.now != this.prev){
            console.log("test1")
            let rock = new Asteroid(asteroids);
            rock.movement();
            this.prev = this.now;
          }
    }
}