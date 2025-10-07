let mic;
let micLevel = 0;
let balloonFrames = [];
let frameIndex = 0;
let orientationX = 0;
let orientationY = 0;
let sensorsEnabled = false;

function preload() {
  for (let i = 1; i <= 10; i++) {
    let filename = `assets/balloon${nf(i, 2)}.png`;
    balloonFrames.push(loadImage(filename));
  }
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  imageMode(CENTER);
  angleMode(DEGREES);


  mic = new p5.AudioIn();
  mic.start();

  // Centered and styled button
    let button = createButton('Tap to Enable Tilt');
    button.style('font-size', '18px');
    button.style('padding', '12px 24px');
    button.style('background-color', '#636175');
    button.style('border', 'none');
    button.style('border-radius', '15px');
    button.style('color', '#FAF2F2');
    button.style('font-family', 'sans-serif');
    button.style('cursor', 'pointer');
    button.position(width / 2 - button.width / 2, height / 2 - button.height / 2);
    button.center(); // this helps with mobile scaling

    button.mousePressed(() => {
      DeviceOrientationEvent.requestPermission().then(response => {
        if (response === 'granted') {
          sensorsEnabled = true;
          button.remove();
        }
      });
    });
    sensorsEnabled = true;
}
 if (sensorsEnabled && typeof rotationX === 'number' && typeof rotationY === 'number') {
  xOffset = map(rotationY, -45, 45, -80, 80, true);
  yOffset = map(rotationX, -45, 45, -40, 40, true);
}  else {
    // keep balloon near center if no tilt available
    xOffset = 0;
    yOffset = 0;
  }

function draw() {
  background(255, 230, 235);

  micLevel = mic.getLevel() * 5;
  frameIndex = int(map(micLevel, 0, 0.3, 0, balloonFrames.length - 1, true));

  if (sensorsEnabled) {
   xOffset = map(rotationY, -45, 45, -80, 80, true);
yOffset = map(rotationX, -45, 45, -40, 40, true);
  }

  let xPos = width / 2 + xOffset;
  let yPos = height / 2 + yOffset;
  image(balloonFrames[frameIndex], xPos, yPos, 300, 300);

  // simple instruction text
  fill(80);
  textAlign(CENTER);
  textSize(16);
  text("Tilt to float, speak to pop", width / 2, height - 40);
}
