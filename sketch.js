var timer;
var player;
let playerObject;
let exp;
var lvlBox;
let items;
let itmNumChance;
let shield;
var nextLevel;
var allBullets = [];
let score;
var non_colliding;
var colliding;
var asteroidGroup;
var trackerGroup;
var bulletGroup;
var asteroids;
var trackers;
var shooters;
var bullets;
var orbs;
var packs;
var opacity;
var opacShouldIncrease;
let mainFont = 'Chakra Petch';
let bgimage1;
let bgimage2;
let bgimage3;
var playerAni;
let bulletSound;
let asteroidHitSound;
let backgroundMusic;
var state;
let newItem;
var chromedriver = -1;

var currentStage;

// list of power ups that are allowed

var allpowerups = [
  ["Fire Rate", new FireRate()],
  ['Shields', new ShieldPowerup()],
  ['Magnet', new MagnetPowerUp()],
  ['Movement Speed', new MovementSpeed()],
  ['Health', new HealthIncrease()],
  ['Damage', new DamageIncrease()],
  ['Sentry Cannon', new turretPowerUp()]
]
var powerups = allpowerups
var activePowers = [];


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
    bulletGroup = new colliding.Group()
    //Player.preload()
    //Bullet.preload()
    Animation.preload()
    bgimage1 = loadImage('assets/space.gif');
    bulletSound = loadSound('assets/shoot02wav-14562.mp3');
    asteroidHitSound = loadSound('assets/rock-destroy-6409.mp3');
    backgroundMusic = loadSound("assets/cyborg-ninja-kevin-macleod.mp3")
    state = new gameState();
    currentStage = new StageHandler();
  }

function setup() {
    new Canvas();
    allSprites.autoCull = false
    
   
    // Press to start opacity control
    opacity = 0;
    opacShouldIncrease = false;
    bgimage2 = loadImage('assets/bgretro.png');
    bgimage3 = loadImage('assets/gameover.png');
    backgroundSong();
    asteroids = [];
    trackers = [];
    bullets = [];
    orbs = [];
    packs = [];
    shooters = []
    chromedriver = new Chromedriver(1) // add one for debug
    state.init()
  }

  function draw() {
    //frameRate(50); //set framerate to be system independent 
    // runs the current state
    //console.log(allSprites.length)
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


