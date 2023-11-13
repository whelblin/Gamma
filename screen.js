
/*
The game State class is what we have access to in sketch
you call the transitions and it will change the state of the game by swtiching its state varaible
the run method is used to activate whatever state it is in

There is no longer a need for a inmenu, paused, or leveling up variable. The states take care of everything
*/

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
        player= new Player();
        timer = new Timer();
        lvlBox = new LevelBox();
        
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
        nextLevel += 1;
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
        colliding.visible = true;
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
        currentStage = new StageHandler()

        powerups = allpowerups

        print(asteroids.length, trackers.legnth)
      //  print(asteroids.length, trackers.legnth)
        this.changeState(DeadScreen.instance())
    }

    // transition from GameScreen to PauseScreen
    pause(){
        this.changeState(PauseScreen.instance())
    }
    // transition from PauseScreen to GameScreen
    resumeGame(){
        this.changeState(GameScreen.instance())
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
        rect(width/2, height/2+200, 400, 150, 30);

        textSize(120);
        textFont(mainFont);
        textAlign(CENTER);
        fill(0,0,0);
        text("Play",width/2, height/2+230);


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
        
        drawScore();
        // switches the state to gameScreen when the mouseIsPressed or space is pressed
        if ((kb.presses(' '))||(mouseIsPressed === true))
        {
            state.startGame()
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
        timer.activatePowers()
        score.printScore(width - 100, 80);
        player.movement();
        player.aiming();
        player.shoot();
        timer.enemySpawn(asteroids,trackers);
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
        player.checkShipHit(asteroids);
        player.checkShipHit(trackers);
        player.checkShipHit(shooters);
        player.checkExpHit()
        player.drawExp();
        player.drawHealth()
        drawScore()

        currentStage.checkStage()
        //tests();
        // level up screens
        /*
        if(player.getLevel() == nextLevel){
          state.levelingup()
        }
        */
        if(kb.pressed('escape')){
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

        fill(215,175, 55, opacity);
        stroke(0);
        strokeWeight(5);
        rectMode(CENTER);
        rect(width/2, height/2+192, 300, 100, 20);

        textSize(55);
        textFont(mainFont);
        fill(0,0,0);
        textAlign(CENTER);
        text("Play Again",width/2, height/2+208);
        if(opacity < 212 && opacShouldIncrease){
            opacity+=10;
        }else{
        opacShouldIncrease = false;
        opacity-=10;
        if(opacity < 0){
            opacShouldIncrease = true;
      }
    }   


        
        if ((kb.presses(' '))||(mouseIsPressed === true))
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
        timer.printTimer(width/2, 80);
        score.printScore(width - 100, 80);
        player.drawExp();
        world.step(0.0000001/240);
        if(kb.pressed('escape')){
            state.resumeGame()
        }
    }
}