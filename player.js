// file for the player class object
// constructor should create the sprite and store it in a private attribute
// methods will act on the sprite, such as movement

class Player{
    constructor(){
        this.player = new Sprite();
        //this.player.diameter = 50;
        this.shot = new Sprite();
    }
    movement(){
        this.player.speed = 3;

        if (kb.pressing('up')) {
            this.player.direction = -90;
        } else if (kb.pressing('down')) {
            this.player.direction = 90;
        } else if (kb.pressing('left')) {
            this.player.direction = 180;
        } else if (kb.pressing('right')) {
            this.player.direction = 0;
        } else {
            this.player.speed = 0;
        }
    }
    aiming(){
        this.player.rotateTowards(mouse,1,0);
    }
    shoot(){
        //https://p5play.org/learn/sprite.html?page=2 moveTo:impulse
        if( kb.pressing('space')){
            bullet = new Shot();
            bullet.moveTo(mouse,8);
        }
    }
};
class Shot{
    constructor(){
        shot = new Sprite();
    }
}
