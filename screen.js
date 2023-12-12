
/*
The game State class is what we have access to in sketch
you call the transitions and it will change the state of the game by swtiching its state varaible
the run method is used to activate whatever state it is in

There is no longer a need for a inmenu, paused, or leveling up variable. The states take care of everything
*/
var pausedTimer;
class gameState{

    // sets the stat of the game
    // should be startscreen to start the game
    constructor(){
        
    }
    init(){
        this.changeState(StartScreen.instance())
    }
    // transition from startScreen to GameScreen
    // create the objects and switch states
    
    startGame(){
        player= new Player(false);
        timer = new Timer();
        lvlBox = new LevelBox();
        currentStage = new StageHandler();
        nextLevel = 2;
        score = new ScoreCounter();
     //   bestScore = new ScoreCounter();

        this.changeState(GameScreen.instance())
    }
    GDLMode(){
        player= new Player(true);
        timer = new Timer();
        lvlBox = new LevelBox();
        currentStage = new StageHandler();
        nextLevel = 2;
        score = new ScoreCounter();
     //   bestScore = new ScoreCounter();

        this.changeState(GameScreen.instance())
    }

    // transition from GameScreen to LevelScreen
    // turns the box to visible and increasing the nextlevel required
    // changes the state to the levelScreen
    levelingup(){
         if(powerups.length > 0){
        lvlBox.boxVis();
         orbs.forEach(orb=> {
          orb.visible = false
        })
         packs.forEach(healthPack=> {
          healthPack.visible = false
        })
        nextLevel += 1;
        timer.startPause()
        this.changeState(LevelScreen.instance())
        }
        else{
            this.changeState(GameScreen.instance())
        }

    }

    // transition from LevelScreen to GameScreen
    // turns off the box and make everything visible again
    // changes the state back to GameScreen
    leveledUp(){
        print(player.getLevelUps())
        lvlBox.boxInvis();
        orbs.forEach(orb=> {
          orb.visible = true
        })
          packs.forEach(healthPack=> {
          healthPack.visible = true
        })
        colliding.visible = true;
        timer.endPause()
        player.setLevelUps(player.getLevelUps()- 1);
        if(player.getLevelUps() == 0)
            this.changeState(GameScreen.instance())
        else{
            this.levelingup();
        }
    }

    // transition from GameScreen to DeadScreen
    // happens when the player dies
    died(){
        this.changeState(DeadScreen.instance())
    }

    // transition from DeadScreen to StartScreen
    // restarts the game data (same as restart function)
    // changes the state to startScreen
    restart(){
        player.player.remove();
       
        for(let i = 0; i < asteroids.length; i++){
            removal(asteroids, asteroids[i])
        }
        activePowers = []
        asteroids = []
        for(let i = 0; i < bullets.length; i++){
            removal(bullets, bullets[i])
        }
        bullets = [];
        for(let i = 0; i < trackers.length; i++){
            removal(trackers, trackers[i])
        }
        trackers = []
        for(let i = 0; i < orbs.length; i++){
            removal(orbs, orbs[i])
        }
        for(let i = 0; i < shooters.length; i++){
            removal(shooters, shooters[i])
        }
        shooters = []
        orbs = []
        allSprites.remove()
        StageHandler.restart()

        powerups = [
            ["Fire Rate", new FireRate()],
            ['Shields', new ShieldPowerup()],
            ['Magnet', new MagnetPowerUp()],
            ['Movement Speed', new MovementSpeed()],
            ['Health', new HealthIncrease()],
            ['Damage', new DamageIncrease()],
            ['Sentry Cannon', new turretPowerUp()]
          ]
        activePowers = []
        print(asteroids.length, trackers.legnth)
        timer.endTimer()
      //  print(asteroids.length, trackers.legnth)
        this.changeState(DeadScreen.instance())
    }

    win(){
        player.player.remove();
       
        for(let i = 0; i < asteroids.length; i++){
            removal(asteroids, asteroids[i])
        }
        activePowers = []
        asteroids = []
        for(let i = 0; i < bullets.length; i++){
            removal(bullets, bullets[i])
        }
        bullets = [];
        for(let i = 0; i < trackers.length; i++){
            removal(trackers, trackers[i])
        }
        trackers = []
        for(let i = 0; i < orbs.length; i++){
            removal(orbs, orbs[i])
        }
        for(let i = 0; i < shooters.length; i++){
            removal(shooters, shooters[i])
        }
        shooters = []
        orbs = []
        allSprites.remove()
        StageHandler.restart()

        powerups = [
            ["Fire Rate", new FireRate()],
            ['Shields', new ShieldPowerup()],
            ['Magnet', new MagnetPowerUp()],
            ['Movement Speed', new MovementSpeed()],
            ['Health', new HealthIncrease()],
            ['Damage', new DamageIncrease()],
            ['Sentry Cannon', new turretPowerUp()]
          ]
          activePowers = []

        print(asteroids.length, trackers.legnth)
        timer.endTimer()
      //  print(asteroids.length, trackers.legnth)
        this.changeState(WinScreen.instance())
    }

    // transition from GameScreen to PauseScreen
    pause(){
        this.changeState(PauseScreen.instance())
    }
    // transition from PauseScreen to GameScreen
    resumeGame(){
        timer.endPause()
        this.changeState(GameScreen.instance())
    }
    tutorial(){
        this.changeState(TutorialScreen.instance())
    }
    // runs the current state's action
    run(){
        this.#state_.active()
    }
    // changes the state
    changeState(state){
        this.#state_ = state;
    }
    getCurrentState(){return this.#state_;}
    #state_; // private varaibleto hold the state
};

// abstract class a screen
// not really being used at the moment
// but here if we need it
class Screen{
    // image is just a filler item to show that all screens
    // get a image varaible with the value empty
    constructor(){
        this.image = "empty";
    }
    // the child class must impliment the active function
    // or it gives an error
    active(){throw "need to impliment the active function"}
}

class StartScreen extends Screen {
    // static object so there is only one start screen
    static startscreen = new StartScreen()
    // static method that can be called without creating an object of the class
    // it returns the static object to use as the state
    static instance(){
        return StartScreen.startscreen;
    }
    // does the start screen stuff
    active(){
        print("active: StartScreen")
        //if(chromedriver != -1) chromedriver.update()
        image(bgimage1, 0, 0, width, height);
        fill(215,175, 55, opacity);
        stroke(0);
        strokeWeight(5);
        rectMode(CENTER);
        rect(width/2, height/2+200, 600, 150, 30);
        push()
        textSize(20);
        fill(215,175, 55);
        rect(width-100, 75, 100, 100, 30);
        textStyle(NORMAL)
        textFont(mainFont);
        textAlign(CENTER);
        fill(255,255,255);
        text("Press t\n for\n tutorial",width - 100, 55);
        pop()
        textSize(100);
        textFont(mainFont);
        textAlign(CENTER);
        fill(0,0,0);
        text("Press Enter",width/2, height/2+230);
        if(opacity < 212 && opacShouldIncrease)
        {
        opacity+=10;
        }
        else
        {
        opacShouldIncrease = false;
        opacity-= 10;
        if(opacity < 0)
        {
            opacShouldIncrease = true;
        }
        }
        
        //button.mousePressed(changeBG);
        
        drawScore();
        // switches the state to gameScreen when the mouseIsPressed or space is pressed
       
        if ((kb.presses('enter'))){
            state.startGame()
        } 
        if (((kb.pressing('g') && kb.pressing('d')) && kb.pressing('l'))){
            state.GDLMode()
        }
        if(kb.presses('t')){
            state.tutorial()
        }
    }
}

class GameScreen extends Screen {
     // static object so there is only one game screen
    static gamescreen = new GameScreen()
     // static method that can be called without creating an object of the class
    // it returns the static object to use as the state
    static instance(){
        return GameScreen.gamescreen;
    }

    active(){
        print("active: GameScreen")
        if(chromedriver != -1) chromedriver.update()
        image(bgimage2, 0, 0, width, height);
        colliding.overlaps(non_colliding);
        itmBoxes.overlaps(non_colliding);
        itmBoxes.overlaps(colliding);
        timer.printTimer(width/2, 80);
        //timer.activatePowers()
        
        score.printScore(width - 100, 80);
        player.movement();
        player.aiming();
        player.shoot();
        //timer.enemySpawn(asteroids,trackers);
        cullObjects()
        for(let t = 0; t < trackers.length; t++){
          player.attract(trackers[t]);
        }
        for(let t = 0; t < shooters.length; t++){
            player.attract(shooters[t]);
            shooters[t].shoot()
            shooters[t].checkBulletHit(player)
            shooters[t].checkBulletHit(asteroids)
            shooters[t].checkBulletHit(trackers)
            //shooters[t].checkBulletHit(shooters)
          }
        // checks if a bullet hits an asteroid
        player.checkBulletHit(asteroids, bullets, score);
        player.checkBulletHit(trackers, bullets, score);
        player.checkBulletHit(shooters, bullets, score);
        player.checkShipHitRock(asteroids);
        player.checkShipHitTrack(trackers);
        player.checkShipHitShooter(shooters);
        player.checkExpHit()
        player.checkHealthHit();
        player.drawExp();
        player.drawHealth()
        drawScore()
        runActivePowerups()
        StageHandler.checkStage()
        //tests();
        // level up screens
        /*
        if(player.getLevel() == nextLevel){
          state.levelingup()
        }
        */
        if(kb.pressed('escape')){
            timer.startPause()
          state.pause()
        }
        if(player.isDead()){
          state.restart()
        }

    }
}


class LevelScreen extends Screen {
     // static object so there is only one level screen
    static levelscreen = new LevelScreen()
     // static method that can be called without creating an object of the class
    // it returns the static object to use as the state
    static instance(){
        return LevelScreen.levelscreen;
    }

    active(){
        print("active: LevelScreen")
        image(bgimage2, 0, 0, width, height);
        world.step(0.0000001/240);
        colliding.visible = false;
        lvlBox.checkClick();
        timer.pausedTime();
        if(kb.pressed('escape')){
           state.leveledUp()
        }
    }
}

class DeadScreen extends Screen {
     // static object so there is only one dead screen
    static deadscreen = new DeadScreen()
     // static method that can be called without creating an object of the class
    // it returns the static object to use as the state
    static instance(){
        return DeadScreen.deadscreen;
    }

    active(){
        // needs to be implimented
        player.player.visible = false;
        image(bgimage3, 0, 0, width, height);
        fill(111,168,220);
        score.printBestScore(width/2,height/2);
        timer.printFinalTimer(width/2, height/2 + 100)
        fill(215,175, 55, opacity);
        stroke(0);
        strokeWeight(5);
        rectMode(CENTER);
        rect(width/2, height/2+200, 600, 140, 20);

        textSize(100);
        textFont(mainFont);
        fill(0,0,0);
        textAlign(CENTER);
        text("Press Enter",width/2, height/2+230);
        if(opacity < 212 && opacShouldIncrease){
            opacity+=10;
        }else{
        opacShouldIncrease = false;
        opacity-=10;
        if(opacity < 0){
            opacShouldIncrease = true;
      }
    }   


        
        if ((kb.presses('enter')))
        {
            state.startGame()
        } 
    }
}

class PauseScreen extends Screen {
     // static object so there is only one pause screen
    static pausescreen = new PauseScreen()
     // static method that can be called without creating an object of the class
    // it returns the static object to use as the state
    static instance(){
        return PauseScreen.pausescreen;
    }

    active(){
        // we add add functionalilty if needed
        image(bgimage2, 0, 0, width, height);
        timer.pausedTime()
        score.printScore(width - 100, 80);
        player.drawExp();
        world.step(0.0000001/240);
        if(kb.pressed('escape')){
            state.resumeGame()
        }
    }
}

class WinScreen extends Screen {
    // static object so there is only one dead screen
   static winScreen = new WinScreen()
    // static method that can be called without creating an object of the class
   // it returns the static object to use as the state
   static instance(){
       return WinScreen.winScreen;
   }

   active(){
       // needs to be implimented
       player.player.visible = false;
       image(bgimage2, 0, 0, width, height);
       fill(111,168,220);
       textSize(80);
       textStyle(BOLD);
       textAlign(CENTER);
       text("You Won",width/2, height/2-208);
       score.printBestScore(width/2,height/2);
       timer.printFinalTimer(width/2, height/2 + 100)
       fill(215,175, 55, opacity);
       stroke(0);
       strokeWeight(5);
       rectMode(CENTER);
       rect(width/2, height/2+192, 650, 100, 20);

       textSize(55);
       textFont(mainFont);
       fill(0,0,0);
       textAlign(CENTER);
       textStyle(NORMAL);

       text("Press Enter To Play Again",width/2, height/2+208);
       if(opacity < 212 && opacShouldIncrease){
           opacity+=10;
       }else{
       opacShouldIncrease = false;
       opacity-=10;
       if(opacity < 0){
           opacShouldIncrease = true;
     }
   }   


       
       if ((kb.presses('enter')))
       {
           state.startGame()
       } 
   }
}


class TutorialScreen extends Screen {
    // static object so there is only one dead screen
   static tutorialScreen = new TutorialScreen()
    // static method that can be called without creating an object of the class
   // it returns the static object to use as the state
   static instance(){
       return TutorialScreen.tutorialScreen;
   }

   active(){
       // needs to be implimented
       image(bgimage2, 0, 0, width, height);
       push()
       fill(111,168,220);
       textSize(80);
       textStyle(BOLD);
       textAlign(CENTER);
       text("Tutorial",width/2, 70);
       fill(215,175, 55, opacity);
       stroke(0);
       strokeWeight(5);
       rectMode(CENTER);
       rect(width/2, height/2+272, 650, 100, 20);
       pop()
        push()
       textSize(55);
       textFont(mainFont);
       fill(0,0,0);
       textAlign(CENTER);
       textStyle(NORMAL);

       text("Press Enter To Go Back",width/2, height/2+282);
       pop()
       push()
       fill(215,175, 55);
       stroke(0);
       strokeWeight(5);
       rectMode(CORNER);
       rect(width/16, height/4-50, 600, 425, 20);
       fill(111,168,220);
       textSize(70);
       textStyle(BOLD);
       textAlign(CENTER);
       text("Rules",width/16+300, height/2-170);
       textSize(20);
       textStyle(NORMAL);
       textAlign(CENTER);
       fill(255,255,255);
       text(`You need to survive for 10 minutes\n
       Defeat the enemies that spawn all around you\n
       Enemies will drop green experience orbs. Pick them up to level up\n
       Enemies also have a chance to drop a health pack that heals you\n
       Leveling up allows you to choose a power up. However leveling up also increases the amount of enemies\n
       `,width/16, height/2-150, 600);
       pop()

       push()
       fill(215,175, 55);
       stroke(0);
       strokeWeight(5);
       rectMode(CORNER);
       rect(width-width/16-600, height/4-50, 600, 425, 20);
       fill(111,168,220);
       textSize(70);
       textStyle(BOLD);
       textAlign(CENTER);
       text("Controls",width - width/16-300, height/2-170);
       textSize(20);
       textStyle(NORMAL);
       textAlign(CENTER);
       fill(255,255,255);
       text(`WASD or arrows to move\n
       Left click or space bar to shoot\n
       Enter to start the game\n
       Escape key to pause or unpause the game\n
       `,width - width/16 - 600, height/2-150, 600);
       pop()

       push()


       if(opacity < 212 && opacShouldIncrease){
           opacity+=10;
       }else{
       opacShouldIncrease = false;
       opacity-=10;
       if(opacity < 0){
           opacShouldIncrease = true;
     }
   }   


       
       if ((kb.presses('enter')))
       {
           state.init()
       } 
   }
}

