

let grid;
let cols;
let rows;
let resolution = 15;

let blur = [
  [1/16, 1/8, 1/16],
  [1/8, 1/4, 1/8],
  [1/16, 1/8, 1/16]
];


function setup() {
  createCanvas(windowWidth, windowHeight);
  cols = floor(map(1, 0, resolution, 0, width));
  rows = floor(map(1, 0, resolution, 0, height));

  grid = make2DArray(cols, rows);
  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      grid[i][j] = floor(random(2))}}
  
  frameRate(6);

}

function draw() {
  background(0);
  
  convolution(grid);

  
  
 grid = nextGen(grid);



}


function convolution(grid){
   for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      
      let a = grid[(cols + i-1)%cols][(rows + j-1)%rows];
      let b = grid[(cols + i-1)%cols][(rows + j)%rows];
      let c = grid[(cols + i-1)%cols][(rows + j+1)%rows];
      
      let d = grid[(cols + i)%cols][(rows + j-1)%rows];
      let e = grid[i][j];
      let f = grid[(cols + i)%cols][(rows + j+1)%rows];
      
      let g = grid[(cols + i+1)%cols][(rows + j-1)%rows];
      let h = grid[(cols + i+1)%cols][(rows + j)%rows];
      let p = grid[(cols + i+1)%cols][(rows + j+1)%rows];
      
      let seleGrid = [
        [a, b, c],
        [d, e, f],
        [g, h, p]
      ]
      
      val = 0;
      for (let m=0; m<blur.length; m++){
        for (let n=0; n<blur.length; n++){
          val += seleGrid[m][n] * blur[m][n];
        }
      }
      
      
      bgt = map(val, 0, 1, 0, 255);
      stroke(0);
      fill(bgt/5, bgt/2, bgt/5);
      rect(i * resolution, j * resolution, resolution -1, resolution -1);
      
    }
  }
}




function nextGen(grid){
    let next = make2DArray(cols, rows);
    for (let i = 0; i < cols; i++) {
      for (let j = 0; j < rows; j++) {
        let state = grid[i][j];
      
        
        let neighbors = countNeighbors(grid, i, j);

        if (state == 0 && neighbors == 3) {next[i][j] = 1}
        else if (state == 1 && (neighbors < 2 || neighbors > 3)) {next[i][j] = 0}
        else{next[i][j] = state}
      }
    }
  return next;
}


function countNeighbors(grid, x, y) {
  let sum = 0;
  for (let i = -1; i < 2; i++) {
    for (let j = -1; j < 2; j++) {
      let col = (x + i + cols) % cols;
      let row = (y + j + rows) % rows;
      sum += grid[col][row];
    }
  }
  sum -= grid[x][y];
  return sum;
}


function make2DArray(cols, rows) {
  let arr = new Array(cols);
  for (let i = 0; i < arr.length; i++) {
    arr[i] = new Array(rows)}
  return arr;
}