let timer;
let asteroid;
let player;
let exp;
let lvlBox;
var nextLevel;
var non_colliding;
var colliding;
var asteroids;
var bullets;
var inMenu;
var opacity;
var opacShouldIncrease;
var paused;
let mainFont = "comic sans";

  function preload() {
    //mainFont = loadFont('assets/comici.tff');
  }

function setup() {
    new Canvas();
    inMenu = true;
    paused = false;
    // Press to start opacity control
    opacity = 0;
    opacShouldIncrease = false;
  }
  
  function draw() {
    background(220);
    if(!inMenu && paused == false)
    {
      colliding.overlaps(non_colliding);
      timer.printTimer(width/2, 30);
      player.movement();
      player.aiming();
      player.shoot();
      timer.asteroidSpawn(asteroids);
      // checks if a bullet hits an asteroid
      player.checkBulletHit(asteroids, bullets, exp);
      tests();
      if(exp.level == nextLevel){
        lvlBox.boxVis();
        nextLevel += 1;
        paused = true;
      }
      if(kb.pressed('escape')){
        paused = true;
      }
    }
    else if(!inMenu && paused == true){
      world.step(0.001/240);
      if(kb.pressed('escape')){
        lvlBox.boxInvis();
        paused = false;
      }
    }
    else
    {
      drawTitle();
      drawStart();
      drawScore();
      if (kb.presses(' '))
      {
        inMenu = false;
        non_colliding = new Group();
        colliding = new Group();
        asteroids = [];
        bullets = [];
        player= new Player();
        timer = new Timer();
        exp = new Experience();
        lvlBox = new LevelBox();
        nextLevel = 2;
      }
    }
  }

function drawTitle()
{
    textSize(150);
    textAlign(CENTER);
    textFont(mainFont);
    fill(0,0,0);
    text("SPACE SURVIVORS",width/2, height/2);
}

function drawStart()
{
    textSize(30);
    textAlign(CENTER);
    textFont(mainFont);
    fill(0,0,0,opacity);
    text("Press space to start",width/2, height/2+150);

    if(opacity < 255 && opacShouldIncrease)
    {
      opacity+=5;
    }
    else
    {
      opacShouldIncrease = false;
      opacity-=5;
      if(opacity < 0)
      {
        opacShouldIncrease = true;
      }
    }
}

function drawScore()
{
    var score = 0; // temp
    textSize(82);
    textAlign(CENTER);
    textFont(mainFont);
    fill(0,0,0);
    text("Best Score: "+ score,width/2, height/2+95);
}

function tests(){
  exp.test_increase();
}



