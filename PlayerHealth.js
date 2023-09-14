class PlayerHealth {
    constructor(){
        this.health = 100;
        this.outerBar = new non_colliding.Sprite(0,20,width/2,10)
        this.outerBar.color = "lightblue";
        this.innerBar = new non_colliding.Sprite(0,20,width/2,10)
        this.innerBar.overlaps(this.outerBar)
        this.innerBar.color = 'red'
    }

    healthDecrease(){
        this.health -= 20;
        if(this.health >= 0){
            this.innerBar.width -= width/10;
        }
    }


};