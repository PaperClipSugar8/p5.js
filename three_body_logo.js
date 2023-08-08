
const G = 5;
let len = 700;
sun = {
  mass : 1,
  rad : 10,
  pos : null,
  vel : null,
  acc : null
}

earth = {
  mass : 1,
  rad : 10,
  pos : null,
  vel : null,
  acc : null
}

moon = {
  mass : 1,
  rad : 10,
  pos : null,
  vel : null,
  acc : null
}

function collision_Dect(body1, body2){
 let dist = sqrt((body2.pos.x - body1.pos.x)**2 +
                (body2.pos.y - body1.pos.y)**2);
 return dist <= body1.rad + body2.rad;
}

function updatePos(body) {
  body.pos.set(p5.Vector.add(body.pos, body.vel));
  if (body.pos.y+(body.rad) > (len + 10)/2){body.vel.y=-body.vel.y}
  if (body.pos.x+(body.rad) > (len + 10)/2){body.vel.x=-body.vel.x}
  if (body.pos.y-(body.rad) < -(len + 10)/2){body.vel.y=-body.vel.y}
  if (body.pos.x-(body.rad) < -(len + 10)/2){body.vel.x=-body.vel.x}
}

function updateVel(body) {
  let mb = p5.Vector.add(body.vel, body.acc);
  body.vel.x = constrain(mb.x, -15, 15);
  body.vel.y = constrain(mb.y, -15, 15);
}


function updateAcc(body1, body2) {
  
  let comp = p5.Vector.sub(body2.pos, body1.pos);
  let mag2 =  constrain(comp.x**2 + comp.y**2, 100, 1000);
  let mgf =   (body1.mass * body2.mass * G) / mag2;
  let unit = p5.Vector.div(comp, sqrt(mag2));
  
  body1.acc.set(p5.Vector.div(p5.Vector.mult(unit, mgf), body1.mass));
  
}


function collision_Resp(body1, body2) {
  let un = p5.Vector.normalize(p5.Vector.sub(body2.pos, body1.pos));
  let ut = createVector(-un.x, un.y);
  let vn1 = p5.Vector.dot(un, body1.vel);
  let vn2 = p5.Vector.dot(un, body2.vel);
  let vt1 = p5.Vector.dot(ut, body1.vel);
  let vt2 = p5.Vector.dot(ut, body2.vel);
  let vnp = createVector(vn1 * (body1.mass - body2.mass) + (body2.mass * vn2) / (body1.mass + body2.mass),
                         vn2 * (body2.mass - body1.mass) +
(body2.mass * vn1) / (body2.mass + body1.mass))
  body1.vel.set(p5.Vector.add(p5.Vector.mult(un, vnp.x)),
                              p5.Vector.mult(ut, vt1));
  body2.vel.set(p5.Vector.add(p5.Vector.mult(un, vnp.y)),
                              p5.Vector.mult(ut, vt2))
}




function setup() {
  createCanvas(len, len);
  background(0);
  sun.pos = createVector(0, 100);
  sun.vel = createVector(0, 0);
  sun.acc = createVector(0, 0);
  
  earth.pos = createVector(100*cos(11*PI/6), 100*sin(7*PI/6));
  earth.vel = createVector(cos(7*PI/6), sin(7*PI/6));
  earth.acc = createVector(0, 0);
  
  moon.pos = createVector(100*cos(7*PI/6), 100*sin(11*PI/6));
  moon.vel = createVector(cos(11*PI/6), -sin(11*PI/6));
  moon.acc = createVector(0, 0);
  
  
}

function draw() {
  translate(width/2, height/2);
  scale(1, -1);
  background(0, 0, 200, 1);
  rect(-len/2, -len/2, len, len);
  strokeWeight(5);
  stroke(255);
  noFill();
  
  circle(sun.pos.x, sun.pos.y, sun.rad*2);
  circle(earth.pos.x, earth.pos.y, earth.rad*2);
  circle(moon.pos.x, moon.pos.y, moon.rad*2);
  
  
  updateAcc(sun, earth);
  updateAcc(earth, sun);
  
  updateAcc(sun, moon);
  updateAcc(moon, sun);
  
  updateAcc(earth, moon);
  updateAcc(moon, earth);
  
  updateVel(sun);
  updateVel(earth);
  updateVel(moon);
  
  updatePos(sun);
  updatePos(earth);
  updatePos(moon);
  
  
  
  
  
}





