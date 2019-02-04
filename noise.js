var inc = 0.1;
var scl = 20;
var cols, rows;
var fr;
var zOff = 0;

var particles = [];
var flowField;

function setup() {
  createCanvas(600, 600);

  cols = floor(width / scl);
  rows = floor(height / scl);
  fr = createP('');

  flowField = new Array(cols*rows);

  for (let i = 0; i < 1000; i++) {
    particles[i] = new Particle();
  }
  background(0);
}

function draw() {
  
  let yOff = 0;

  for (let y = 0; y < rows; y++) {
    let xOff = 0;

    for (let x = 0; x < cols; x++) {

      var index = x + y * cols;
      let angle = noise(xOff, yOff, zOff) * TWO_PI*4;
      var v = p5.Vector.fromAngle(angle);
      v.setMag(1);
      flowField[index]=v;
      xOff += inc;

      // stroke(0, 50);
      // strokeWeight(1);

      // push();
      // translate(x * scl, y * scl)
      // rotate(v.heading());
      // line(0, 0, scl, 0);
      // pop();

    }
    yOff += inc;
    zOff += 0.0003;

  }

  for (let i = 0; i < particles.length; i++) {
    particles[i].follow(flowField);
    particles[i].update();
    particles[i].edges();
    particles[i].show();
  }
  fr.html(floor(frameRate()));

}