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
var asteroidGroup;
var trackerGroup;
var asteroids;
var trackers;
var bullets;
var orbs;
var inMenu;
var opacity;
var opacShouldIncrease;
var paused;
var levelingup;
let mainFont = 'Chakra Petch';
let bgimage1;
let bgimage2;
var playerAni;
let bulletSound;
let asteroidHitSound;
let backgroundMusic;
var state;
let newItem;
var chromedriver = -1;
// list of power ups that are allowed
var powerups = [
  ["Fire Rate", new FireRate()],
  ['Sentry Cannon', null],
  ['Big Beam', null],
  ['Shields', null]
]


function preload() {
    //mainFont = loadFont('assets/comici.tff');
    non_colliding = new Group();
    colliding = new Group();
    itmBoxes = new Group();
    colliding.overlaps(non_colliding);
    itmBoxes.overlaps(colliding)
    itmBoxes.overlaps(non_colliding)
    asteroidGroup = new colliding.Group();
    trackerGroup = new colliding.Group();
    Player.preload()
    bulletSound = loadSound('assets/shoot02wav-14562.mp3');
    asteroidHitSound = loadSound('assets/rock-destroy-6409.mp3');
    backgroundMusic = loadSound("assets/cyborg-ninja-kevin-macleod.mp3")
    state = new gameState();
   

  }

function setup() {
    new Canvas();
    allSprites.autoCull = false
    
    inMenu = true;
    frameRate(60); //set framerate to be system independent 
    paused = false;
    // Press to start opacity control
    opacity = 0;
    opacShouldIncrease = false;
    bgimage1 = loadImage('assets/bgimage2.png');
    bgimage2 = loadImage('assets/bgimage3.gif');
    backgroundSong();
    asteroids = [];
    trackers = [];
    bullets = [];
    orbs = [];
    chromedriver = new Chromedriver(1 )
    lvlBox = new LevelBox();

    state.changeState(StartScreen.instance())
  }

  function draw() {
    // runs the current state
    state.run() 
  }


function tests(){
  exp.test_increase();
  Health.healthDecrease();
}


function backgroundSong(){
  backgroundMusic.play();
  backgroundMusic.loop();
  backgroundMusic.setVolume(.05);
  userStartAudio();
}


