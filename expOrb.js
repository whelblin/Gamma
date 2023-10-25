class ExpOrb {
    constructor(x,y){
        this.expOrb = new non_colliding.Sprite(x,y,10, 'pentagon');
        this.expOrb.collides(player.returnPlayerObject())
        this.expOrb.overlaps(itmBoxes)
        orbs.push(this.expOrb);
        this.expOrb.color = 'lime';
    }

    
};

