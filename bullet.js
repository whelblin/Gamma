class Bullet{
    constructor(x,y, array){
        this.bullet = new bulletGroup.Sprite(x, y);
        this.bullet.diameter = 45;
        this.bullet.color = 'white';
        this.bullet.stroke = 15;
        this.bullet.height = 60;
        this.bullet.width = 13;
        //this.bullet.life = 100;

        bulletSound.play();
        array.push(this.bullet);
        allBullets.push(this.bullet);
        
    }

    getObject(){return this.bullet;}
    movement(target, speed = 20){
        
        this.bullet.speed  = speed;
        this.bullet.direction = this.bullet.angleTo(target);
    
    }
    
    
}