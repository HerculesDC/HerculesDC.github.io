new p5();

var CANVAS_HEIGHT = Math.floor(windowHeight*.9125);
var TPADDING = 75;
var CANVAS_WIDTH = Math.floor(CANVAS_HEIGHT * 0.725);
var LPADDING = Math.floor((windowWidth-CANVAS_WIDTH)*0.5);

function calculateCanvasAttrs(){
	CANVAS_HEIGHT = Math.floor(windowHeight*.9125);
	CANVAS_WIDTH = Math.floor(CANVAS_HEIGHT * 0.725);
	LPADDING = Math.floor((windowWidth-CANVAS_WIDTH)*0.5);
}

function setup() {
	calculateCanvasAttrs();
	let c  = createCanvas(CANVAS_WIDTH, CANVAS_HEIGHT);
	c.position(LPADDING, 75, "float:center");
	colorMode(HSB, TAU, 1.0, 1.0, 1.0);
	angleMode(RADIANS);
	rectMode(CORNER);
	ellipseMode(RADIUS);
	imageMode(CORNER);
	textFont("Courier New");
	textAlign(CENTER, CENTER);
    frameRate(120);
}

function windowResized(){ //not working?
	calculateCanvasAttrs();
    let c = resizeCanvas(CANVAS_WIDTH, CANVAS_HEIGHT); 
    c.position(LPADDING, 75, "float:center");
}

function cycle(curr, spd, low, high){
	return curr + spd - (high - low) * ((curr >= high)-(curr <= low));
}

class Ball{
	constructor(){
		this.x = (CANVAS_WIDTH >> 1) + 75;
		this.y = CANVAS_HEIGHT * (2/3) - 175;
		this.a = PI/2;
		this.a_vel = 0.005;
		this.ball_size = 50;
		this.shine_size = 5;
		this.shine_offset = 25;
	}
	update(dt){
		this.a = cycle(this.a, this.a_vel*dt, 0, PI);
		this.y = CANVAS_HEIGHT*(2/3) - 200 - (Math.sin(this.a)*100);
	}
	render(){
		stroke(0, 0, 0);
		strokeWeight(1);
		fill(1.5, 1, 1);
		ellipse(this.x, this.y, this.ball_size, this.ball_size);
		noStroke();
		fill(0, 0, 1);
		ellipse(this.x + this.shine_offset, this.y - this.shine_offset, this.shine_size, this.shine_size);
	}
}

class Buns{
	constructor(){
		this.x = CANVAS_WIDTH>>1;
		this.y = CANVAS_HEIGHT * (2/3);
		this.facing = 1; //RIGHT
		this.cheek_dist = 75;
		this.cheek_size = 100;
		this.a = 0;
		this.a_vel = 0.005;
		
	}
	update(dt){
		this.a = cycle(this.a, this.a_vel*dt, 0, PI);
		this.y = CANVAS_HEIGHT*(2/3) - (Math.sin(this.a)*100);
	}
	render(){
		stroke(0, 0, 0);
		strokeWeight(0.5);
		fill(0.75, 0.80, 0.75);
		ellipse(this.x - this.cheek_dist*this.facing, this.y, this.cheek_size, this.cheek_size);
		ellipse(this.x + this.cheek_dist*this.facing, this.y, this.cheek_size, this.cheek_size);
	}
}

class Sun{
	constructor(){
		this.x = CANVAS_WIDTH;
		this.y = 0;
		this.sz = CANVAS_WIDTH >> 1;
		this.layer_amt = 20;
		this.layer_width = 5;
	}
	update(dt){}
	render(){
		for(var i = 1; i <= this.layer_amt; ++i){
			noStroke();
			fill(1, 0.75, 1, 0.1);
			ellipse(this.x, this.y, i*this.layer_amt,i*this.layer_amt);
		}
	}
}


var b = new Buns();
var bl = new Ball();
var s = new Sun();

function draw(){
	background(4, 0.65, 0.9);
	b.update(deltaTime);
	bl.update(deltaTime);
	s.render();
	b.render();
	bl.render();
}

function keyReleased(){
	switch(keyCode){
		case 37: b.facing = -1; return;
		case 39: b.facing = 1; break;
		default: return;
	}
}