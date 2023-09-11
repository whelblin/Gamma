// file to store the tiemr object
// constructor should get the initial time
// the getCurrentTime should return the current time - the initial time
class Timer{
    constructor(){
        this.timer = new Date();
        this.initSec =this.timer.getTime()/1000;
    }

    getCurrentSec(){
        let temp = new Date();
        return (Math.floor(temp.getTime()/1000 - this.initSec)% 60);
    }
    getCurrentMin(){
        let temp = new Date();
        return Math.floor(temp.getTime()/(1000 * 60) - this.initSec/60);
    }
    printTimer(x,y){
        textSize(20);
        textAlign(CENTER);
        textFont("comic sans");
        text("Time: " + timer.getCurrentMin() + ":"+ timer.getCurrentSec(), x,y);
    }
}