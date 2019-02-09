
class Attractor{
    constructor(x,y,mass){
        this.position = createVector(x,y);
        this.mass = mass;
        this.G = 1;
    }

    caculateAttraction(m){
        let force = p5.Vector.sub(this.position,m.position);
        let distance = force.mag();
        distance = constrain(distance, 5,20);
        force.normalize();
        let strength = (this.G * this.mass * m.mass) / (distance * distance);
        force.mult(strength);
        return force;
    }

    display(){
        ellipseMode(CENTER);
        strokeWeight(0);
        noStroke();
        fill(23,245,255);
        ellipse(this.position.x,this.position.y,this.mass*2);
    }
}