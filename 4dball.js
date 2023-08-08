let ang;
let globe;
let res = 4;
let r = 1;


function matmul(a, b){
   let podct=[];
   for (let i=0;i<a.length;i++){
     let row=[];
     for (let j=0;j<a.length;j++){
       let entry=0;
       for (let k=0;k<b.length;k++){
         entry += a[i][k] * b[k][j]}
       if (isFinite(entry)){
       row.push(entry)}}
     podct.push(row)}
 return podct}
rrr = (dcm) => Math.round(dcm*1000)/1000;
function ball_draw(gb) {
  for (let i=0; i<gb.length-1; i++){
    for (let j=0; j<gb.length-1; j++){
      for (let k=0; k<gb.length-1; k++){
        beginShape();
        vertex(gb[i][j][k].x, gb[i][j][k].y, gb[i][j][k].z);
        vertex(gb[i+1][j][k].x, gb[i+1][j][k].y, gb[i+1][j][k].z);
        vertex(gb[i+1][j+1][k].x, gb[i+1][j+1][k].y, gb[i+1][j+1][k].z);
        vertex(gb[i+1][j+1][k+1].x, gb[i+1][j+1][k+1].y, gb[i+1][j+1][k+1].z);
        vertex(gb[i+1][j][k+1].x, gb[i+1][j][k+1].y, gb[i+1][j][k+1].z);
        vertex(gb[i][j][k+1].x, gb[i][j][k+1].y, gb[i][j][k+1].z);
        vertex(gb[i][j+1][k+1].x, gb[i][j+1][k+1].y, gb[i][j+1][k+1].z);
        vertex(gb[i][j+1][k].x, gb[i][j+1][k].y, gb[i][j+1][k].z);
        vertex(gb[i][j][k].x, gb[i][j][k].y, gb[i][j][k].z);
        endShape();
      }
    }
  }
  
}
function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);
  createEasyCam();
  document.oncontextmenu = () => false;
  ang = 0;
  globe = new Array(res);
  
  for (let i=0; i<res; i++){
    var theta = map(i, 0, res-1, 0, TWO_PI);
    
    globe[i] = new Array(res);
    for (let j=0; j<res; j++){
      var alpha = map(j, 0, res-1, 0, PI);
      
      globe[i][j] = new Array(res);
      for (let k=0; k<res; k++){
        var beta = map(k, 0, res-1, 0, PI);
        
        globe[i][j][k] = [
          [r * cos(theta) * sin(alpha) * sin(beta)],
          [r * sin(theta) * sin(alpha) * sin(beta)],
          [r * cos(alpha) * sin(beta)],
          [r * cos(beta)]
        ];
      }
    }
  }
}
function draw() {
  background(0);
  stroke(0);
  strokeWeight(2);
  scale(500);
  pointLight(255, 255, 255, 100, 100, 100);
  pointLight(255, 255, 255, -100, -100, -100);
  fill(0, 250, 80, 120);
  var rZW = [
     [1, 0, 0, 0],
     [0, 1, 0, 0],
     [0, 0, rrr(cos(ang)), -rrr(sin(ang))],
     [0, 0, rrr(sin(ang)),  rrr(cos(ang))]
   ];
  let result = new Array(res);
  for (let i=0; i<res; i++){
    result[i] = new Array(res);
    for (let j=0; j<res; j++){
      result[i][j] = new Array(res);
      for (let k=0; k<res; k++){
        let w = 1 / (3 - globe[i][j][k][3][0]);
        let proj = [
          [w, 0, 0, 0],
          [0, w, 0, 0],
          [0, 0, w, 0]
        ];
        
        let v = matmul(proj, matmul(rZW, globe[i][j][k]));
        result[i][j][k] = createVector(v[0][0], v[1][0], v[2][0]);  
      }
    }
  }
  ball_draw(result);
  ang += 0.03;
}
