// file for the player class object
// constructor should create the sprite and store it in a private attribute
// methods will act on the sprite, such as movement

class Player{
    constructor(){
        console.log(colliding);
        this.player = new colliding.Sprite();
        this.player.diameter = 50;
        //this.shot = new Sprite();

    }
    movement(){
        this.player.speed = 3;
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
        if( kb.presses(' ')){
            let bullet = new Bullet(this.player.x, this.player.y);
            this.player.overlaps(bullet.getObject());
            bullet.movement();
            
        }
    }
    checkCollision(asteroids){
        asteroids.forEach(asteroid => {
            if(this.player.collides(asteroid)){ // hit
                console.log("hit");
                asteroid.remove();// removes the asteroid
            }
        });
        
    }

};

