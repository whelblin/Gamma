class Experience{
    constructor(){
        this.level = 1;
        this.maxLevel = 20;
        this.amount = 0;
        this.outerBar = new Sprite(0,7,width*2,10)
        this.outerBar.color = "lightblue";
        this.innerBar = new Sprite(0,7,1,10)
        this.innerBar.overlaps(this.outerBar)
        this.innerBar.color = 'lightgreen'
        this.pickUpAmount = 100;
        non_colliding.push(this.outerBar);
        non_colliding.push(this.innerBar)
    }

    increase(){
        if(this.level <this.maxLevel){
            this.innerBar.width += this.pickUpAmount/this.level;
            if(this.innerBar.width >= width*2){
                this.level++;
                this.innerBar.width = 1;
            }
        }
    }

    test_increase(){
        if(kb.presses(' ')){
            this.increase()
        }
    }
};