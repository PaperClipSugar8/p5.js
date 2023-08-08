const aaa = 1;
const bbb = 1;
const G = 8;
let len = 700;
sun = {
  mass : 1/3,
  pos : null,
  vel : null,
  acc : null,
  shape : null
}

earth = {
  mass : 1/3,
  pos : null,
  vel : null,
  acc : null,
  shape : null
}

moon = {
  mass : 1/3,
  pos : null,
  vel : null,
  acc : null,
  shape : null
}

function supershape(ang, m, n1, n2, n3){
  let t1 = abs((1/aaa) * cos(m * ang / 4));
  let t2 = abs((1/bbb) * sin(m * ang / 4));
  let r = pow(t1, n2) + pow(t2, n3);
  return pow(r, -1/n1);
}

function ball_Cal(r, res) {
    let globe = new Array(res+1);
    for (let i=0;i<res+1;i++){
      globe[i] = new Array(res+1)}
  let lon;
  let lat;
  let x;
  let y;
  let z;
  for (let i=0; i<res+1; i++){
    lat = map(i, 0, res, -HALF_PI, HALF_PI);
    r2 = supershape(lat, 5, 15.44, -0.4538, 87.07);
    for (let j=0; j<res+1; j++){
      lon = map(j, 0, res, -PI, PI);
      r1 = supershape(lon, 0, 0.4794, 30.25, 0.3563);
      x = r * r1 * r2 * cos(lon) * cos(lat);
      y = r * r1 * r2 * sin(lon) * cos(lat);
      z = r * r2 * sin(lat);
      globe[i][j] = createVector(x, y, z);
    }
  }
  return globe;
}

function ball_draw(globe, vec) {
  /*
    for (let i=0; i<globe.length-1; i++){
    for (let j=0; j<globe.length-1; j++){
      let a = p5.Vector.add(globe[i][j], vec);
      let b = p5.Vector.add(globe[i+1][j], vec);
      let c = p5.Vector.add(globe[i][j+1], vec);
      let d = p5.Vector.add(globe[i+1][j+1], vec);
      
      line(a.x, a.y, a.z, b.x, b.y, b.z);
      line(a.x, a.y, a.z, c.x, c.y, c.z);
      line(a.x, a.y, a.z, d.x, d.y, d.z);
    }
  }
  */
  for (let i=0; i<globe.length-1; i++){
    beginShape(TRIANGLE_STRIP);
    for (let j=0; j<globe.length; j++){
      let a = p5.Vector.sub(globe[i][j], vec);
      let b = p5.Vector.sub(globe[i+1][j], vec);
      vertex(a.x, a.y, a.z);
      vertex(b.x, b.y, b.z);
    }
    endShape();
  }
}

function updatePos(body) {
  body.pos.set(p5.Vector.add(body.pos, body.vel))}

function updateVel(body) {
  body.vel.set(p5.Vector.add(body.vel, body.acc))}

function updateAcc(mvr, atrc) {
  let comp = p5.Vector.sub(atrc.pos, mvr.pos);
  let mag2 =  constrain(comp.x**2 + comp.y**2 + comp.z**2, 100, 1000);
  let mgf =   (mvr.mass * atrc.mass * G) / mag2;
  let unit = p5.Vector.div(comp, sqrt(mag2));
  mvr.acc.set(p5.Vector.div(p5.Vector.mult(unit, mgf), mvr.mass));
}


function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);
  createEasyCam();
  document.oncontextmenu = ()=>false;
  background(0);
  
  sun.pos = createVector(50, 50, 50);
  sun.vel = createVector(1, -1, 1);
  sun.acc = createVector(0, 0, 0);
  
  earth.pos = createVector(-50, 50, -50);
  earth.vel = createVector(1, -1, 1);
  earth.acc = createVector(0, 0, 0);
  
  moon.pos = createVector(100, 0, 0);
  moon.vel = createVector(0, 0, 0);
  moon.acc = createVector(0, 0, 0);
  
  sun.shape = ball_Cal(30, 20);
  earth.shape = ball_Cal(30, 20);
  moon.shape = ball_Cal(30, 20);
}

function draw() {
  background(0, 5);
  noStroke();

  let avg = p5.Vector.div(p5.Vector.add(p5.Vector.add(sun.pos, 
                                        earth.pos), 
                                        moon.pos), 3);
  translate(avg.x, avg.y, avg.z);
  
  //specularMaterial(255);
  normalMaterial();
  pointLight(0, 255, 255, avg.x, avg.y, avg.z);
  
  
  
  ball_draw(sun.shape, sun.pos);
  ball_draw(earth.shape, earth.pos);
  ball_draw(moon.shape, moon.pos);
  
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





