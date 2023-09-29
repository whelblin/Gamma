class Chromedriver{
    constructor(screenchange = 0){
        // buttons go in there
        if(screenchange){
        resizeCanvas(windowWidth, windowHeight-100)

        this.deleteAsteroidButton = createButton("Delete asteroid")
        this.deleteAsteroidButton.position(25, windowHeight-30)
        this.deleteAsteroidButton.mousePressed(Chromedriver.DeleteAsteroid)

        this.hitShitWithAsteroidButton = createButton("Hit ship with asteroid")
        this.hitShitWithAsteroidButton.position(150, windowHeight-30)
        this.hitShitWithAsteroidButton.mousePressed(Chromedriver.HitByAsteroid)

        this.enterImmunityButton = createButton("Toggle immunity frames")
        this.enterImmunityButton.position(300, windowHeight-30)
        this.enterImmunityButton.mousePressed(Chromedriver.SetImmunity)

        this.gainExpButton = createButton("Give experience")
        this.gainExpButton.position(475, windowHeight-30)
        this.gainExpButton.mousePressed(Chromedriver.GiveExp)
        }

        // divs that can be displayed
        this.playerDiv = createDiv("empty");
        this.playerDiv.id("player_health");
        this.playerDiv.hide();

        this.expAmountDiv = createDiv("empty");
        this.expAmountDiv.id("player_exp");
        this.expAmountDiv.hide();

        this.levelDiv = createDiv("empty");
        this.levelDiv.id("player_level");
        this.levelDiv.hide();

        this.asteroidDiv = createDiv("empty");
        this.asteroidDiv.id("asteroid count");
        this.asteroidDiv.hide();

        this.bulletDiv = createDiv("empty");
        this.bulletDiv.id("bullet count");
        this.bulletDiv.hide();

        this.trackerDiv = createDiv("empty");
        this.trackerDiv.id("tracker count");
        this.trackerDiv.hide();

        this.expDiv = createDiv("empty");
        this.expDiv.id("experience count");
        this.expDiv.hide();

       
    }

    update(){
        this.playerDiv.html("Player Health: "+ Health.returnHealth())
        this.expAmountDiv.html("Player experience: "+ exp.amount)
        this.levelDiv.html("Player level: "+ exp.level)
        this.playerDiv.html("Player Health: "+ Health.returnHealth())
        this.asteroidDiv.html("Number of Asteroids: "+ asteroids.length)
        this.bulletDiv.html("Number of bullets: "+ bullets.length)
        this.trackerDiv.html("Number of trackers: "+ trackers.length)
        this.expDiv.html("Number of experience orbs: "+ orbs.length)
        
        }

    static DeleteAsteroid(){
        let temp = asteroids.length
        console.log("temp:",temp)
        if(temp > 0){
            let bullet = new Bullet(asteroids[0].x, asteroids[0].y)
            player.checkBulletHit(asteroids, bullets, exp, score);
            console.log("asteroid length:",asteroids.length)

            console.log("Checking delete Asteroid: ", asteroids.length == temp -1);
            
        }
    }
    static HitByAsteroid(){
        let temp = new Asteroid(player.returnPlayerObject().x,player.returnPlayerObject().y);
        player.checkShipHit(asteroids, Health);
        setTimeout(function(){ removal(asteroids, temp.asteroid)}, 100)
    }
    static SetImmunity(){
        if(player.player.animation.name == 'idle')
            player.player.changeAni("hit")
        else
        player.player.changeAni("idle")
    }
    
    static GiveExp(){
        new ExpOrb(player.returnPlayerObject().x,player.returnPlayerObject().y);
        player.checkExpHit()
    }
};