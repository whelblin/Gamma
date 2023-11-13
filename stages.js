class StageHandler{
    constructor(){
        this.current_stage = FirstStage.instance()
    }
    checkStage(){
        if (timer.getCurrentMin() >= 8){
            this.current_stage = ThirdStage.instance()

        } else if (timer.getCurrentMin() >=3){
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
    static firstStage =  new FirstStage()
    static instance(){
        return FirstStage.firstStage;
    }
    run(){
        print("first stage")
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
