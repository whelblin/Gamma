class Bullet{
    constructor(x,y){
        this.bullet = new colliding.Sprite(x, y);
        this.bullet.diameter = 35;
        this.bullet.height = 50;
        this.bullet.width = 10;
        this.bullet.life = 200;
    }

    getObject(){return this.bullet;}
    movement(){
        this.bullet.speed  = 10;
        this.bullet.direction = this.bullet.angleTo(mouse);
    }

    
}