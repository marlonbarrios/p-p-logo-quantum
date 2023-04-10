// Declare global variables
let angle = 0;
let rotationSpeed = 0.05;
let paused = true;
let numSemiCircles = 20;
let colorIntensity = 10;
let colorSpeed = 0.05;
let circleColorPicker;
let textColorPicker;
let bgTransparency = 255;
let semiCircleDegrees = 180;
let showLetters = false;
let showSemiCircles = true;

function setup() {
  createCanvas(windowWidth, windowHeight);
  angleMode(DEGREES);

  noFill();
  textFont("Helvetica");

  // Create a slider for font size
  textSizeSlider = createSlider(50, 300, 180, 1);
  textSizeSlider.position(200, 70);

  // Create color pickers for circle and text colors
  circleColorPicker = createColorPicker('#000000');
  circleColorPicker.position(200, 10);
  textColorPicker = createColorPicker('#05C2D2');
  textColorPicker.position(200, 40); 

  window.document.title = "P+P";
}
// Resize canvas when window is resized
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function draw() {
  // Set the background color and transparency
  background(255, bgTransparency);
  // Center the coordinate system
  translate(width / 2, height / 2);

  if (showSemiCircles) {
    // Draw the semi-circles
    for (let i = 1; i <= numSemiCircles; i++) {
      noFill();
      strokeWeight(1);
      stroke(circleColorPicker.color());
      push();
      rotate(angle * i);
      drawSemiCircle(12 * i);
      pop();
    }
  }

  if (showLetters) {
    // Adjust text color intensity based on frame count
    colorIntensity = map(sin(frameCount * colorSpeed), -1, 1, 100, 200);
    fill(textColorPicker.color());
    noStroke();
    drawText();
  }

  // Update the angle if not paused
  if (!paused) {
    angle += rotationSpeed;
  }
}

// Function to draw a semi-circle with a given radius
function drawSemiCircle(radius) {
  let weight = map(radius, 0, 12 * numSemiCircles, 1, 6); // Map the weight to the radius
  strokeWeight(weight); // Set the stroke weight based on the radius
  arc(0, 0, radius * 2, radius * 1, 0, semiCircleDegrees);
}

// Function to draw the "P+P" text
function drawText() {
  let textRadius = 9 * numSemiCircles + 10;
  let plusWidth = textWidth("+");
  let pWidth = textWidth("P");

  textSize(textSizeSlider.value()); // Set the font size based on slider value
  // Draw the left "P"
  text("p", -textRadius + 65, -6);

  // Draw the "+" sign
  text("+", -plusWidth / 2, 0);

  // Draw the right "P"
  text("p", textRadius - 165, -6);
}

// Function to handle key presses
function keyPressed() {
  if (keyCode === LEFT_ARROW) {
    rotationSpeed = -0.05;
  } else if (keyCode === RIGHT_ARROW) {
    rotationSpeed = 0.05;
  } else if (key === ' ') {
    paused = !paused;
  } else if (key === 'r' || key === 'R') {
    resetSketch();
  } else if (keyCode === UP_ARROW) {
    numSemiCircles = min(numSemiCircles + 1, 50);
  } else if (keyCode === DOWN_ARROW) {
    numSemiCircles = max(numSemiCircles - 1, 20);
  } else if (key === 't' || key === 'T') {
    bgTransparency = bgTransparency === 255 ? 10 : 255;
  } else if (key === 'a' || key === 'A') {
    semiCircleDegrees = semiCircleDegrees === 180 ? 
    340 : 180;
  } else if (key === 's' || key === 'S') {
    saveCanvas('p+p', 'png'); // Save the canvas as a PNG image with the filename "p+p.png"
  } else if (key === 'b' || key === 'B') {
    background(255, bgTransparency); // Redraw the background when 'b' or 'B' is pressed
  } else if (key === '1') {
    showLetters = !showLetters; // Toggle display of letters
  } else if (key === '2') {
    showSemiCircles = !showSemiCircles; // Toggle display of semicircles
  }
}

// Function to reset the sketch to its initial state
function resetSketch() {
angle = 0;
rotationSpeed = 0.01;
paused = true;
numSemiCircles = 20;
}
