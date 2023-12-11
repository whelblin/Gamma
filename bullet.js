e//bullet class
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
        this.bullet.changeAni('enemyBulletAni');
        this.bullet.direction = this.bullet.angleTo(target);
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
