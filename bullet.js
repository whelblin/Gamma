//bullet class
class Bullet{
    constructor(x,y, array){
        this.bullet = new bulletGroup.Sprite(x, y);
        this.bullet.changeAni('bulletAni');
        // this.bullet.addAnimation('normal', 'assets/spr_bullet_strip02.png');

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
class ShooterBullet{
    constructor(x,y, array){
        this.bullet = new bulletGroup.Sprite(x, y);
        this.bullet.diameter = 45;
        this.bullet.color = 'yellow';
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