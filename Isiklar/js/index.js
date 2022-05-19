'use strict';

var ctx = c.getContext('2d'),
    w = c.width = window.innerWidth,
    h = c.height = window.innerHeight,
    opts = {

  count: 150,
  baseLife: 10,
  addedLife: 30,
  shadowMult: 3,
  baseSize: 2,
  addedSize: 1,

  repaintAlpha: .012,
  hueVariation: 1,
  hueScreenSpread: 100,
  templateColor: 'hsl(hue, 100%, 55%)',
  init: init
},
    gui = new dat.GUI(),
    fireflies = [],
    tick = Math.random() * 360 | 0,
    first = true;

function init() {

  ctx.shadowBlur = 0;
  ctx.fillStyle = '#222';
  ctx.fillRect(0, 0, w, h);

  fireflies.length = [];
  for (var i = 0; i < opts.count; ++i) {
    fireflies.push(new Firefly());
  }if (first) {

    first = false;
    gui.add(opts, 'count', 1, 400);
    gui.add(opts, 'baseLife', 1, 200);
    gui.add(opts, 'addedLife', 0, 100);
    gui.add(opts, 'shadowMult', 0, 20);
    gui.add(opts, 'baseSize', 0, 5);
    gui.add(opts, 'addedSize', 0, 5);
    gui.add(opts, 'repaintAlpha', 0, 1);
    gui.add(opts, 'hueVariation', 0, 10);
    gui.add(opts, 'hueScreenSpread', 0, 360);
    gui.add(opts, 'templateColor');
    gui.add(opts, 'init');

    gui.close();

    loop();
  }
}

function loop() {

  window.requestAnimationFrame(loop);

  step();
  draw();
}

function step() {

  tick += opts.hueVariation;

  fireflies.map(function (fly) {
    return fly.step();
  });
}
function draw() {

  ctx.shadowBlur = 0;
  ctx.globalCompositeOperation = 'source-over';
  ctx.fillStyle = 'rgba(0,0,0,alp)'.replace('alp', opts.repaintAlpha);
  ctx.fillRect(0, 0, w, h);
  ctx.globalCompositeOperation = 'lighter';

  fireflies.map(function (fly) {
    return fly.draw();
  });
}

function Firefly() {

  this.reset();
}
Firefly.prototype.reset = function () {

  this.x = Math.random() * w | 0;
  this.y = Math.random() * h | 0;

  this.time = 0;
  this.life = opts.baseLife + Math.random() * opts.addedLife | 0;
  this.size = opts.baseSize + Math.random() * opts.addedSize | 0;
};
Firefly.prototype.step = function () {

  ++this.time;

  if (this.time >= this.life) this.reset();
};
Firefly.prototype.draw = function () {

  ctx.shadowBlur = this.time * opts.shadowMult;
  ctx.shadowColor = ctx.fillStyle = opts.templateColor.replace('hue', this.x / w * opts.hueScreenSpread + tick);
  ctx.fillRect(this.x, this.y, this.size, this.size);
  ctx.fillRect(this.x, this.y, this.size, this.size);
};

init();

window.addEventListener('resize', function () {

  w = c.width = window.innerWidth;
  h = c.height = window.innerHeight;

  init();
});