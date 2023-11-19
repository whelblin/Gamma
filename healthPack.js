class HealthPack {
    /**
     * 
     * @param {Int16Array} x - the x cord for the pack
     * @param {Int16Array} y - the y cord for the pack
     */
    // Basically the orb constructor minus the unique exp value
    constructor(x,y){
        this.healthPack = new non_colliding.Sprite(x,y,20,);
        this.healthPack.addAnimation('small', 'assets/healthPack.png');
        this.healthPack.collides(player.returnPlayerObject())
        this.healthPack.overlaps(itmBoxes)
        this.healthPack.overlaps(non_colliding)
        packs.push(this.healthPack);
        this.healthPack.color = 'red';
       
    }

    static createHealth(x, y){
        // Spawns a pack with a base chance of 5%, but up to 5% more based on missing health for a total of 10
        // Drop likelyhood calc: 5 + (((H - MH)100)5)
        // Hard limit of two packs on screen at any given time.
        if(packs.length < 2){
            let chance = 5 + ((player.health.returnHealth() - player.health.returnMaxHealth())/500); // Drop likelyhood calc
            let threshold = random(1, 100); //Must be less than or equal to chance to spawn pack
            if(chance >= threshold){ 
                new HealthPack(x, y)
            }
        }
    }
};