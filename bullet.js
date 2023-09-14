class Bullet{
    constructor(x,y){
        this.bullet = new colliding.Sprite(x, y);
        this.bullet.diameter = 35;
        this.bullet.height = 50;
        this.bullet.width = 10;
        this.bullet.life = 100;

        bullets.push(this.bullet);
    }

    getObject(){return this.bullet;}
    movement(){
        this.bullet.speed  = 20;
        this.bullet.direction = this.bullet.angleTo(mouse);
    }
    
    
}