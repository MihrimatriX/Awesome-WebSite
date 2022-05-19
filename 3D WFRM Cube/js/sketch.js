var a = 0;
var s;

window.wallpaperPropertyListener = {
  applyUserProperties: function(properties) {
    if (properties.customint) {
      s = properties.customint.value;
    }
  }
}

function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);
  setAttributes('antialias', true);
}

function draw() {
  background(34, 40, 49);
  stroke(255);
  noFill();
  rotateX(a);
  rotateY(a);
  box(windowHeight * s / 100);

  a += 0.01;
}

function windowResized() {
  createCanvas(windowWidth, windowHeight);
}
