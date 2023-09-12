function setup() {
  createCanvas(512, 512);
  fill(255, 0, 0);
}

function draw() {
  beginShape(TESS);
  vertex(20, 30);
  //top left to top right
  vertex(45, 11);
  vertex(80, 20);
  //top right to bottom right
  vertex(94, 40);
  vertex(80, 93);
  //bottom right to bottom left
  vertex(32, 76);
  vertex(20, 80);
  // bottom left to top left
  vertex(5, 42);
  vertex(24, 34);
  endShape(CLOSE);
}
