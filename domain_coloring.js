let sample;
let res = 1000;
let coloring;
let img;

function preload(){
  img = loadImage('ahh.jpg'); // image file
}

function setup() {
  createCanvas(windowWidth, windowHeight);
}



function draw() {
  background(0);
  stroke(0);
  noFill();
  strokeWeight(4);
  img.resize(width, height);
  //image(img, 0, 0)
  img.loadPixels();

  for (let i=0; i<res; i++){
    let gw = floor(map(i, 0, res-1, 0, img.width));
    let x = map(i, 0, res-1, -1, 1);
    for (let j=0; j<res; j++){
      let gh = floor(map(j, 0, res-1, 0, img.height));
      let y = map(j, 0, res-1, -1, 1);  
      
      
      //let trans = math.pow(math.complex(math.exp(x), math.exp(y)), math.complex(x, y));
      //let trans = math.pow(math.complex(x, y), 1);
      //let trans = math.csch(math.complex(x, y));
      let trans = math.tanh(math.gamma(math.complex(x, y)));
      /*
      let trans = math.sum(
        [
          math.multiply(math.pow(math.complex(x, y), 5), 1),
          math.multiply(math.pow(math.complex(x, y), 4), -1/3),
          math.multiply(math.pow(math.complex(x, y), 3), 0),
          math.multiply(math.pow(math.complex(x, y), 2), 1/2),
          math.multiply(math.pow(math.complex(x, y), 1), 10),
          math.complex(3, -2)
        ]
      );
      */
      
      
      let m = floor(map(trans.re, -1, 1, 0, img.width));
      let n = floor(map(trans.im, -1, 1, 0, img.height));
      
      const r = img.pixels[(m + n * img.width) * 4 + 0];
      const g = img.pixels[(m + n * img.width) * 4 + 1];
      const b = img.pixels[(m + n * img.width) * 4 + 2];
      const p = img.pixels[(m + n * img.width) * 4 + 3];
      
      //fill(r, g, b, p);
      stroke(r, g, b, p);
      //rect(gw, gh, width/res, height/res);
      point(gw, gh);
      
    }
  }
  

  img.updatePixels();
  noLoop();
}



