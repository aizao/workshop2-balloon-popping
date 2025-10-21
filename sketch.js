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
