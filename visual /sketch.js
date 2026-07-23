let x, y;

function setup() {
  createCanvas(600, 400);
  background(20);

  x = width / 2;
  y = height / 2;
}

function draw() {
  // Transparent background for trail
  fill(20, 20);
  noStroke();
  rect(0, 0, width, height);

  // Random movement
  x += random(-5, 5);
  y += random(-5, 5);

  // Keep inside canvas
  x = constrain(x, 0, width);
  y = constrain(y, 0, height);

  // Draw circle
  fill(random(100, 255), random(100, 255), random(100, 255));
  noStroke();
  circle(x, y, 20);
}