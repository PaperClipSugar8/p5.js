let img;
let res = 14;
let arr = new Array(40);
for (let i=0; i<arr.length; i++){
    arr[i] = new Array(40);
}

let res1 = 100;
let res2 = 80;
let res3 = 30;
let sr;
let ssr;
let sp;

function setup() {
  createCanvas(windowWidth, windowHeight);
  img = loadImage("mushroom.webp");
  sr = new Array(res1);
  
  for (let i=0; i<res1; i++){
    sr[i] = new Column(map(i, 0, res1-1, 0, windowWidth), windowHeight, 10, 1);
    sr[i].init();
  }
  
  ssr = new Array(res2);
  for (let j=0; j<res2; j++){
    ssr[j] = new Column(map(j, 0, res2-1, 0, windowWidth), windowHeight, 20, 2);
    ssr[j].init();
  }
  
  sp = new Array(res3);
  for (let i=0; i<res3; i++){
    sp[i] = new Column(map(i, 0, res3-1, 0, windowWidth), windowHeight, 30, 3);
    sp[i].init();
  }
  
  

  
  frameRate(4);
}

function draw() {
  background(0);
  //image(img, 0, 0, width, height);
  img.resize(width, height);
  
  for (let i=0; i<res1; i++){
    sr[i].show();
    sr[i].updatePosition();
  }
  

  for (let i=0; i<res2; i++){
    ssr[i].show();
    ssr[i].updatePosition();
  }
  
 
  for (let i=0; i<res3; i++){
    sp[i].show();
    sp[i].updatePosition();
  }
  
  
  
  
  img.loadPixels();
  
  for (let i=0; i < width; i+=res){
    for (let j=0; j<height; j+=res){
      const r = img.pixels[(i + j * img.width) * 4];
      const g = img.pixels[(i + j * img.width) * 4+ 1];
      const b = img.pixels[(i + j * img.width) * 4+ 2];
      const avg = (r + g +b) / 3;
      

        if (p5.Vector.sub(createVector(r, g, b), createVector(226, 243, 221)).mag() > 9){
          fill(60, avg, 60, avg);
          push();
          fill(0);
          rect(i, j, res, res);
          pop();
          text(String.fromCharCode(0x30A0 + round(random(0, 255))), i, j);
        }
        
      

      
      
      
      
    }
  }
  img.updatePixels();
  
 
  
}
