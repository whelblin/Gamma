// file for the asteroids class object
// constructor should create the sprite and store it in a private attribute
// methods will act on the sprite, such as spawning
class Asteroid{
    static listOfAsteroids = [];
    constructor(){
        console.log(colliding);
        this.asteroid = new colliding.Sprite(0,0,10,'dodecagon');
        //this.asteroid.diameter = 50;
        this.asteroid.color = 'darkgray';
        this.asteroid.stroke = 'black';
        this.asteroid.life = 10;
        this.asteroidSpeed = 7;
        
        //listOfAsteroids.push(this.asteroid);
    }


    movement(){
        let x = floor(random(4));
        // left side
        if(x == 0){
            this.asteroid.x = floor(random(-20, 0));
            this.asteroid.y = floor(random(0, height)); 
            this.asteroid.vel.x = random(2,this.asteroidSpeed);
            this.asteroid.vel.y = random(-this.asteroidSpeed/2,this.asteroidSpeed/2);  
        }
        // top
        else if(x ==1){
            this.asteroid.x = floor(random(0, width));
            this.asteroid.y = floor(random(-20, 0));
            this.asteroid.vel.x = random(-this.asteroidSpeed/2,this.asteroidSpeed/2);
            this.asteroid.vel.y = random(2,this.asteroidSpeed);
        }
        // right
        else if(x ==2){
            this.asteroid.x = floor(random(width, width+20));
            this.asteroid.y = floor(random(0, height));
            this.asteroid.vel.x = random(-this.asteroidSpeed,2);
            this.asteroid.vel.y = random(-this.asteroidSpeed/2,this.asteroidSpeed/2);
        }
        // bottom
        else if(x ==3){
            this.asteroid.x = floor(random(0,width));
            this.asteroid.y = floor(random(height, height+20));
            this.asteroid.vel.x = random(-this.asteroidSpeed/2,this.asteroidSpeed/2);
            this.asteroid.vel.y = random(-this.asteroidSpeed,2);
        }
    }
    
};