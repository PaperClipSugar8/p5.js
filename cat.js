
const HEI = 650;

const {VerletPhysics2D, VerletParticle2D, VerletSpring2D} = toxi.physics2d;
const {GravityBehavior} = toxi.physics2d.behaviors;
const {Vec2D, Rect} = toxi.geom;


const a = [-2, -2.08, -2, -1.82, -1.6, -1.4, -1, -0.4, 0, 0.25, 0.4, 0.32, 0.5, 0.8, 0.8, 0.6, 0.2,
    0.11, 0.04, -0.1, 0, -0.1, -0.25, -0.4, -0.65, -0.4, -0.2, -0.03, -0.06, -0.2, -0.4, -0.6,
    -0.8, -0.95, -1.2, -1.36, -1.4, -1.58, -1.56, -1.8];
    const b = [0, -0.5, -1, -1.3, -1.55, -1.68, -1.87, -2.03, -2.1, -2.1, -2, -1.75, -1.42, -1.35,
    -1.2, -0.95, -0.4, -0.15, 0.2, 0.45, 0.6, 0.7, 0.6, 0.68, 0.75, 0.92, 1, 1.1, 1.22, 1.24,
    1.2, 1.11, 0.96, 0.78, 0.73, 0.65, 0.82, 0.8, 0.6, 0.38];
    
    
const control = [[-1.752, -0.84], [-0.892, 0.304], // body
                [-0.416, -1.11], [-0.985, -0.39], // body
                [0.31, -1.05], [-0.02, -1.62], // eyes 4 and 5
                [-0.29, -2.256],[-0.52, -2.142], // outer hair
                [0.606, -0.56], [0.753, -0.667],// outer hair
                [-0.16, -1.945], [-0.29, -1.88],// inner hair
                [0.473, -0.755], [0.58, -0.86]];// inner hair
    


const k = 0.001;
const scl = 140;
let physics;       
let pair, con;   
let h1, h2; 
let time;
                
var cat = (w) => {

    function upda(){
        if (w.mouseIsPressed && w.mouseY < w.height){
            time = 0;
        
            let mao = w.createVector(w.mouseX, w.mouseY);
            let det = [
                [p5.Vector.sub(mao, w.createVector(con[0].x, con[0].y)).mag(), con[0]],
                [p5.Vector.sub(mao, w.createVector(con[1].x, con[1].y)).mag(), con[1]],
                [p5.Vector.sub(mao, w.createVector(con[2].x, con[2].y)).mag(), con[2]],
                [p5.Vector.sub(mao, w.createVector(con[3].x, con[3].y)).mag(), con[3]]
            ]
            let min = Infinity;
            let drag = con[0];
            for (let i = 0; i < det.length; i++) {
                if (det[i][0] < min) {
                min = det[i][0];  drag = det[i][1];
            }
            }
        
            drag.lock();
            drag.x = w.mouseX / scl;
            drag.y = w.mouseY / scl;
            drag.unlock();
        
            }
    }

    w.setup = () => {
        let can = w.createCanvas(w.windowWidth, HEI);

        time = 0;
        w.frameRate(30);
        
        physics = new VerletPhysics2D();
        physics.setWorldBounds(new Rect(0, 0, w.width/scl, w.height/scl));
          
        //physics.addBehavior(new GravityBehavior(new Vec2D(0, 0.001)))
        
        pair = a.map((e, i) => {return new VerletParticle2D(e + 3, b[i] + 3)});
        pair.forEach(p => {physics.addParticle(p)});
        
        con = control.map((e) => {return new VerletParticle2D(e[0]+3, e[1]+3)})
        con.forEach(p => {physics.addParticle(p)});
        
        for (let i=0; i<pair.length; i++){
            for (let j=0; j<pair.length; j++){
              dif = p5.Vector.sub(w.createVector(pair[i].x, pair[i].y),
                                w.createVector(pair[j].x, pair[j].y));
              physics.addSpring(new VerletSpring2D(pair[i],pair[j], dif.mag(), k));
            }
            for (let h=0; h<con.length; h++){
              dif = p5.Vector.sub(w.createVector(pair[i].x, pair[i].y),
                                w.createVector(con[h].x, con[h].y));
              physics.addSpring(new VerletSpring2D(pair[i],con[h], dif.mag(), k));
            }  
        }

    }

    w.draw = () => {
        w.background(194, 211, 246);
  
        w.stroke(255);
        w.strokeWeight(3);
        w.noFill();

        w.beginShape();
        for (let i=0; i<pair.length; i++){
            let anp1 = w.createVector(scl*pair[i].x, scl*pair[i].y);
            w.curveVertex(anp1.x, anp1.y);
        }
        w.endShape(w.CLOSE);

        w.push();
        w.fill(0);
        w.strokeWeight(5);
        if (time < 10){
            w.circle(scl*con[4].x, scl*con[4].y, 5);
            w.circle(scl*con[5].x, scl*con[5].y, 5);
        }
        else{
            w.line(scl*con[4].x-5,scl*con[4].y-5,scl*con[4].x+5,scl*con[4].y+5);
            w.line(scl*con[4].x+5,scl*con[4].y-5,scl*con[4].x-5,scl*con[4].y+5);
    
            w.line(scl*con[5].x-5,scl*con[5].y-5,scl*con[5].x+5,scl*con[5].y+5);
            w.line(scl*con[5].x+5,scl*con[5].y-5,scl*con[5].x-5,scl*con[5].y+5);
        }
        w.line(scl*con[6].x, scl*con[6].y, scl*con[10].x, scl*con[10].y);
        w.line(scl*con[7].x, scl*con[7].y, scl*con[11].x, scl*con[11].y);
        w.line(scl*con[8].x, scl*con[8].y, scl*con[12].x, scl*con[12].y);
        w.line(scl*con[9].x, scl*con[9].y, scl*con[13].x, scl*con[13].y);
        w.pop();
  
        upda();

        time += 1 / w.frameRate();
        if (time < 12){
            physics.update();
        }

    }
}


new p5(cat, 'cat');