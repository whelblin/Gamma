class PlayerHealth {
    constructor(){
        this.health = 100;
        this.outerBar = new non_colliding.Sprite(0,30,width/2,10, 's')
        this.outerBar.color = "lightblue";
        this.innerBar = new non_colliding.Sprite(0,30,width/2,10, 's')
        this.innerBar.overlaps(this.outerBar)
        this.innerBar.color = 'red'
        this.dead = false;
    }

    healthDecrease(){
        this.health -= 20;
        if(this.health > 0){
            this.innerBar.width -= width/10;
        } else {
            this.dead = true;
        }
    }

    healthIncrease(){
        if(this.health == 100 ) return; 

        if(this.health  < 100){
            this.health += 20;
            this.innerBar.width += width/10;
        }
    }

    isDead(){
        return this.dead;
    }
    returnHealth(){return this.health;}


};