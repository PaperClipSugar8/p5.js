
let r = 100;
let total = 50;
let a = 1;
let b = 1;
let globe = new Array(total+1);
for (let i=0;i<total+1;i++){
  globe[i] = new Array(total+1);
}


function supershape(ang, m, n1, n2, n3){
  let t1 = abs((1/a) * cos(m * ang / 4));
  let t2 = abs((1/b) * sin(m * ang / 4));
  let r = pow(t1, n2) + pow(t2, n3);
  return pow(r, -1/n1);
}


function setup() {
  createCanvas(450, 450, WEBGL);
  createEasyCam();
  document.oncontextmenu = () => false;
  
  let lon;
  let lat;
  let x;
  let y;
  let z;
  for (let i=0; i<total+1; i++){
    lat = map(i, 0, total, -HALF_PI, HALF_PI);
    r2 = supershape(lat, 9, -74.16, -0.682, -41.4);
    for (let j=0; j<total+1; j++){
      lon = map(j, 0, total, -PI, PI);
      r1 = supershape(lon, 4, 0.3754, 50.744, -0.657);
      x = r * r1 * r2 * cos(lon) * cos(lat);
      y = r * r1 * r2 * sin(lon) * cos(lat);
      z = r * r2 * sin(lat);
      globe[i][j] = createVector(x, y, z);
    }
  }
  
}


function draw() {
  background(0);
  noStroke();
  let locX = mouseX - width / 2;
  let locY = mouseY - height / 2;
  specularMaterial(255);
  pointLight(255, 255, 255, locX, locY, 50);
  
  
  for (let i=0; i<total; i++){
    beginShape(TRIANGLE_STRIP);
    for (let j=0; j<total+1; j++){

      vertex(globe[i][j].x, 
             globe[i][j].y, 
             globe[i][j].z);
      vertex(globe[i+1][j].x, 
             globe[i+1][j].y, 
             globe[i+1][j].z);
 
    }
    endShape();
  }
  
  /*
  stroke(150);
  for (let i=0; i<total; i++){
    for (let j=0; j<total; j++){

      line(  globe[i][j].x, 
             globe[i][j].y, 
             globe[i][j].z,
             globe[i+1][j].x, 
             globe[i+1][j].y, 
             globe[i+1][j].z
      )
      line(  globe[i][j].x, 
             globe[i][j].y, 
             globe[i][j].z,
             globe[i][j+1].x, 
             globe[i][j+1].y, 
             globe[i][j+1].z
      )
      
 
    }
  }
  */
  
  
}