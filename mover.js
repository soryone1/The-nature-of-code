
class Mover{
    constructor(x,y,mass){
        this.position = createVector(x,y);
        this.velocity = createVector(1,0);   //the beginning speed
        this.acceleration = createVector(0,0);  //the beginning a=0
        this.mass = 1;   //set the mass here
    }

    applyForce(force){    //set the force from outside here
        let f = p5.Vector.div(force,this.mass);
        this.acceleration.add(f);
    }

    update(){
        this.velocity.add(this.acceleration);
        this.position.add(this.velocity);
        this.acceleration.mult(0);
    }

    display(){
        noStroke();
        fill(255,175);
        ellipse(this.position.x,this.position.y,this.mass);

    }


}