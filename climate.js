let data;
// deviations from the corresponding 1951-1980 means
const WID = 1000;
const HG = 500;

const cir = [20, 40, 60, 80];
const wordoffset = 300;
let ringSpc;

let cm;
let currentYear = 1;
let currentMonth = 0; // 13 - 1 = 12

let monthCycle;

let angle;

months = [
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
    "Jan",
    "Feb",
  ];

function preload(){
  data = loadTable("GLB.Ts+dSST.csv", "csv", "header");
}

function setup() {
  createCanvas(WID, HG, WEBGL);
  createEasyCam();
  document.oncontextmenu = ()=>false;
  
  
  cm = map(1, 0, 3, 0, 255);
  monthCycle = PI / 6;
  /*
  
  paper = createGraphics(width, height);
  paper.textAlign(CENTER);
  paper.textSize(32);
  
  paper.fill(cm, 0, 255-cm);
  paper.text('-1º C', 100, 100);
  
  paper.fill(2*cm, 0, 255-2*cm);
  paper.translate(0, cir[0]);
  paper.text('0º C', 100, 100);
  
  paper.fill(3*cm, 0, 255-3*cm);
  paper.translate(0, cir[0]);
  paper.text('+1º C', 100, 100);
  
  paper.fill(4*cm, 0, 255-4*cm);
  paper.translate(0, cir[0]);
  paper.text('+2º C', 100, 100);
  
  cdl = createGraphics(width, height);
  cdl.textAlign(CENTER);
  cdl.textSize(32);
  cdl.fill(255);
  
  for (let i=0; i<months.length; i++){
    cdl.push();
    cdl.translate(wordoffset *cos((i+1)*monthCycle), 
                  -wordoffset *sin((i+1)*monthCycle));
    cdl.text(months[i], 500, 500);
    cdl.pop();
  }
  */
  angle = map(1, 0, 10, 0, HALF_PI);
  ringSpc = 2 * map(1, 0, 3, 0, data.getRowCount()*1.5);
  
  
}

function draw() {
  background(0);
  noFill();
  stroke(120, 120, 120, 50);
  strokeWeight(1);

  
  let rate = frameCount * 0.1;
  //rotateY(angle * rate);
  //rotateX(angle * rate);
  
  
  /*
  if (cos(angle * rate) > 0){
     image(paper, -100, -30);
  
     cdl.text(data.getRow(currentYear).arr[0], 500, 500);
  
     image(cdl, -500, -500);
  }
  */
  
  push();
  stroke(cm, 0, 255-cm);
  torus(cir[0], 1, 12, 12);
  pop();
  
  push();
  stroke(2*cm, 0, 255-2*cm);
  translate(0, 0, ringSpc);
  torus(cir[1], 1, 12, 12);
  pop();
  
  push();
  stroke(3*cm, 0, 255-3*cm);
  translate(0, 0, 2*ringSpc);
  torus(cir[2], 1, 12, 12);
  pop();
  

  
  strokeWeight(1);
  noFill();
  
  
  let counterYP = 1;
  let counterMP = 1;
  let counterY = counterYP;
  let counterM = counterMP;
  let pervious;
  
  while (counterY*12 + counterM < currentYear*12 + currentMonth){
    pervious = parseFloat(data.getRow(counterYP).arr[counterMP]);
    
    counterM++;
    if (counterM == 12+1){
      counterM = 1;
      counterY++;
    }
    let cur = parseFloat(data.getRow(counterY).arr[counterM]);
    
    let rds = map(cur, -1, 1, cir[0], cir[2]);
    let prds = map(pervious, -1, 1, cir[0], cir[2]);
    
    let lineColor;
    let cold = color(0, 0, 255);
    let warm = color(255, 0, 0);
    let zero = color(255, 255, 255);
    lineColor = zero;
  
    let avg = parseFloat(cur + pervious) * 0.5;

    if (avg < 0) {
        lineColor = lerpColor(zero, cold, abs(avg));
      } else {
        lineColor = lerpColor(zero, warm, abs(avg));
    }
    
    
    let x = rds * cos(-monthCycle * counterM);
    let y = rds * sin(-monthCycle * counterM);
    let z = counterY * 1.5;
    let px = prds * cos(-monthCycle * counterMP);
    let py = prds * sin(-monthCycle * counterMP);
    let pz = counterYP * 1.5;
    
    
    
    stroke(lineColor);
    line(px, py, pz, x, y, z);
  
    
    
    counterYP = counterY;
    counterMP = counterM;
    
  }
  
 
  currentMonth+=3;
  if (currentMonth == 12){
    currentMonth = 0;
    currentYear++;
  }
  
  if (currentYear == data.getRowCount()){
    currentMonth = 12;
    currentYear = data.getRowCount();
    
  }
  
  
}

