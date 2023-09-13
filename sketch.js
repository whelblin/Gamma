let timer;
let asteroid;
let player;
let exp;
var non_colliding;
var colliding;
var asteroids;
function setup() {
  //these three must be first
    new Canvas();
    non_colliding = new Group();
    colliding = new Group();
    asteroids = [];
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
    // checks if an asteroid hits the player
    player.checkCollision(asteroids);
      
    tests();
  }

function tests(){
  exp.test_increase();
}

