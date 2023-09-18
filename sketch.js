let timer;
let asteroid;
let player;
let playerObject;
let exp;
let Health;
var non_colliding;
var colliding;
var asteroids;
var bullets;
var inMenu;
var opacity;
var opacShouldIncrease;
let mainFont = 'Chakra Petch';
let bgimage1;
let bgimage2;

//testing git push
function preload() {
    //mainFont = loadFont('assets/comici.tff');
    non_colliding = new Group();
    colliding = new Group();
  }

function setup() {
    new Canvas();
    inMenu = true;
    // Press to start opacity control
    opacity = 0;
    opacShouldIncrease = false;
    bgimage1 = loadImage('assets/bgimage2.png');
    bgimage2 = loadImage('assets/bgimage3.gif');

  }
  
  function draw() {
    image(bgimage1, 0, 0, width, height);
    //background(255);
    if(!inMenu)
    {
      image(bgimage2, 0, 0, width, height);
      colliding.overlaps(non_colliding);
      timer.printTimer(width/2, 80);
      player.movement();
      player.aiming();
      player.shoot();
      timer.asteroidSpawn(asteroids);
      // checks if a bullet hits an asteroid
      player.checkBulletHit(asteroids, bullets, exp);
      player.checkAstroidHit(asteroids, player, Health);
      //tests();
    }
    else
    {
   //   drawTitle();
      drawStart();
      drawScore();
      if (kb.presses(' '))
      {
        inMenu = false;
        asteroids = [];
        bullets = [];
        player= new Player();
        timer = new Timer();
        exp = new Experience();
        Health = new PlayerHealth();

      }
    }
  }
/*
function drawTitle()
{
    textSize(150);
    textAlign(CENTER);
    textFont(mainFont);
    fill(0,0,0);
//    text("SPACE SURVIVORS",width/2, 300);
} */

function drawStart()
{
    
    fill(215,175, 55, opacity);
    stroke(0);
    strokeWeight(5);
    rectMode(CENTER);
    rect(width/2, height/2+200, 400, 150, 30);

    textSize(120);
    textFont(mainFont);
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


}

function drawScore()
{
    var score = 0; // temp
    textSize(80);
    textAlign(CENTER);
    textFont(mainFont);
    fill(255);
    text("Best Score: "+ score,width/2, 860);
}


function tests(){
  exp.test_increase();
  Health.healthDecrease();
}



