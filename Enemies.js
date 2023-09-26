// file for the trackers class object
// constructor should create the sprite and store it in a private attribute
// methods will act on the sprite, such as spawning
class Tracker{
    constructor(){

       this.tracker = new colliding.Sprite(width/2,height/2, 50);
       //this.tracker.addAnimation('normal', 'assets/asteroid.png');
       this.trackerSpeed = 5;
       //this.tracker.attractTo(player,25);
       trackers.push(this.tracker);

    }
    movement(){
        let x = floor(random(4));
        // left side
        if(x == 0){
            this.tracker.x = floor(random(-20, 0));
            this.tracker.y = floor(random(0, height)); 
            this.tracker.vel.x = 3;
            this.tracker.vel.y = 3;  
        }
        // top
        else if(x ==1){
            this.tracker.x = floor(random(0, width));
            this.tracker.y = floor(random(-20, 0));
            this.tracker.vel.x = 3;
            this.tracker.vel.y = 3;  
        }
        // right
        else if(x ==2){
            this.tracker.x = floor(random(width, width+20));
            this.tracker.y = floor(random(0, height));
            this.tracker.vel.x = 3;
            this.tracker.vel.y = 3; 
        }
        // bottom
        else if(x ==3){
            this.tracker.x = floor(random(0,width));
            this.tracker.y = floor(random(height, height+20));
            this.tracker.vel.x = 3;
            this.tracker.vel.y = 3;  
        }
    }
};