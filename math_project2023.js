let angf;
let step;

function create_a_cube(dim, vex=[[[1]],[[-1]]]){
   if (dim == 1){return vex}
   let next = []; let more; let erom;
   for (let i=0;i<vex.length;i++){
     let a = [...vex[i]];more = a; more.push([1]);
     let b = [...vex[i]];erom = b; erom.push([-1]);
     next.push(more); next.push(erom);
     }
   return create_a_cube(dim-1, next);
}

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


function good(vex1, vex2) {
  let ct = 0;
  if ((vex1[0][0]-vex2[0][0]) == 0) {ct+=1}
  if ((vex1[1][0]-vex2[1][0]) == 0) {ct+=1}
  if ((vex1[2][0]-vex2[2][0]) == 0) {ct+=1}
  if ((vex1[3][0]-vex2[3][0]) == 0) {ct+=1}
  return ct == 3;
}



let po;
let ang ;
function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);
  createEasyCam();
  document.oncontextmenu = ()=>false;
  po = create_a_cube(4);
  
  
  // change angf angle rotated by
  ang = 0;
  angf = PI/4;
  step = map(1, 0, 120, ang, angf);
  
  frameRate(15);

  
  
}


function draw() {
  background(0);
  stroke(255);
  strokeWeight(3);
  scale(150);
  
  // different planes of rotations
  var rZW = [
     [1, 0, 0, 0],
     [0, 1, 0, 0],
     [0, 0, rrr(cos(ang)), -rrr(sin(ang))],
     [0, 0, rrr(sin(ang)),  rrr(cos(ang))]
   ];
  var rXY = [
     [rrr(cos(ang)), -rrr(sin(ang)), 0, 0],
     [rrr(sin(ang)),  rrr(cos(ang)), 0, 0],
     [0, 0, 1, 0],
     [0, 0, 0, 1]
  ];
  var rXZ = [
     [rrr(cos(ang)), 0, -rrr(sin(ang)), 0],
     [0, 1, 0, 0],
     [rrr(sin(ang)), 0, rrr(cos(ang)), 0],
     [0, 0, 0, 1]
  ];
  var rYW = [
     [1, 0, 0, 0],
     [0, rrr(cos(ang)), 0, -rrr(sin(ang))],
     [0, 0, 1, 0],
     [0, rrr(sin(ang)), 0, rrr(cos(ang))]
  ]
  var rXW = [
     [rrr(cos(ang)), 0, 0, -rrr(sin(ang))],
     [0, 1, 0, 0],
     [0, 0, 1, 0],
     [rrr(sin(ang)), 0, 0, rrr(cos(ang))]
  ]
  var rYZ = [
     [1, 0, 0, 0],
     [0, rrr(cos(ang)), -rrr(sin(ang)), 0],
     [0, rrr(sin(ang)), rrr(cos(ang)), 0],
     [0, 0, 0, 1]
  ]
  let shearx = [
    [1, 0, 0, 0],
    [1, 1, 0, 0],
    [0, 0, 1, 0],
    [0, 0, 0, 1]
  ]
  
  let st = [
    [1, 0, 0, ang],
    [0, 1, 0, ang],
    [0, 0, 1, 0],
    [0, 0, 0, 1]
  ]
  
  
  
  let result = new Array(po.length);
   for (let i=0; i<po.length;i++) {
     let w = 1 / (4 - po[i][3][0]);
      let proj = [
        [w, 0, 0, 0],
        [0, w, 0, 0],
        [0, 0, w, 0]
      ]; //P
     
     // matmul takes two matrices and returns the product matrix, Px or P(rXY)(rZW)x
     // the sixteen x 3-d coordinates are graphed
     let v = matmul(proj, matmul(st, po[i]));
     result[i] = createVector(v[0][0], v[1][0], v[2][0]);
   }
  

  fill(255, 255, 0, 200);
  quad(result[0].x, result[0].y, result[0].z,
       result[1].x, result[1].y, result[1].z,
       result[3].x, result[3].y, result[3].z,
       result[2].x, result[2].y, result[2].z);
  fill(255, 0, 0, 200);
  quad(result[12].x, result[12].y, result[12].z,
       result[13].x, result[13].y, result[13].z,
       result[15].x, result[15].y, result[15].z,
       result[14].x, result[14].y, result[14].z);
  fill(0, 255, 0, 200);
  quad(result[0].x, result[0].y, result[0].z,
       result[1].x, result[1].y, result[1].z,
       result[5].x, result[5].y, result[5].z,
       result[4].x, result[4].y, result[4].z);
  fill(0, 0, 255, 200);
  quad(result[10].x, result[10].y, result[10].z,
       result[11].x, result[11].y, result[11].z,
       result[15].x, result[15].y, result[15].z,
       result[14].x, result[14].y, result[14].z);
  fill(0, 255, 255, 200);
  quad(result[0].x, result[0].y, result[0].z,
       result[2].x, result[2].y, result[2].z,
       result[6].x, result[6].y, result[6].z,
       result[4].x, result[4].y, result[4].z);
  fill(255, 0, 255, 200);
  quad(result[9].x, result[9].y, result[9].z,
       result[11].x, result[11].y, result[11].z,
       result[15].x, result[15].y, result[15].z,
       result[13].x, result[13].y, result[13].z);
  fill(255, 255, 255, 200);
  quad(result[0].x, result[0].y, result[0].z,
       result[1].x, result[1].y, result[1].z,
       result[9].x, result[9].y, result[9].z,
       result[8].x, result[8].y, result[8].z);
  fill(0, 0, 0, 200);
  quad(result[6].x, result[6].y, result[6].z,
       result[7].x, result[7].y, result[7].z,
       result[15].x, result[15].y, result[15].z,
       result[14].x, result[14].y, result[14].z);
  fill(255, 69, 0, 200);
  quad(result[0].x, result[0].y, result[0].z,
       result[2].x, result[2].y, result[2].z,
       result[10].x, result[10].y, result[10].z,
       result[8].x, result[8].y, result[8].z);
  fill(192, 192, 192, 200);
  quad(result[5].x, result[5].y, result[5].z,
       result[7].x, result[7].y, result[7].z,
       result[15].x, result[15].y, result[15].z,
       result[13].x, result[13].y, result[13].z);
  fill(128, 128, 128, 200);
  quad(result[0].x, result[0].y, result[0].z,
       result[4].x, result[4].y, result[4].z,
       result[12].x, result[12].y, result[12].z,
       result[8].x, result[8].y, result[8].z);
  fill(128, 0, 0, 200);
  quad(result[3].x, result[3].y, result[3].z,
       result[7].x, result[7].y, result[7].z,
       result[15].x, result[15].y, result[15].z,
       result[11].x, result[11].y, result[11].z);
  fill(128, 128, 0, 200);
  quad(result[4].x, result[4].y, result[4].z,
       result[5].x, result[5].y, result[5].z,
       result[7].x, result[7].y, result[7].z,
       result[6].x, result[6].y, result[6].z);
  fill(0, 128, 0, 200);
  quad(result[8].x, result[8].y, result[8].z,
       result[9].x, result[9].y, result[9].z,
       result[11].x, result[11].y, result[11].z,
       result[10].x, result[10].y, result[10].z);
  fill(128, 0, 128, 200);
  quad(result[2].x, result[2].y, result[2].z,
       result[3].x, result[3].y, result[3].z,
       result[7].x, result[7].y, result[7].z,
       result[6].x, result[6].y, result[6].z);
  fill(0, 128, 128, 200);
  quad(result[8].x, result[8].y, result[8].z,
       result[9].x, result[9].y, result[9].z,
       result[13].x, result[13].y, result[13].z,
       result[12].x, result[12].y, result[12].z);
  fill(0, 0, 128, 200);
  quad(result[1].x, result[1].y, result[1].z,
       result[3].x, result[3].y, result[3].z,
       result[7].x, result[7].y, result[7].z,
       result[5].x, result[5].y, result[5].z);
  fill(178, 34, 34, 200);
  quad(result[8].x, result[8].y, result[8].z,
       result[10].x, result[10].y, result[10].z,
       result[14].x, result[14].y, result[14].z,
       result[12].x, result[12].y, result[12].z);
  fill(238, 232, 170, 200);
  quad(result[2].x, result[2].y, result[2].z,
       result[3].x, result[3].y, result[3].z,
       result[11].x, result[11].y, result[11].z,
       result[10].x, result[10].y, result[10].z);
  fill(250, 128, 114, 200);
  quad(result[4].x, result[4].y, result[4].z,
       result[5].x, result[5].y, result[5].z,
       result[13].x, result[13].y, result[13].z,
       result[12].x, result[12].y, result[12].z);
  fill(127, 255, 212, 200);
  quad(result[1].x, result[1].y, result[1].z,
       result[3].x, result[3].y, result[3].z,
       result[11].x, result[11].y, result[11].z,
       result[9].x, result[9].y, result[9].z);
  fill(75, 0, 130, 200);
  quad(result[4].x, result[4].y, result[4].z,
       result[6].x, result[6].y, result[6].z,
       result[14].x, result[14].y, result[14].z,
       result[12].x, result[12].y, result[12].z);
  fill(188, 143, 143, 200);
  quad(result[1].x, result[1].y, result[1].z,
       result[5].x, result[5].y, result[5].z,
       result[13].x, result[13].y, result[13].z,
       result[9].x, result[9].y, result[9].z);
  fill(230, 230, 250, 200);
  quad(result[2].x, result[2].y, result[2].z,
       result[6].x, result[6].y, result[6].z,
       result[14].x, result[14].y, result[14].z,
       result[10].x, result[10].y, result[10].z);


  ang += step;
  if (ang > angf){noLoop()}
}
