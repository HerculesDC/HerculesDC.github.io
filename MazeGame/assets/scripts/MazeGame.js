new p5();

var CANVAS_WIDTH = 512;//Math.floor(windowWidth*0.9825);
var LPADDING = Math.floor((windowWidth-CANVAS_WIDTH)*0.3);
var CANVAS_HEIGHT = 512;//Math.floor(windowHeight*.9125);
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
	// frameRate(120);
    frameRate(1);
}

function windowResized(){
	CANVAS_WIDTH = Math.floor(windowWidth*0.9825);
	LPADDING = Math.floor((windowWidth-CANVAS_WIDTH)*0.3);
	CANVAS_HEIGHT = Math.floor(windowHeight*.9125);
	TPADDING = 75;
    let c = resizeCanvas(CANVAS_WIDTH, CANVAS_HEIGHT); 
    c.position(LPADDING, 75, "float:center");
}

class Maze{
	constructor(){
		
	}
}

function numSquare(n, cx, cy, sz){
	let hsz = sz/2;
	noFill();
	stroke(0, 0, 0);
	strokeWeight(2);
	if((n&1)===1){line(cx-hsz, cy-hsz, cx+hsz, cy-hsz);}
	if((n&2)===2){line(cx+hsz, cy-hsz, cx+hsz, cy+hsz);}
	if((n&4)===4){line(cx+hsz, cy+hsz, cx-hsz, cy+hsz);}
	if((n&8)===8){line(cx-hsz, cy+hsz, cx-hsz, cy-hsz);}
}

function printNum(n){
	noStroke();
	fill(0, 0, 0);
	textSize((CANVAS_HEIGHT>>3)-2);
	text(n, CANVAS_WIDTH>>1, CANVAS_HEIGHT >>1);
}

function cycle(curr, spd, low, high){
	return curr + spd - (high-low)*((curr + spd >= high)-(curr+spd < low));
}

let num = 0;

function draw(){
	num = cycle(num, 1, 0, 16);
	background(0, 0, 1);
	numSquare(num, CANVAS_WIDTH>>1, CANVAS_HEIGHT>>1, CANVAS_HEIGHT>>3);
	printNum(num);
	text(parseInt('0xF'), 50, 50);
}