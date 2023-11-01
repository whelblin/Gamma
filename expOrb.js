class ExpOrb {
    /**
     * 
     * @param {Int16Array} x - the x cord for the orb
     * @param {Int16Array} y - the y cord for the orb
     * @param {Int16Array} [amount] - the amount of exerience the orb contains: default is 25 
     */
    constructor(x,y, amount = 25){
        this.expOrb = new non_colliding.Sprite(x,y,10, 'pentagon');
        this.expOrb.collides(player.returnPlayerObject())
        this.expOrb.overlaps(itmBoxes)
        this.expOrb.overlaps(non_colliding)
        orbs.push(this.expOrb);
        this.expOrb.color = 'lime';
        this.expOrb.amount = amount;
       
    }
    /**
     * 
     * @returns the amount of experience the orb contains
     */
    getExp(){return this.amount;}

    
    
    static createExp(x,y,amount = 25){
    
        if(orbs.length < 10){
            new ExpOrb(x,y,amount);
        }
        else{
            orbs[orbs.length-1].amount +=amount;
            orbs[orbs.length-1].color = 'red'
        }
    }
};
