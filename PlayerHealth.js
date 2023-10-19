class PlayerHealth {
    constructor(){
        this.health = 100;
        this.outerBar = new non_colliding.Sprite(width,20,width/2,10)
        this.outerBar.color = "lightblue";
        this.innerBar = new non_colliding.Sprite(width,20,width/2,10)
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

    isDead(){
        return this.dead;
    }


};