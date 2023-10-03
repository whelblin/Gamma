class Food{

    constructor(x=0,y=0){
        this.food = new foodGroup.Sprite(x,y,30);
        this.food.addAnimation('normal', 'assets/ham.png');
        this.foodSpeed = 9;
    }

    movement(){

        let x = floor(random(4));
        // left side
        if(x == 0){
            this.food.x = floor(random(-20, 0));
            this.food.y = floor(random(0, height)); 
            this.food.vel.x = random(2,this.foodSpeed);
            this.food.vel.y = random(-this.foodSpeed/2,this.foodSpeed/2);  
        }
        // top
        else if(x ==1){
            this.food.x = floor(random(0, width));
            this.food.y = floor(random(-20, 0));
            this.food.vel.x = random(-this.foodSpeed/2,this.foodSpeed/2);
            this.food.vel.y = random(2,this.foodSpeed);
        }
        // right
        else if(x ==2){
            this.food.x = floor(random(width, width+20));
            this.food.y = floor(random(0, height));
            this.food.vel.x = random(-this.foodSpeed,2);
            this.food.vel.y = random(-this.foodSpeed/2,this.foodSpeed/2);
        }
        // bottom
        else if(x ==3){
            this.food.x = floor(random(0,width));
            this.food.y = floor(random(height, height+20));
            this.food.vel.x = random(-this.foodSpeed/2,this.foodSpeed/2);
            this.food.vel.y = random(-this.foodSpeed,2);
        }       

    }
    
};