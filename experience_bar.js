class Experience{
    constructor(){
        this.level = 1;
        this.maxLevel = 20;
        this.amount = 0;
        this.needed = 100;
        this.pickUpAmount = 25;
        this.width = 0;

        
       
    }
    /**
     * @returns the current level
     */
    getLevel(){return this.level;}

    /**
     * Increases the experience bar by the given amount
     * @param {Int16Array} amount - the amount of experience gained  
     */
    increase(amount){
        if(this.level <this.maxLevel){
            this.amount += amount;
            let percentneeded = this.amount/this.needed; 
            this.width =  width * percentneeded;
             if(this.amount >= this.needed){
                this.level++;
                this.width = 0;
                this.needed *= 1.50;
                this.amount = 0;
            }
        }
    }
    /**
     * draws the experience bar to the screen
     */
    draw(){
        push()
        rectMode(CORNER)
        fill('rgb(173, 216, 230)');
        rect(0,10,width,10)
        pop()

        push()
        rectMode(CORNER)
        fill('rgb(0,255,0)');
        rect(0,10,this.width,10)
        pop()
    }

    test_increase(){
        if(kb.presses(' ')){
            this.increase()
        }
    }


    reset(){
        this.level = 1;
        this.maxLevel = 20;
        this.amount = 0;
        this.needed = 100;
        this.pickUpAmount = 25;
        this.width = 0;
    }

};