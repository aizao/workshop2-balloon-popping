let mic;
let micLevel = 0;
let balloonFrames = [];
let frameIndex = 0;
let xOffset = 0;
let yOffset = 0;
let sensorsEnabled = false;

function preload() {
  for (let i = 1; i <= 10; i++) {
    let filename = `assets/balloon${nf(i, 2)}.png`;
    balloonFrames.push(loadImage(filename));
  }
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  pixelDensity(1);
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
    button.center(); // this helps with mobile scaling

  button.mousePressed(() => {
    // iPhone permission
    if (typeof DeviceOrientationEvent.requestPermission === "function") {
      DeviceOrientationEvent.requestPermission().then((response) => {
        if (response === "granted") {
          sensorsEnabled = true;
          button.remove();
        }
      });
    } else {
      // Android or other devices permissions
      sensorsEnabled = true;
      button.remove();
    }
  });
}

function draw() {
  background(255, 230, 235);

 micLevel = mic.getLevel() * 5;
  frameIndex = int(map(micLevel, 0, 0.25, 0, balloonFrames.length - 1, true));
  
    if (frameIndex >= balloonFrames.length - 1) {
    frameIndex = balloonFrames.length - 1;
  }

  if (sensorsEnabled) {
    xOffset = map(rotationY, -60, 60, -150, 150, true);
    yOffset = map(rotationX, -60, 60, -100, 100, true);
  }
  
  // idle motion  
  let idleX = sin(frameCount * 0.01) * 10;
  let idleY = cos(frameCount * 0.008) * 8;

  let xPos = width / 2 + xOffset + idleX;
  let yPos = height / 2 + yOffset + idleY;
  
  image(balloonFrames[frameIndex], xPos, yPos, 300, 300);

  // simple instruction text
  fill(80);
  textAlign(CENTER);
  textSize(16);
  text("Tilt to float, speak to pop", width / 2, height - 40);

  // mic level display 
let barWidth = 100;
  let barHeight = 10;
  let barX = width - barWidth - 20;
  let barY= 20;
  
  let fillWidth = constrain(micLevel*barWidth,0,barWidth);
  
  noStroke();
  fill(220);
  rect(barX, barY, barWidth, barHeight, 5);
  fill(150,80,120);
  rect(barX, barY, fillWidth, barHeight, 5);
  
  fill(60)
  textAlign(RIGHT);
  textSize(12);
  text("Mic:" + nf(micLevel, 1,2), width-20, barY + 25);
  
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}