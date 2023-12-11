
/*
removes the asteroid from the array and the sprite from the screen
must do both to avoid memory leak
*/

function removal(array,object){
    let index = array.indexOf(object);
    object.remove();
    array.splice(index,1); 
}

function cullObjects(){
    asteroidGroup.cull(50, (object) => {
        let index = asteroids.indexOf(object);
        object.remove();
        asteroids.splice(index,1);
      });
    trackerGroup.cull(50, (object) => {
        console.log(object)
        let index = trackers.indexOf(object);
        object.remove();
        trackers.splice(index,1);
      });
      bulletGroup.cull(10, (object) => {
        console.log(object)
        let index = allBullets.indexOf(object);
        object.remove();
        allBullets.splice(index,1);
      });
}
class Animation{
static preload(){
        this.frameDelay = 1;
        this.idleAni = loadAni("idle",'assets/hitpurple1.png',{
            frameSize: [90,90],frames: 1
        })
        this.hitAni = loadAni("hit",'assets/hitpurple1.png',{
          frameSize:[90,90], frames: 4

        })
         this.shieldedAnim = loadAni("shield",'assets/purpleshield.png',{
          frames: 1
         })
        this.bulletAni = loadAni("bulletAni","assets/spr_bullet_strip.png",{
           frames: 3
        })
        this.cannonAni = loadAni("cannonAni","assets/spr_bullet_strip02.png",{
          frames: 3
       })
        //this.expAni = loadImage("assets/Exp1.png")
        //this.healthAni= loadImage("assets/health_potion.png")
        //this.asteroidAni = loadImage("assets/asteroid.png")
        //this.trackerAni = loadImage("assets/bugb.png")
        //this.shooterAni = loadAni("assets/bird.png")


    
    }
}
