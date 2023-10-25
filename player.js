// file for the player class object
// constructor should create the sprite and store it in a private attribute
// methods will act on the sprite, such as movement

class Player{
    constructor(){
        this.player = new colliding.Sprite(width/2,height/2,80)
        this.player.addAnis(this.idleAni);
        this.player.addAnis(this.hitAni);
        this.player.changeAni('idle');
        this.immune = false;
        this.fireRate = 25;
        this.speed = 8;
        this.health = new PlayerHealth()
        this.damage = 10;
    }
     // loads the aniamtion during the reload function
    static preload(){
        this.spriteSheet = 'assets/sheet.png';
        this.frameDelay = 4;
        this.idleAni = loadAni("idle",this.spriteSheet,{
            frameSize: [80,80], frames: 1
        })
        this.hitAni = loadAni("hit",this.spriteSheet,{
            frameSize: [80,80], frames: 4
        })
    }
    increaseFireRate(num){(this.fireRate - num > 0) ? this.fireRate -= num : this.fireRate = 1;}
    increaseMovementSpeed(num){this.speed += num;}
    increaseDamage(num){this.damage +=num;}
    /*
    movement(){
        this.player.speed = 8;
        if (kb.pressing('up') && this.player.y - this.player.speed >= 0) { this.player.direction = -90; }
        if (kb.pressing('down')  && this.player.y + this.player.speed <= height) { this.player.direction = 90; }
        if (kb.pressing('left')  && this.player.x - this.player.speed >= 0) { this.player.direction = 180; } 
        if (kb.pressing('right')&& this.player.x + this.player.speed <= width) { this.player.direction = 0; } 
        if(this.player.y > 0 && this.player.y < height && this.player.x > 0 && this.player.x < width) { this.player.speed = 0; }
        if(kb.pressing('up') && kb.pressing('right')){ this.player.direction = -45 }
        if(kb.pressing('up') && kb.pressing('left')){ this.player.direction = -135 }
        if(kb.pressing('down') && kb.pressing('right')){ this.player.direction = 45 }
        if(kb.pressing('down') && kb.pressing('left')){ this.player.direction = 135 }
    }
    */

    // new movement system that use vel instead of speed and direction
    // this.speed determines the speed of the player
    // 0.8 is the slow down factor used when no key is pressed
    movement(){
        // drift / braking system to slow down
        if(this.player.y > 0 && this.player.y < height && this.player.x > 0 && this.player.x < width){
            this.player.vel.x *= 0.8;
            this.player.vel.y *= 0.8;
        }
        else{
            this.player.vel.x *= 0;
            this.player.vel.y *= 0;
        }
        if (kb.pressing('up') && this.player.y - this.speed >= 0) { this.player.vel.y = -this.speed; }
        if (kb.pressing('down')  && this.player.y + this.speed <= height) { this.player.vel.y = this.speed; }
        if (kb.pressing('left')  && this.player.x - this.speed >= 0) { this.player.vel.x = -this.speed; } 
        if (kb.pressing('right')&& this.player.x + this.speed <= width) { this.player.vel.x = this.speed; } 
        
    }
    // rotates the player towards the mouse
    aiming(){
        this.player.rotateTowards(mouse,1,0);
    }
    isDead(){
        return this.health.isDead()
    }
    drawHealth(){
        this.health.draw()
    }
    increaseHealth(num){
        this.health.increaseHealth(num)
    }
    // shoots bullets at the firerate 
    shoot(){
        if((kb.pressing(' ')) ||(mouseIsPressed === true)){
            // uses framecount because it is constant on system
            if(frameCount % this.fireRate == 0){
                let bullet = new Bullet(this.player.x, this.player.y,bullets);
                this.player.overlaps(bullet.getObject());
                bullet.movement(mouse);
            }
        }
    }
    // checks if the bullet hit an oject in the passed array
    // you can pass any array whiich contains sprite objects
    checkBulletHit(array, bullets, exp, score){
        array.forEach(object => {
            bullets.forEach(bullet => {
                if(bullet.removed == true){
                    removal(bullets, bullet)
                }
                if(bullet.collides(object)){ // hit
                    object.damage(this.damage,object.x, object.y)   
                    removal(bullets, bullet);
                    score.increaseScore(100);
                    asteroidHitSound.play();

                }
            });
        });
    }
    
    
    // checks if the ship has hit on object in the passed array
    // if so, colide with it and take damage
    checkShipHit(array) {
        array.forEach(object => {
                if(this.player.collides(object)){ // hit
                    if(this.player.ani.name == 'idle'){ // if not immune
                    this.collision(object);
                    this.health.healthDecrease();
                    }
                }
        });
    }

    collision(object){
        // changes the direction of the asteroid
        object.vel.x = -object.vel.x * 1.2;
        object.vel.y = -object.vel.y * 1.2;
        // plays animation
        this.player.changeAni(['hit','hit','hit','idle'])
    }
    
    trackerAttract(tracker){
        tracker.moveTo(this.player, tracker.trackerSpeed);
    }
    checkExpHit(){
        orbs.forEach(orb => {
            if(orb.overlaps(this.player)){
                removal(orbs,orb)
                exp.xpGain();
            }
        });
    }

    returnPlayerObject(){
        return this.player
    }
};

