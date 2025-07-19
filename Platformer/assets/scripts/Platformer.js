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

function cycle(curr, spd, low, high){
	return curr + spd - (high-low)*((curr > high)-(curr <= low));
}

class DayNightCycle{
	constructor(){
		
	}
	update(dt){}
	render(){}
}

var dn  = new DayNightCycle();

function test(){
	background(0,0,0);
	noFill();
	strokeWeight(2);
	stroke(0, 0, 1);
	beginShape();
	vertex(CANVAS_WIDTH>>1, 50);
	bezierVertex(0, CANVAS_HEIGHT, CANVAS_WIDTH, CANVAS_HEIGHT, CANVAS_WIDTH>>1, 50);
	endShape();
}

function draw(){
	// dn.update(deltaTime);
	// dn.render();
	test();
}