let timer;
let player;
function setup() {
    new Canvas();
    // test circle
    player= new Player();
    timer = new Timer();
  }
  
  function draw() {
    background(220);
    timer.printTimer(width/2, 20);
    player.movement();
  }