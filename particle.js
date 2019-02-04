function Particle() {
    this.pos = createVector(random(width), random(height));
    this.vel = createVector(0,0);
    this.acc = createVector(0, 0);
    this.maxSpeed = 5;

    this.prevPos = this.pos.copy();

    this.update = function () {
        this.vel.add(this.acc);
        this.vel.limit(this.maxSpeed);
        this.pos.add(this.vel);
        this.acc.mult(0);
    }

    this.applyForce = function (force) {
        this.acc.add(force);
    }

    this.show = function () {
        stroke(random(5),random(255),random(5),2);
        strokeWeight(1);
        noFill();
        //point(this.pos.x, this.pos.y);
        //line(this.pos.x,this.pos.y,this.prevPos.x,this.prevPos.y);
        ellipse(this.pos.x,this.pos.y,this.prevPos.x,this.prevPos.y);
        //this.upDatePrev();
    }

    this.upDatePrev = function(){
        this.prevPos.x= this.pos.x;
        this.prevPos.y= this.pos.y;
    }

    this.edges = function () {
        if (this.pos.x > width) {
            this.pos.x = 0;
            this.upDatePrev();
        }
        if (this.pos.x < 0) {
            this.pos.x = width;
            this.upDatePrev();
        }
        if (this.pos.y > height) {
            this.pos.y = 0;
            this.upDatePrev();
        }
        if (this.pos.y < 0) {
            this.pos.y = height;
            this.upDatePrev();
        }

    }

    this.follow = function(Vectors){
        var x = floor(this.pos.x /scl);
        var y = floor(this.pos.y/rows);
        var index = x +y *cols;
        var force = Vectors[index];
        this.applyForce(force);

    }

}