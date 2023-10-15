let img;
let res = 8; // even
let weird = 3/2;
let density = "$@B%8&WM#*oahkbdpqwmZO0QLCJUYXzcvunxrjft/\|()1{}[]?-_+~<>i!lI;:,^~`\'.";

let len = density.length;


function setup() {
  createCanvas(400, 400);
  img = loadImage("apple.jpg");
}

function draw() {
  background(0);
  //image(img, 0, 0, width, height);
  img.loadPixels();
  
  let w = img.width / res;
  let h = img.height / res;
  for (let i=0; i < img.width; i+=res){
    for (let j=0; j<img.height; j+=res){
      const r = img.pixels[(i + j * img.width) * 4 * weird];
      const g = img.pixels[(i + j * img.width) * 4 * weird + 1];
      const b = img.pixels[(i + j * img.width) * 4 * weird + 2];
      const avg = (r + g + b) / 3;
      
      noStroke();
      fill(0, 255, 0);
      let letter = floor(map(avg, 0, 255, 0, len));
      text(density.charAt(letter), i, j);
      
      
    }
  }
  img.updatePixels();
  
}