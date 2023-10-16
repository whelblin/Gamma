
// abstract class for the powerups
class PowerUp{
    constructor(){
        this.currentAmount = 0;
    }
    activate(){}
};


class FireRate extends PowerUp{
    constructor(){
        super()
        this.rate = 10;
        this.limit = 5;
       
    }
    activate(object, index){
        object.setFireRate(this.rate)
        this.currentAmount +=1;
        // removes the option once it reaches its limit
        if(this.currentAmount >=this.limit){
            powerups.splice(index,1)
            print("removing the fire up upgrade")
            print(powerups)
        }
    }
};