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
        this.fireRate = 15;
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

    movement(){
        this.player.speed = 12;
        if (kb.pressing('up')) { this.player.direction = -90; }
        else if (kb.pressing('down')) { this.player.direction = 90; }
        else if (kb.pressing('left')) { this.player.direction = 180; } 
        else if (kb.pressing('right')) { this.player.direction = 0; } 
        else { this.player.speed = 0.5; }
        if(kb.pressing('up') && kb.pressing('right')){ this.player.direction = -45 }
        if(kb.pressing('up') && kb.pressing('left')){ this.player.direction = -135 }
        if(kb.pressing('down') && kb.pressing('right')){ this.player.direction = 45 }
        if(kb.pressing('down') && kb.pressing('left')){ this.player.direction = 135 }
    }
    // rotates the player towards the mouse
    aiming(){
        this.player.rotateTowards(mouse,1,0);
    }
    // shoots bullets at the firerate 
    shoot(){
        if(kb.pressing(' ')){
            // uses framecount because it is constant on system
            if(frameCount % this.fireRate == 0){
                let bullet = new Bullet(this.player.x, this.player.y,bullets);
                this.player.overlaps(bullet.getObject());
                bullet.movement();
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
                    new ExpOrb(object.x, object.y)
                    removal(array,object)
                    removal(bullets, bullet);
                    score.increaseScore(100);
                    asteroidHitSound.play();

                }
            });
        });
    }
    
    
    // checks if the ship has hit on object in the passed array
    // if so, colide with it and take damage
    checkShipHit(array, Health) {
        array.forEach(object => {
                if(this.player.collides(object)){ // hit
                    if(this.player.ani.name == 'idle'){ // if not immune
                    this.collision(object);
                    Health.healthDecrease();
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

