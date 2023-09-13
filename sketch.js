let timer;
let player;
let exp;
var non_colliding;
var colliding;
function setup() {
  //these three must be first
    new Canvas();
    non_colliding = new Group();
    colliding = new Group();

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
    //tests();
  }

function tests(){
  exp.test_increase();
}

