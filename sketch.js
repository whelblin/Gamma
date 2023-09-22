let timer;
let asteroid;
let player;
let playerObject;
let exp;
let lvlBox;
var nextLevel;
let Health;
let bestScore;
let score;
var non_colliding;
var colliding;
var asteroids;
var bullets;
var inMenu;
var opacity;
var opacShouldIncrease;
var paused;
var mainFont = 'Chakra Petch';
var bgimage1;
var bgimage2;
var bgimage3;
var playerAni;


function preload() {
    //mainFont = loadFont('assets/comici.tff');
    non_colliding = new Group();
    colliding = new Group();
    Player.preload()
    bgimage1 = loadImage('assets/bgimage1.gif');
    bgimage2 = loadImage('assets/bgimage3.gif');
    bgimage3 = loadImage('assets/bgimage4.png');

  }

function setup() {
    new Canvas();
    inMenu = true;
    paused = false;
    // Press to start opacity control
    opacity = 0;
    opacShouldIncrease = false;
  //  bgimage2 = loadImage('assets/bgimage3.gif');
  //  bgimage3 = loadImage('assets/bgimage4.png');
 

  }
  
  function draw() {

 //   image(bgimage1, 0, 0, width, height);
    if(!inMenu && paused == false)
    {
      image(bgimage2, 0, 0, width, height);
      colliding.overlaps(non_colliding);
      timer.printTimer(width/2, 80);
      score.printScore(width, 80);
      player.movement();
      player.aiming();
      player.shoot();
      timer.asteroidSpawn(asteroids);
      // checks if a bullet hits an asteroid
      player.checkBulletHit(asteroids, bullets, exp, score, bestScore);
      player.checkAstroidHit(asteroids, player, Health);
      //tests();
      if(exp.level == nextLevel){
        lvlBox.boxVis();
        nextLevel += 1;
        paused = true;
      }
      if(kb.pressed('escape')){
        paused = true;
      }
      if(Health.isDead()){
        resetGame();
      }
    }
    else if(!inMenu && paused == true){
      image(bgimage2, 0, 0, width, height);
      world.step(0.001/240);
      if(kb.pressed('escape')){
        lvlBox.boxInvis();
        paused = false;
    }
  }
    else
    {
   //   drawTitle();
      image(bgimage1, 0, 0, width, height);
      drawStart();
      drawScore();
      if (kb.presses(' '))
      {
        inMenu = false;
        asteroids = [];
        bullets = [];
        player= new Player();
        console.log(player.player.ani);
        timer = new Timer();
        exp = new Experience();
        lvlBox = new LevelBox();
        nextLevel = 2;
        Health = new PlayerHealth();
        score = new ScoreCounter();
        bestScore = new ScoreCounter();
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
    rect(width/2, height/2+180, 400, 150, 30);

    textSize(120);
    textFont(mainFont);
    fill(0,0,0);
    textAlign(CENTER);
    text("Play",width/2, height/2+210);


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
  fill(255);
  //textSize(100);
  //  var score = 0; // temp
  //  textAlign(RIGHT);
  //  textFont(mainFont);
  //  text("Best Score: "+ score,width - 10, 70)
  //  textAlign(CENTER)
}

/*
function tests(){
  exp.test_increase();
  Health.healthDecrease();
}*/

/*
function drawGameOver(){
  textAlign(CENTER);
  textFont = mainFont;
  textSize(40);
  text("GAME OVER", width/2,height/2+110);
} */

function resetGame() {
 // inMenu = true;
  image(bgimage3, 0, 0, width, height);
  bestScore.printBestScore(width/2,height/2+220);
  fill(111,168,220, opacity);
  if(opacity < 212 && opacShouldIncrease)
    {
      opacity+=7;
    }
    else
    {
      opacShouldIncrease = false;
      opacity-= 7;
      if(opacity < 0)
      {
        opacShouldIncrease = true;
      }
    }  

  exp.outerBar.remove();
  exp.innerBar.remove();
  Health.outerBar.remove();
  Health.innerBar.remove();
  player.player.remove();
  for(let i = 0; i < asteroids.length; i++){
    asteroids[i].remove();
  }
}

