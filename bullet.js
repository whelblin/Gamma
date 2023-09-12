class Bullet{
    constructor(x,y){
        this.bullet = new Sprite(x, y);
        this.bullet.diameter = 30;
        this.bullet.height = 30;
        this.bullet.life = 200;
    }

    getObject(){return this.bullet;}
    movement(){
        this.bullet.speed  = 10;
        this.bullet.direction = this.bullet.angleTo(mouse);
    }

    
}