
// abstract class for the powerups
class PowerUp{
    constructor(){
        this.currentAmount = 0;
    }
    // pure virtual function
    activate(){ throw "Need to define concrete"}
    type(){ throw "Need to define concrete"}
};


class FireRate extends PowerUp{
    constructor(){
        super()
        this.rate = 3;
        this.limit = 5;
        this.type = "passive";
       
    }
    activate(object, index){
        object.increaseFireRate(this.rate)
        this.currentAmount +=1;
        // removes the option once it reaches its limit
        if(this.currentAmount >=this.limit){
            powerups.splice(index,1)
            print("removing the fire up upgrade")
            print(powerups)
        }
    }
    type(){return this.type;}
};

class MovementSpeed extends PowerUp{
    constructor(){
        super()
        this.rate = 3;
        this.limit = 5;
        this.type = "passive";
    }
    activate(object, index){
        object.increaseMovementSpeed(this.rate)
        this.currentAmount +=1;
        // removes the option once it reaches its limit
        if(this.currentAmount >=this.limit){
            powerups.splice(index,1)
            print("removing the Movement Speed upgrade")
            print(powerups)
        }
    }
    type(){return this.type;}
};

class HealthIncrease extends PowerUp{
    constructor(){
        super()
        this.rate = 25;
        this.limit = 5;
        this.type = "passive";
    }
    activate(object, index){
        object.increaseHealth(this.rate)
        this.currentAmount +=1;
        // removes the option once it reaches its limit
        if(this.currentAmount >=this.limit){
            powerups.splice(index,1)
            print("removing the Health upgrade")
            print(powerups)
        }
    }
    type(){return this.type;}
};


class DamageIncrease extends PowerUp{
    constructor(){
        super()
        this.rate = 10;
        this.limit = 5;
        this.type = "passive";
    }
    activate(object, index){
        object.increaseDamage(this.rate)
        this.currentAmount +=1;
        // removes the option once it reaches its limit
        if(this.currentAmount >=this.limit){
            powerups.splice(index,1)
            print("removing the Damage upgrade")
            print(powerups)
        }
    }
    type(){return this.type;}
};


class turretPowerUp extends PowerUp {
    constructor(){
        super()
        this.limit = 5;
        this.fireRate = 100;
        this.declared = false
        this.amount = 20;
        this.time = -1;
        this.currentAmount = 0;
        this.type = "active";
    }

    activate(object, index){
        this.currentAmount +=1;
        if(this.declared == false){
            this.declared = true;
            activePowers.push(this)
        }
        else{
            if(this.fireRate - this.amount > 1)
                this.fireRate -= this.amount
            else{
                this.fireRate = 5;
            }

        }
        if(this.currentAmount >=this.limit){
            powerups.splice(index,1)
            print("removing the Damage upgrade")
            print(powerups)
        }
    }
    type(){return this.type;}
    run(){

        let closest = 100000;
        let target;
        asteroids.forEach(e => {
            let temp = dist(e.x, e.y,player.player.x,player.player.y)
            if(temp < closest){
                closest = temp;
                target = e
            }
        });
        trackers.forEach(e => {
            let temp = dist(e.x, e.y,player.player.x,player.player.y)
            if(temp < closest){
                closest = temp;
                target = e
            }
        });
        shooters.forEach(e => {
            let temp = dist(e.x, e.y,player.player.x,player.player.y)
            if(temp < closest){
                closest = temp;
                target = e
            }
        });
        if(target != undefined){
        let bullet = new Bullet(player.player.x,player.player.y, bullets);
        player.player.overlaps(bullet.getObject());
        bullet.movement(target);
        }
    }
    getRate(){
        return this.fireRate;
    }
    getTime(){
        return this.time;
    }
    setTime(num){this.time = num;}

};