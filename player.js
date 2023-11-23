// file for the player class object
// constructor should create the sprite and store it in a private attribute
// methods will act on the sprite, such as movement

class Player{
    constructor(){
        this.player = new colliding.Sprite(width/2,height/2,80)
        this.player.addAnis(this.idleAni);
        this.player.addAnis(this.hitAni);
        this.player.addAnis(this.shieldedAnim);
        this.player.changeAni('idle');
        this.immune = false;
        this.fireRate = 30;
        this.speed = 5;
        this.health = new PlayerHealth()
        this.exp = new Experience()
        this.damage = 10;
        this.canFire = -1
        this.spam = 300;
        
    }
     // loads the animation during the reload function
    static preload(){
        
        this.spriteSheet = 'assets/sheet.png';
        this.frameDelay = 4;
        this.idleAni = loadAni("idle",this.spriteSheet,{
            frameSize: [80,80], frames: 1
        })
        this.hitAni = loadAni("hit",this.spriteSheet,{
            frameSize: [80,80], frames: 4
        })
        this.shieldSprite = 'assets/shieldSprite.png';
        this.shieldedAnim = loadAni("shield",this.shieldSprite,{
            frameSize: [100,100], frames: 1
        })
    }
    increaseFireRate(num){(this.fireRate - num > 0) ? this.fireRate -= num : this.fireRate = 1;}
    increaseMovementSpeed(num){this.speed += num;}
    increaseDamage(num){this.damage +=num;}
    setImmune(val)
    {
        print("immuned set to" +val);
        this.immune = val;
    }
    getImmune()
    {
        return this.immune;
    }
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
    getLevel(){
        return this.exp.getLevel()
    }
    getLevelUps(){return this.exp.getLevelUps()}
    setLevelUps(num){this.exp.setLevelUps(num)}
    drawHealth(){
        this.health.draw()
    }
    drawExp(){
        this.exp.draw()
    }

    increaseHealth(num){
        this.health.increaseHealth(num)
    }

    healHealth(num){
        this.health.healHealth(num)
    }
    // shoots bullets at the firerate 
    shoot(){
        if(millis() > this.canFire &&( kb.presses(' ') ||(mouse.presses() === true))){
            this.canFire = millis() + this.spam
            let bullet = new Bullet(this.player.x, this.player.y,bullets);
            this.player.overlaps(bullet.getObject());
            bullet.movement(mouse); 
        }
        else if((kb.pressing(' ')) ||(mouseIsPressed === true)){
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
    checkBulletHit(array, bullets, score){
        array.forEach(object => {
            bullets.forEach(bullet => {
                if(bullet.removed == true){
                    removal(bullets, bullet)
                    removal(allBullets, bullet)
                }
                if(bullet.collides(object)){ // hit
                    object.damage(this.damage,object.x, object.y)   
                    removal(bullets, bullet);
                    removal(allBullets, bullet)
                    score.increaseScore(100);
                    asteroidHitSound.play();

                }
            });
        });
    }
    
    
    // checks if the ship has hit on object in the passed array
    // if so, colide with it and take damage
    checkShipHit(array, bullet = false) {
        array.forEach(object => {
                if(this.player.collides(object)){ // hit
                    if(this.player.ani.name == 'idle' && !this.immune){ // if not immune
                    this.collision(object);
                    if(bullet){
                        removal(array, object)
                        removal(allBullets, object)
                    }
                    this.health.healthDecrease();
                    }
                    else if(this.immune)
                        print("was immune")
                }
        });
    }

    collision(object){
        // changes the direction of the asteroid
        object.vel.x = -object.vel.x * 1.2;
        object.vel.y = -object.vel.y * 1.2;
        // plays animation
        this.player.changeAni(['hit','hit','hit','idle'])
        this.handleAnimation()
    }

    handleAnimation()
    {
        if(!this.immune)
            this.player.changeAni('idle')
        else
            this.player.changeAni('shield')
    }
    
    attract(enemy){
        enemy .moveTo(this.player, enemy.Trackingspeed);
    }
    checkExpHit(){
        orbs.forEach(orb => {
            if(orb.overlaps(this.player)){
                removal(orbs,orb)
                this.exp.increase(orb.amount);
            }
        });
    }

    //Scans every pack, and calculates heal when picked up
    //Note: heal amount calculation is performed here rather than in the healthpack class
    //Itself to ensure that the healthpack will always heal 20% in the event the player picks up max health powerup
    checkHealthHit(){
        packs.forEach(pack => {
            if(pack.overlaps(this.player)){
                removal(packs, pack)
                let heal = this.health.returnMaxHealth()/5 // Determines heal amount from max health
                if((heal + this.health.returnHealth()) > this.health.returnMaxHealth()){ // Prevents overheal by setting heal
                    heal = this.health.returnMaxHealth() - this.health.returnHealth(); // to not exceed maxHealth
                }
                this.healHealth(heal);
            }
        });

    }

    returnPlayerObject(){
        return this.player
    }
};

