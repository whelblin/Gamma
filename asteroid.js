// file for the asteroids class object
// constructor should create the sprite and store it in a private attribute
// methods will act on the sprite, such as spawning
class Asteroid{
    constructor(){
        console.log(colliding);
        this.asteroid = new colliding.Sprite();
        this.asteroid.diameter = 50;
        this.asteroid.color = 'red';
        this.asteroid.stroke = 'black';
    }
    movement(){
        this.asteroid.speed = 3;
        this.asteroid.attractTo(player,3);
    }
};