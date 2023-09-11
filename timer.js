// file to store the tiemr object
// constructor should get the initial time
// the getCurrentTime should return the current time - the initial time
class Timer{
    constructor(){
        this.timer = new Date();
        this.initSec =this.timer.getTime()/1000;
    }

    getCurrentTime(){
        let temp = new Date();
        return temp.getTime()/1000 - this.initSec;
    }
}