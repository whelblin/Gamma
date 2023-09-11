// file for the player class object
// constructor should create the sprite and store it in a private attribute
// methods will act on the sprite, such as movement
class Player{
    constructor(){
        this.player = new Sprite();
        
    }


    movement(){ //Not working
        this.player.speed = 3;

        if (kb.pressing('up')) {
            player.direction = -90;
        } else if (kb.pressing('down')) {
            player.direction = 90;
        } else if (kb.pressing('left')) {
            player.direction = 180;
        } else if (kb.pressing('right')) {
            player.direction = 0;
        } else {
          player.speed = 0;
        }
    }
};