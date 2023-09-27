class Bullet{
    constructor(x,y){
        this.bullet = new colliding.Sprite(x, y);
        this.bullet.diameter = 45;
        this.bullet.color = 'white';
        this.bullet.stroke = 15;
        this.bullet.height = 60;
        this.bullet.width = 13;
        this.bullet.life = 100;

        bulletSound.play();
        bullets.push(this.bullet);
        
    }

    getObject(){return this.bullet;}
    movement(){
        this.bullet.speed  = 20;
        this.bullet.direction = this.bullet.angleTo(mouse);
    }
    
    
}