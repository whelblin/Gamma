// file for the trackers class object
// constructor should create the sprite and store it in a private attribute
// methods will act on the sprite, such as spawning
class Tracker{
    constructor(){

       this.tracker = new trackerGroup.Sprite(width/2,height/2, 50);
       this.tracker.addAnimation('small','assets/oneeye.png');
       this.tracker.trackerSpeed = 2;
       //this.tracker.attractTo(player,25);
        this.health = 20
       this.tracker.damage = (num,x,y)=>{
        this.health -=num;
        if(this.health <= 0){
            removal(trackers,this.tracker)
            new ExpOrb(x, y, 50)
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