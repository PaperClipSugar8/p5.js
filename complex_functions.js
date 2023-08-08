
let res = 40;
let sample;
let processed_sheep;
let processed_cow;
let sheep;
let cow;
let t = 0;
let TIME = 130;
let scl;

let cen;

function expo(p5v, po){
  let ang = atan2(p5v.x, p5v.y) * po;
  let mag = sqrt(p5v.x*p5v.x + p5v.y*p5v.y) ** po;
  return createVector( mag * cos(ang), mag * sin(ang));
}
function factorial(x){
  if (x == 0){return 1}
  return x * factorial(x - 1);
}
function expot(p5v, func){
  let result = createVector(0, 0);
  for (let i=0; i<5; i++){
    result.add(
      p5.Vector.mult(expo(p5v, i).div(factorial(i)), func(i))
    );
  }
  return result;
}

const eX = (i) => 1;
const sinX = (i) => {
  if ((i - 1)%4 == 0){return 1}
  if ((i + 1)%4 == 0){return -1}
  else{return 0}
}
const cosX = (i) => {
  if ((i/2)%2 == 0){return 1}
  if ((i/2)%2 == 1){return -1}
  else{return 0}
}
const lnx1 = (i) => {
  if (i == 0){return 0}
  if (i%2 == 1){return 1}
  else{return -1}
}
const lnx_1 = (i) => {
  if (i == 0){return 0}
  if (i%2 == 1){return -1}
  else{return 1}
}


// stepwise x and y
function timelapse(t, time, initialV, finalV){
  let ang0 = atan2(initialV.x, initialV.y);
  let angf = atan2(finalV.x, finalV.y);
  let mag0 = sqrt(initialV.x*initialV.x + initialV.y*initialV.y);
  let magf = sqrt(finalV.x*finalV.x + finalV.y*finalV.y);
  let newang = map(t, 0, time, ang0, angf);
  let newmag = map(t, 0, time, mag0, magf);
  return createVector(newmag * cos(newang), newmag * sin(newang));
}


function connecticut(samples, scl){
  for (let i=0; i<res; i++){
    for (let j=0; j<res; j++){
      if (i+1 < res){
      if (p5.Vector.dist(samples[i][j], samples[i+1][j])*scl < 80){
      line( samples[i][j].x * scl, samples[i][j].y * scl,
            samples[i+1][j].x * scl, samples[i+1][j].y * scl);
      }
      }
      if (j+1 < res){
      if (p5.Vector.dist(samples[i][j], samples[i][j+1])*scl < 80){
      line( samples[i][j].x * scl, samples[i][j].y * scl,
            samples[i][j+1].x * scl, samples[i][j+1].y * scl);
      }
      }
      /*
      push();
      stroke(250, 253, 15);
      strokeWeight(1);
      point(scl * sheep[i][j].x, scl * sheep[i][j].y);
      pop();
      */
    }
  }
}




let len = 800;
function setup() {
  createCanvas(windowWidth, windowHeight);
  background(0);
  sample = new Array(res);
  for (let i=0; i<res; i++){
    let x = map(i, 0, res-1, -1, 1);
    sample[i] = new Array(res);
    for (let j=0; j<res; j++){
      let y = map(j, 0, res-1, -1, 1);
      sample[i][j] = createVector(x, y);

    }
  }
  
  processed_sheep = new Array(res);
  for (let i=0; i<res; i++){
    processed_sheep[i] = new Array(res);
    for (let j=0; j<res; j++){
      processed_sheep[i][j] = expot(sample[i][j], lnx1);
    }
  }
  
  sheep = new Array(res);
  for (let i=0; i<res; i++){
    sheep[i] = new Array(res);
    for (let j=0; j<res; j++){
      sheep[i][j] = createVector(0, 0);
    }
  }
  
  processed_cow = new Array(res);
  for (let i=0; i<res; i++){
    processed_cow[i] = new Array(res);
    for (let j=0; j<res; j++){
      processed_cow[i][j] = expot(sample[i][j], lnx_1);
    }
  }
  
  cow = new Array(res);
  for (let i=0; i<res; i++){
    cow[i] = new Array(res);
    for (let j=0; j<res; j++){
      cow[i][j] = createVector(0, 0);
    }
  }
  
  scl = map(1/res, -1, 1, 0, len) * 2/3;
  cen = createVector(0, 0);
}

function draw() {
  background(0, 0, 3, 30);
  stroke(0, 200, 200);
  strokeWeight(2);
  cen.x = (sheep[floor(res/2)][floor(res/2)].x + cow[floor(res/2)][floor(res/2)].x)/2;
  cen.y = (sheep[floor(res/2)][floor(res/2)].y + cow[floor(res/2)][floor(res/2)].y)/2;
  
  
  for (let i=0; i<res; i++){
    for (let j=0; j<res; j++){
      
      
      sheep[i][j].x = timelapse(t, TIME, sample[i][j], processed_sheep[i][j]).x;
      
      sheep[i][j].y = timelapse(t, TIME, sample[i][j], processed_sheep[i][j]).y;
      
      cow[i][j].x = timelapse(t, TIME, sample[i][j], processed_cow[i][j]).x;
      
      cow[i][j].y = timelapse(t, TIME, sample[i][j], processed_cow[i][j]).y;


    }
  }
  push();
  translate(width/2 -cen.x*scl, height/2 -cen.y*scl - 240);
  connecticut(sheep, scl);
  pop();
  push();
  translate(width/2 -cen.x*scl, height/2 -cen.y*scl + 240);
  connecticut(cow, scl);
  pop();

  t+=0.5;
  //if (t - 5 > TIME){noLoop();  }
  
}