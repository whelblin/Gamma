
// abstract class for the powerups
class PowerUp{
    constructor(){
        this.currentAmount = 0;
    }
    // pure virtual function
    activate(){ throw "Need to define concrete"}
};


class FireRate extends PowerUp{
    constructor(){
        super()
        this.rate = 1;
        this.limit = 5;
       
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
};

class MovementSpeed extends PowerUp{
    constructor(){
        super()
        this.rate = 3;
        this.limit = 5;
       
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
};

class HealthIncrease extends PowerUp{
    constructor(){
        super()
        this.rate = 25;
        this.limit = 5;
       
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
};


class DamageIncrease extends PowerUp{
    constructor(){
        super()
        this.rate = 10;
        this.limit = 5;
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
};

class ShieldPowerup extends PowerUp{
    constructor(){
        super()
        this.rate = 10;
        this.declared = false
        this.limit = 1;
        this.time = -1;
        this.interval = 150;
    }
    activate(object, index){
        if(this.declared == false){
            print("activated shield")
            this.declared = true;
            activePowers.push(this)
        }
        this.currentAmount +=1;
        // removes the option once it reaches its limit
        if(this.currentAmount >this.limit){
            powerups.splice(index,1)
            print("removing the Shield upgrade")
            print(powerups)
        }
    }
    run()
    {
       // print("hi")
        player.setImmune(!player.getImmune());
    }
    getRate(){
        return this.interval;
    }
    getTime(){
        return this.time;
    }
    setTime(num){this.time = num;}
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

            if(this.currentAmount >=this.limit){
                powerups.splice(index,1)
                print("removing the Damage upgrade")
                print(powerups)
            }
        }
    }
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
        if(target != undefined){
        let bullet = new Bullet(player.player.x,player.player.y);
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