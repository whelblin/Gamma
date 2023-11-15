class StageHandler{
    constructor(){}
    static checkStage(){
        //8 to 10 minutes
        if (timer.getCurrentMin() >= 8){
            currentStage = SecondStage.instance() // switch to three once done
        // 3 to 8 minutes
        } else if (timer.getCurrentMin() >=3){
            currentStage = SecondStage.instance(player.getLevel())
        // 0 to 3 minutes
        } else {
            currentStage = FirstStage.instance()
        }
        
        currentStage.run()
    }
    
    #currentStage
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
    constructor(){
        super()
        this.rockPrev = -1;
        this.startingLevel = 0;
        this.trackerPrev = -1;
        this.shooterPrev = -1;
        this.rockSpawnRate = 30;
        this.rockMaxSpawn = 8;
        this.trackerMaxSpawn = 10;
        this.trackerStartRate = 8;
        this.shooterMaxSpawn = 10;
        this.trackerSpawnRate = this.trackerStartRate;
        this.shooterStartRate = 25;
        this.shooterSpawnRate = this.shooterStartRate;
        this.minute = 2;

    }
    static secondStage =  new SecondStage()
    static instance(level){
        return SecondStage.secondStage;
    }
    run(){
        let rockNow = parseInt(timer.getCurrentSec());
        let trackerNow = parseInt(timer.getCurrentSec());
        let shooterNow = parseInt(timer.getCurrentSec());
        if(rockNow %this.rockSpawnRate  == 0 &&  rockNow != this.rockPrev){
            for(let i = 0; i < Math.min(Math.ceil(player.getLevel()/4),this.rockMaxSpawn);++i){
            let rock = new Asteroid();
            rock.movement();
            }
            this.rockPrev = rockNow;
            if (timer.getCurrentMin() > this.minute){
                if(this.rockSpawnRate - 1 > 0)
                    this.rockSpawnRate -= 1;
                if(this.trackerSpawnRate - 3 > 0)
                    this.trackerSpawnRate-= 3;
                if(this.shooterSpawnRate - 2 > 0)
                    this.shooterSpawnRate -= 2;
                this.minute = timer.getCurrentMin()
            }
          }
          if(trackerNow %this.trackerSpawnRate == 0 && trackerNow !=this.trackerPrev && this.trackerSpawnRate > 0 && this.trackerStartRate != this.trackerSpawnRate){
            for(let i = 0; i < Math.min(Math.ceil(player.getLevel()/4),this.trackerMaxSpawn);++i){
            let track = new Tracker();
            track.movement();
            }
            this.trackerPrev = trackerNow;
          }

          if(shooterNow %this.trackerSpawnRate == 0 && shooterNow !=this.shooterPrev && this.shooterSpawnRate > 0 && this.shooterStartRate != this.shooterSpawnRate){
           
            let shoot = new Shooter();
            shoot.movement();
            
            this.shooterPrev = shooterNow;
          }
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
