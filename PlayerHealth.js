class PlayerHealth {
    constructor(){
        this.health = 100;
        this.maxHealth = this.health;
        this.dead = false;
        this.width = 200;
        this.maxWidth = this.width;
    }
    draw(){
       
        push()
        rectMode(CORNER)
        fill('rgb(173, 216, 230)');
        rect(0,25,this.maxWidth,10)
        pop()

        push()
        rectMode(CORNER)
        fill('rgb(255,0,0)');
        rect(0,25,this.width,10)
        pop()
    }
    #update(){
        let percentneeded = this.health/this.maxHealth;
        this.width = this.maxWidth * percentneeded;
    }
    healthDecrease(){
        this.health -= 20;
        this.#update()
        if(this.health <= 0){
            this.dead = true;
        }
    }
    increaseHealth(num){
        this.maxWidth +=num
        this.maxHealth +=num
        this.health +=num // keeps the same health
        this.#update()
    }
    isDead(){
        return this.dead;
    }
    returnHealth(){return this.health;}


};