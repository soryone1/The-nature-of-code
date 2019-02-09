

let movers=[];
let attractor;

function setup(){
    createCanvas(600,600);
    background(0);
    for(let i= 0;i<10;i++){
        movers[i]= new Mover(random(width),random(height));
    }

    attractor1 = new Attractor(187.42,170,10);
    attractor2 = new Attractor(187.42,365,10);
    attractor3 = new Attractor(412.58,365,10);
    attractor4 = new Attractor(412.58,170,10);
   
}
function draw(){
  
//   attractor1.display();
//   attractor2.display();
//   attractor3.display();
//   attractor4.display();

  for(let i=0;i<movers.length;i++){
      let force = attractor1.caculateAttraction(movers[i]);
      movers[i].applyForce(force);

      movers[i].update();
      movers[i].display();

      let force1 = attractor2.caculateAttraction(movers[i]);
      movers[i].applyForce(force1);

      movers[i].update();
      movers[i].display();

      let force3 = attractor3.caculateAttraction(movers[i]);
      movers[i].applyForce(force3);

      movers[i].update();
      movers[i].display();

      let force4 = attractor4.caculateAttraction(movers[i]);
      movers[i].applyForce(force4);

      movers[i].update();
      movers[i].display();
  }
  }


