let x = 100;
let y = 100;

function setup() {
  createCanvas(512, 512);
  fill(255, 0, 0);
}

function draw() {
  if (keyIsDown(65)) {
    x -= 5;
  }

  if (keyIsDown(68)) {
    x += 5;
  }

  if (keyIsDown(87)) {
    y -= 5;
  }

  if (keyIsDown(83)) {
    y += 5;
  }

  clear();
  ellipse(x, y, 50, 50);
  describe(`50-by-50 red ellipse moves left, right, up, and
    down with arrow presses.`);
}
