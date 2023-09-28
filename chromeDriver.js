class Chromedriver{
    constructor(){
        resizeCanvas(windowWidth, windowHeight-100)
        this.playerDiv = createDiv("empty");
        this.playerDiv.style('font-size', '16px');
        this.playerDiv.style('text-color','white');
        this.playerDiv.class("player_health");
        this.playerDiv.position(width-50, 100);
        this.playerDiv.hide();

        this.asteroidDiv = createDiv("empty");
        this.asteroidDiv.style('font-size', '16px');
        this.asteroidDiv.style('text-color','white');
        this.asteroidDiv.class("asteroid count");
        this.asteroidDiv.position(width-50, 100);
        this.asteroidDiv.hide();

        this.deleteAsteroidButton = createButton("Delete asteroid")
        this.deleteAsteroidButton.position(50, windowHeight-30)
        this.deleteAsteroidButton.mousePressed(Chromedriver.deleteAsteroid)
    }

    update(){
        this.playerDiv.html("Player Health: "+ Health.returnHealth())
        this.asteroidDiv.html("Number of Asteroids: "+ asteroids.length)
        
        }

    static deleteAsteroid(){
        let temp = asteroids.length
        console.log("temp:",temp)
        if(temp > 0){
            let bullet = new Bullet(asteroids[0].x, asteroids[0].y)
            player.checkBulletHit(asteroids, bullets, exp, score);
            console.log("asteroid length:",asteroids.length)

            console.log("Checking delete Asteroid: ", asteroids.length == temp -1);
            
        }
    }
    static HitAsteroid(){
        let temp = asteroids.length
        if(temp > 0){
            asteroids[0].x = player.returnPlayerObject().x;
            asteroids[0].y = player.returnPlayerObject().y;
        }
    }
};