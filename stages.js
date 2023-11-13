class StageHandler{
    constructor(){
        print("entering first stage")
        this.current_stage = FirstStage.instance()
    }
    checkStage(){
        if (timer.getCurrentMin() >= 8){
            print("entering second stage")
            this.current_stage = ThirdStage.instance()

        } else if (timer.getCurrentMin() >=3){
            print("entering third stage")
            this.current_stage = SecondStage.instance()
        }
        this.#run()
    }
    #run(){
        this.current_stage.run()
    }
};

class Stage{

};

class FirstStage extends Stage{
    constructor(){
        super()
        this.rockPrev = -1;
        this.trackerPrev = -1;
        this.rockSpawnRate = 8;
        this.rockMaxSpawn = 5;
        this.trackerStartRate = 15;
        this.trackerSpawnRate = this.trackerStartRate;
        this.minute = 0;
    }
    static firstStage =  new FirstStage()
    static instance(){
        return FirstStage.firstStage;
    }
    run(){
        let rockNow = parseInt(timer.getCurrentSec());
        let trackerNow = parseInt(timer.getCurrentSec());
        if(rockNow %this.rockSpawnRate  == 0 &&  rockNow != this.rockPrev){
            for(let i = 0; i < Math.min(Math.ceil(player.getLevel()),this.rockMaxSpawn);++i){
            let rock = new Asteroid();
            rock.movement();
            }
            this.rockPrev = rockNow;
            if (timer.getCurrentMin() > this.minute){
                if(this.rockSpawnRate - 1 > 0)
                    this.rockSpawnRate -=1;
                if(this.trackerSpawnRate - 1 > 0)
                    this.trackerSpawnRate-=3;
                this.minute = timer.getCurrentMin()
            }
          }
          if(trackerNow %this.trackerSpawnRate == 0 && trackerNow !=this.trackerPrev && this.trackerSpawnRate > 0 && this.trackerStartRate != this.trackerSpawnRate){
            for(let i = 0; i < Math.ceil(player.getLevel());++i){
            let track = new Tracker();
            track.movement();
            }
            this.trackerPrev = trackerNow;
          }
    }
}
class SecondStage extends Stage{
    static secondStage =  new SecondStage()
    static instance(){
        return SecondStage.secondStage;
    }
    run(){
        print("second stage")
    }
}

class ThirdStage extends Stage{
    static thirdStage =  new ThirdStage()
    static instance(){
        return ThirdStage.thirdStage;
    }
    run(){
        print("third stage")
    }
}
