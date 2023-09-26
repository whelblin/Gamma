// file for the player class object
// constructor should create the sprite and store it in a private attribute
// methods will act on the sprite, such as movement

class Player{
    constructor(){
        //console.log(colliding);
        this.player = new colliding.Sprite(width/2,height/2,80)
        this.player.spriteSheet = 'assets/sheet.png';
        this.player.anis.frameDelay = 4;
        this.player.addAnis(this.idleAni);
        this.player.addAnis(this.hitAni);
        this.player.changeAni('idle');
        //this.player.diameter = 50; 
        //this.player.img = 'assets/playerSprite.png';
        this.immune = false;
        this.fireRate = 10;
       
        
        //this.shot = new Sprite();

    }
    static preload(){
        this.spriteSheet = 'assets/sheet.png';
        this.frameDelay = 4;
        this.idleAni = loadAni("idle",this.spriteSheet,{
            frameSize: [80,80], frames: 1
        })
        this.hitAni = loadAni("hit",this.spriteSheet,{
            frameSize: [80,80], frames: 4
        })
        console.log(this.idleAni);
        console.log(this.hitAni)

    }
    movement(){
        this.player.speed = 8;
        if (kb.pressing('up')) { this.player.direction = -90; }
        else if (kb.pressing('down')) { this.player.direction = 90; }
        else if (kb.pressing('left')) { this.player.direction = 180; } 
        else if (kb.pressing('right')) { this.player.direction = 0; } 
        else { this.player.speed = 0; }
        if(kb.pressing('up') && kb.pressing('right')){ this.player.direction = -45 }
        if(kb.pressing('up') && kb.pressing('left')){ this.player.direction = -135 }
        if(kb.pressing('down') && kb.pressing('right')){ this.player.direction = 45 }
        if(kb.pressing('down') && kb.pressing('left')){ this.player.direction = 135 }
    }
    aiming(){
        this.player.rotateTowards(mouse,1,0);
    }
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
    checkBulletHit(asteroids, bullets, exp, score){
        asteroids.forEach(asteroid => {
            bullets.forEach(bullet => {
                if(bullet.collides(asteroid)){ // hit
                    console.log(new ExpOrb(asteroid.x, asteroid.y))
                    asteroid.remove();// removes the asteroid
                    bullet.remove();
                    //exp.xpGain();
                    score.increaseScore(100);
                }
            });
        });
    }
    trackerBulletHit(trackers, bullets, exp, score){
        trackers.forEach(tracker => {
            bullets.forEach(bullet => {
                if(bullet.collides(tracker)){ // hit
                    console.log(new ExpOrb(tracker.x, tracker.y))
                    tracker.remove();// removes the tracker
                    bullet.remove();
                    //exp.xpGain();
                    score.increaseScore(200);
                }
            });
        });
    }

    checkShipHit(asteroids, Health, trackers) {
        asteroids.forEach(asteroid => {
                if(this.player.collides(asteroid)){ // hit
                    if(this.player.ani.name == 'idle'){ // if not immune
                    this.collision(asteroid);// removes the asteroid
                    Health.healthDecrease();
                    }
                }
        });
        trackers.forEach(tracker => {
            if(this.player.collides(tracker)){ // hit
                if(this.player.ani.name == 'idle'){ // if not immune
                this.collision(tracker);// removes the tracker
                Health.healthDecrease();
                }
            }
        });
    }

    collision(asteroid){
        // changes the direction of the asteroid
        asteroid.vel.x = -asteroid.vel.x * 1.2;
        asteroid.vel.y = -asteroid.vel.y * 1.2;
        // plays animation
        this.player.changeAni(['hit','hit','hit','idle'])
    }
    collision(tracker){
        // changes the direction of the tracker
        tracker.vel.x = -tracker.vel.x * 1.2;
        tracker.vel.y = -tracker.vel.y * 1.2;
        // plays animation
        this.player.changeAni(['hit','hit','hit','idle'])
    }
    trackerAttract(tracker){
        tracker.attractTo(this.player, 100);
    }
    checkExpHit(){
        orbs.forEach(orb => {
            if(orb.overlaps(this.player)){
                console.log("hit")
                orb.remove();
                exp.xpGain();
            }
        });
    }
    removePlayer(){
        this.player.remove();
    }
    returnPlayerObject(){
        return this.player
    }
};

