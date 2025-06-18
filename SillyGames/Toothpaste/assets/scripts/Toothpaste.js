new p5();

var CANVAS_WIDTH = Math.floor(windowWidth*0.9825);
var LPADDING = Math.floor((windowWidth-CANVAS_WIDTH)*0.3);
var CANVAS_HEIGHT = Math.floor(windowHeight*.9125);
var TPADDING = 75;

function setup(){
    let c = createCanvas(CANVAS_WIDTH, CANVAS_HEIGHT);
    c.position(LPADDING, 75, "float:center");
    colorMode(HSB, TAU, 1.0, 1.0, 1.0);
    angleMode(RADIANS);
	rectMode(CENTER);
	imageMode(CENTER);
	textFont("Courier New");
	textAlign(CENTER, CENTER);
    frameRate(120);
}

function windowResized(){
	CANVAS_WIDTH = Math.floor(windowWidth*0.9825);
	LPADDING = Math.floor((windowWidth-CANVAS_WIDTH)*0.3);
	CANVAS_HEIGHT = Math.floor(windowHeight*.9125);
	TPADDING = 75;
    let c = resizeCanvas(CANVAS_WIDTH, CANVAS_HEIGHT); 
    c.position(LPADDING, 75, "float:center");
}

const G = .000981;

class Toothpaste{
	constructor(){
		this.controlPoints = 5;
		this.x = []; this.y = []; this.vvel = [];
		for(let i = 0; i < this.controlPoints; ++i){
			this.x.push(-25*i);
			this.y.push(100);
			this.vvel.push(0);
		}
		this.hvel = Math.random();
		this.state = 0;
		this.prnt = null;
		this.offsets = [];
	}
	update(dt){
		for (let c = 0;c < this.controlPoints; ++c){
			let isAir = ((this.y[0]+this.vvel[0]) < (CANVAS_HEIGHT*0.95));
			this.x[c] = this.x[c] + this.hvel*dt*isAir ;
			this.vvel[c] += G*dt*(this.x[c] > 0);
			this.y[c] += this.vvel[c]*dt*((this.y[c]+this.vvel[c])<(CANVAS_HEIGHT*0.95));
		}
	}
	render(){
		for(let lw = 0; lw < this.controlPoints; ++lw){
				noFill();
				stroke(0, 0, 1, 0.5);
				strokeWeight(20-(lw*3));
				beginShape()
				for(let dp = this.controlPoints-1; dp>=0; --dp){
					vertex(this.x[dp], this.y[dp]);
				}
				endShape();
		}
	}
	launch(){
		for(let i = 0; i < this.controlPoints; ++i){
			this.x[i] = -25*i;
			this.y[i] = 100;
			this.vvel[i] = 0;
		}
		this.hvel = Math.random();
	}
}

function cycle(cur, spd, low, high){
	return cur + spd - (high-low)*((cur >= high)-(cur <= low));
}

class Toothbrush{
	constructor(){
		this.tbx = 0; //redo
		this.tby = CANVAS_HEIGHT*.7;
		this.tbw = CANVAS_WIDTH*0.075;
		this.tbh = this.tbw*0.1;
		this.angle = 0;
		this.aSpd = 0.001;
	}
	update(dt){
		this.angle = cycle(this.angle, (this.aSpd*dt), 0, TWO_PI);
		this.tbx = CANVAS_WIDTH/2 + sin(this.angle)*CANVAS_WIDTH*0.5;
	}
	render(){
		noFill();
		stroke(0, 1, 1);
		strokeWeight(0.5);
		rect(this.tbx, this.tby, this.tbw, this.tbh);
	}
}

class FW{
	constructor(){
		this.x = CANVAS_WIDTH/2;
		this.y = CANVAS_HEIGHT;
		this.v = -0.1;
	}
	update(dt){
		this.y += this.v*dt;
	}
	render(){
		noStroke();
		fill(0, 1, 1);
		ellipse(this.x, this.y, 20, 20);
	}
}

var fworks = [];

class CollisionDetector{
	detectCollision(tb, tp){
		let tbl = tb.tbx - tb.tbw/2;
		let tbr = tbl + tb.tbw;
		let tbt = tb.tby - tb.tbh/2;
		let tbb = tbt + tb.tbh;
		
		for(let i = 0; i < tp.x.length; ++i){
			if( tp.x[i] > tbl && tp.x[i] < tbr){
				if((tp.y[i] > tbt && tp.y[i] < tbb) || 
				   (tp.y[i] > tbt && tp.y[i+1] < tbb)){
					   tp.prnt = tb;
					fworks.push(new FW());
				}
			}
		}
	}
}
var cl = new CollisionDetector();

var tp = new Toothpaste();
var tb = new Toothbrush();

function mouseClicked(){
	tp.launch();
}

function draw(){
	background(0, 0, 0);
	tb.update(deltaTime);
	tp.update(deltaTime);
	
	cl.detectCollision(tb, tp);
	
	for(var f = 0; f < fworks.length; ++f){
		fworks[f].update(deltaTime);
		fworks[f].render();
	}
	
	tb.render();
	tp.render();
	
}