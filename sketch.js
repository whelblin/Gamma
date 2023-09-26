let timer;
let asteroid;
let tracker;
var player;
let playerObject;
let exp;
let lvlBox;
let items;
let itmNumChance;
var nextLevel;
let Health;
let score;
var non_colliding;
var colliding;
var asteroids;
var trackers;
var bullets;
var orbs;
var inMenu;
var opacity;
var opacShouldIncrease;
var paused;
let mainFont = 'Chakra Petch';
let bgimage1;
let bgimage2;
var playerAni;
let itemName = ["TestName"];
let itemDescription = ["TestDescription"];

function preload() {
    //mainFont = loadFont('assets/comici.tff');
    non_colliding = new Group();
    colliding = new Group();
    itmBoxes = new Group();
    colliding.overlaps(non_colliding);
    Player.preload()
  }

function setup() {
    new Canvas();
    inMenu = true;
    frameRate(60); //set framerate to be system independent 
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
      itmBoxes.overlaps(colliding);
      timer.printTimer(width/2, 80);
      score.printScore(width, 80)
      player.movement();
      player.aiming();
      player.shoot();
      timer.enemySpawn(asteroids,trackers);
      for(let t = 0; t < trackers.length; t++){
        player.trackerAttract(trackers[t]);
      }
      // checks if a bullet hits an asteroid
      player.checkBulletHit(asteroids, bullets, exp, score);
      player.trackerBulletHit(trackers, bullets, exp, score);
      player.checkShipHit(asteroids, player, orbs, Health);
      player.checkExpHit()
      //tests();
      if(exp.level == nextLevel){
        for(i=0; i < 3; i++){
          items == new ItemBox();
          //itemBoxes[i].boxVis();
        }
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
        for(let y = 0; y < items.length; y++){
          items[y].remove();
        }
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
        trackers = [];
        bullets = [];
        orbs = [];
        player= new Player();
        console.log(player.player.ani);
        timer = new Timer();
        exp = new Experience();
        lvlBox = new LevelBox();
        items = [];
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

