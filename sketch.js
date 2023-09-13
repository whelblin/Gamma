let timer;
let asteroid;
let player;
let exp;
var non_colliding;
var colliding;
var asteroids;
var bullets;
function setup() {
  //these three must be first
    new Canvas();
    non_colliding = new Group();
    colliding = new Group();
    asteroids = [];
    bullets = [];
    player= new Player();
    timer = new Timer();
    exp = new Experience();
  }
  
  function draw() {
    colliding.overlaps(non_colliding);
    background(220);
    timer.printTimer(width/2, 30);
    player.movement();
    player.aiming();
    player.shoot();
    timer.asteroidSpawn(asteroids);
    // checks if a bullet hits an asteroid
    player.checkBulletHit(asteroids, bullets);
    
      
    tests();
  }

function tests(){
  exp.test_increase();
}

