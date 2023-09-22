let timer;
let asteroid;
let player;
let playerObject;
let exp;
let lvlBox;
let itmBox1;
let itmBox2;
let itmBox3;
let itmBox4;
let itmNumChance;
var nextLevel;
let Health;
let score;
var non_colliding;
var colliding;
var asteroids;
var bullets;
var inMenu;
var opacity;
var opacShouldIncrease;
var paused;
let mainFont = 'Chakra Petch';
let bgimage1;
let bgimage2;
var playerAni;


function preload() {
    //mainFont = loadFont('assets/comici.tff');
    non_colliding = new Group();
    colliding = new Group();
    itmBoxes = new Group();
    Player.preload()
  }

function setup() {
    new Canvas();
    inMenu = true;
    paused = false;
    // Press to start opacity control
    opacity = 0;
    opacShouldIncrease = false;
    bgimage1 = loadImage('assets/bgimage2.png');
    bgimage2 = loadImage('assets/bgimage3.gif');

  }
  
  function draw() {

    image(bgimage1, 0, 0, width, height);
    if(!inMenu && paused == false)
    {
      image(bgimage2, 0, 0, width, height);
      colliding.overlaps(non_colliding);
      itmBoxes.overlaps(non_colliding);
      timer.printTimer(width/2, 80);
      score.printScore(width, 80)
      player.movement();
      player.aiming();
      player.shoot();
      timer.asteroidSpawn(asteroids);
      // checks if a bullet hits an asteroid
      player.checkBulletHit(asteroids, bullets, exp, score);
      player.checkAstroidHit(asteroids, player, Health);
      //tests();
      if(exp.level == nextLevel){
        itmNumChance = floor(random(1,4));
        if(x == 1){ itmBox1 = new ItemBox(); }
        if(x == 2){ itmBox1 = new ItemBox(); itmBox2 = new ItemBox();}
        lvlBox.boxVis();
        itmBox.boxVis();
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
    textAlign(RIGHT);
    textFont(mainFont);
    fill(255);
    text("Best Score: "+ score,width - 10, 70)
    textAlign(CENTER)
}

function tests(){
  exp.test_increase();
  Health.healthDecrease();
}





function resetGame() {
  inMenu = true;
  exp.outerBar.remove();
  exp.innerBar.remove();
  Health.outerBar.remove();
  Health.innerBar.remove();
  player.player.remove();
  for(let i = 0; i < asteroids.length; i++){
    asteroids[i].remove();
  }
}

