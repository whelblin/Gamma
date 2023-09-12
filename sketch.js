let timer;
let player;
let exp;
function setup() {
    new Canvas();
    player= new Player();
    timer = new Timer();
    exp = new Experience();
  }
  
  function draw() {
    background(220);
    timer.printTimer(width/2, 30);
    player.movement();
    player.aiming();
    //tests();
  }

function tests(){
  exp.test_increase();
}