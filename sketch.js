let timer;
function setup() {
    new Canvas();
    // test circle
    let test = new Sprite(width/2, height/2, 50);
    timer = new Timer();
  }
  
  function draw() {
    background(220);
    console.log(timer.getCurrentTime());
    text("Time: " + timer.getCurrentTime(), 10,20);
  }