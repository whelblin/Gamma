// file for the trackers class object
// constructor should create the sprite and store it in a private attribute
// methods will act on the sprite, such as spawning
class Tracker{
    constructor(){

        this.tracker = new trackerGroup.Sprite(width/2,height/2, 50);
        this.tracker.addAnimation('small','assets/bugb.png');
        this.tracker.Trackingspeed = 3;
       //this.tracker.attractTo(player,25);
        this.health = 20
        this.experericeAmount = 50
        this.attack = 15;
        this.tracker.damage = (num,x,y)=>{
            this.health -=num;
            if(this.health <= 0){
                removal(trackers,this.tracker)
                ExpOrb.createExp(x, y, this.experericeAmount)
                HealthPack.createHealth(x, y)
            }
        }
       trackers.push(this.tracker);

    }
    static getTrackerSpeed(){return this.trackerSpeed;}
    movement(){
        let x = floor(random(4));
        // left side
        if(x == 0){
            this.tracker.x = floor(random(-20, 0));
            this.tracker.y = floor(random(0, height));  
        }
        // top
        else if(x ==1){
            this.tracker.x = floor(random(0, width));
            this.tracker.y = floor(random(-20, 0)); 
        }
        // right
        else if(x ==2){
            this.tracker.x = floor(random(width, width+20));
            this.tracker.y = floor(random(0, height));
        }
        // bottom
        else if(x ==3){
            this.tracker.x = floor(random(0,width));
            this.tracker.y = floor(random(height, height+20));
        }
    }
};

class Shooter{
    static bulletArray = [];
    constructor(){

        this.shooter = new trackerGroup.Sprite(width/2,height/2, 50);
        this.shooter.addAnimation('small','assets/bird.gif');
        this.shooter.Trackingspeed = .7;
        this.health = 10
        this.fireRate = 300;
        this.attack = 10;
        this.experericeAmount = 50
        this.shooter.damage = (num,x,y)=>{
            this.health -=num;
            if(this.health <= 0){
                removal(shooters,this.shooter)
                ExpOrb.createExp(x, y, this.experericeAmount)
                HealthPack.createHealth(x, y)
            }
        }
        this.shooter.shoot = () =>{
            if(frameCount % this.fireRate == 0){
                let bullet = new ShooterBullet(this.shooter.x, this.shooter.y,Shooter.bulletArray);
                this.shooter.overlaps(bullet.getObject());
                bullet.movement(player.player, 3);
            }
        } 
        this.shooter.checkBulletHit = (array) =>{
            if(Array.isArray(array))
            array.forEach(object => {
                Shooter.bulletArray.forEach(bullet => {
                    if(bullet.removed == true){
                        removal(Shooter.bulletArray, bullet)
                        removal(allBullets, bullet)
                    }
                    if(bullet.collides(object)){ // hit
                        object.damage(this.attack,object.x, object.y)   
                        removal(Shooter.bulletArray, bullet)
                        removal(allBullets, bullet)
                        asteroidHitSound.play();
    
                    }
                });
            });
            else{
                array.checkShipHitShooter(Shooter.bulletArray, true)
            }
        }
       shooters.push(this.shooter);

    }
    static getShooterSpeed(){return this.shooter.speed;}
    movement(){
        let x = floor(random(4));
        // left side
        if(x == 0){
            this.shooter.x = floor(random(-20, 0));
            this.shooter.y = floor(random(0, height));  
        }
        // top
        else if(x ==1){
            this.shooter.x = floor(random(0, width));
            this.shooter.y = floor(random(-20, 0)); 
        }
        // right
        else if(x ==2){
            this.shooter.x = floor(random(width, width+20));
            this.shooter.y = floor(random(0, height));
        }
        // bottom
        else if(x ==3){
            this.shooter.x = floor(random(0,width));
            this.shooter.y = floor(random(height, height+20));
        }
    }


};