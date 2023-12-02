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
        this.rate = 4;
        this.limit = 5;
        this.type = "passive";
       
    }
    activate(object, index){
        // removes the option once it reaches its limit
        if(this.currentAmount >=this.limit){
            powerups.splice(index,1)
            print("removing the fire up upgrade")
            print(powerups)
        }else{
            object.increaseFireRate(this.rate)
            this.currentAmount +=1;
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

class ShieldPowerup extends PowerUp{
    constructor(){
        super()
        this.rate = 10;
        this.declared = false
        this.limit = 1;
        this.time = -1;
        this.interval = 150;
        this.type = "active"
        this.timer = 3000;
        this.blocker = false;
    }
    activate(object, index){
        if(this.declared == false){
            this.declared = true;
            activePowers.push(this)
        }
        this.currentAmount +=1;
        // removes the option once it reaches its limit
        if(this.currentAmount >this.limit){
            powerups.splice(index,1)
            print("removing the Shield upgrade")
           // print(powerups)
        }
    }
    type(){return this.type;}
    run()
    {
        if(this.declared && millis()% (this.timer) > this.timer/2){
            if(this.blocker){
                this.blocker = false
                player.setImmune(!player.getImmune());
                if(player.player.ani.name != 'hit')
                {
                    player.handleAnimation()
                }
            }
        }else if (this.declared){
            this.blocker = true;
        }
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
        this.amount = 600;
        this.time = -1;
        this.currentAmount = 0;
        this.type = "active";
        this.timer = 3000;
        this.blocker = false;
    }

    activate(object, index){
        this.currentAmount +=1;
        if(this.declared == false){
            this.declared = true;
            activePowers.push(this)
        }
        else{
            if(this.timer - this.amount > 1)
                this.timer -= this.amount
            else{
                this.timer = 100;
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
        if(this.declared && millis()% (this.timer) > this.timer/2){
            if(this.blocker){
                this.blocker = false;
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
        }else if (this.declared){
            this.blocker = true;
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

class MagnetPowerUp extends PowerUp {
    constructor(){
        super()
        this.limit = 1;
        this.range = 200;
        this.interval = 100;
        this.declared = false
        this.amount = 300;
        this.time = -1;
        this.currentAmount = 0;
        this.type = "active";
        this.frames = 500;
        this.magnet;
        this.timer = 3000;
        this.blocker = false;
        this.pullingOrbs = []
    }

    activate(object, index){
        this.currentAmount +=1;
        if(this.declared == false){
            this.declared = true;
            this.magnet = new non_colliding.Sprite(player.player.x,player.player.y,this.range);
            this.magnet.layer = -1 ;
            this.magnet.visible = false;
            player.player.overlaps(this.magnet);
            activePowers.push(this)
        }
        else{
            if(this.timer - this.amount > 1)
            this.timer -= this.amount
        else{
            this.timer = 100;
        }

        }
        if(this.currentAmount >=this.limit){
            powerups.splice(index,1)
            print("removing the Damage upgrade")
            print("Power ups: ",powerups)
        }
    }
    type(){return this.type;}
    run(){
        if(this.declared && millis()% (this.timer) > this.timer/2){
            if(this.blocker){
                this.blocker = false
                orbs.forEach(e => {
                    e.moveTo(player.player, 50)
                    
                });
            }
    }else if (this.declared){
        this.blocker = true;
    }   
}
        
    getRate(){
        return this.interval;
    }
    getTime(){
        return this.time;
    }
    setTime(num){this.time = num;}

};

function runActivePowerups(){
    activePowers.forEach(e => {
            e.run();
    });
}

