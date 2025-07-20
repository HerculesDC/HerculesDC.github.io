new p5();

const c_sz = 128;

var CANVAS_WIDTH = c_sz>>1;//Math.floor(windowWidth*0.9825);
var LPADDING = Math.floor((windowWidth-CANVAS_WIDTH)*0.3);
var CANVAS_HEIGHT = c_sz;//Math.floor(windowHeight*.9125);
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

var fName = "";

function mountains(){
	noStroke();
	fill(2.5, 0.7, 0.5);
	beginShape();
	vertex(CANVAS_WIDTH>>1, 0);
	bezierVertex(CANVAS_WIDTH*0.55,CANVAS_HEIGHT>>2,CANVAS_WIDTH*0.05,CANVAS_HEIGHT>>1,0,CANVAS_HEIGHT);
	vertex(CANVAS_WIDTH, CANVAS_HEIGHT);
	bezierVertex(CANVAS_WIDTH*0.85,CANVAS_HEIGHT*0.75,CANVAS_WIDTH*0.75,CANVAS_HEIGHT>>2,CANVAS_WIDTH>>1, 0);
	endShape(CLOSE);
	fName = "Mountain";
}

function mountain(){
	let sz = CANVAS_WIDTH<<1;
	for(let i = sz; i > 0; i-= 32){
		noStroke();
		fill(2.25, (i/sz), 1-(i/sz));
		arc(CANVAS_WIDTH>>1, 0, i,i, 0.25*PI, 0.75*PI);
	} 
}

function hill(){
	let sz = CANVAS_WIDTH;
	fill(2.25, 0.75, 0.75);
	ellipse(CANVAS_WIDTH>>1, CANVAS_HEIGHT, sz, sz);
}

function tree(){
	let cntr = CANVAS_WIDTH >> 1;
	noStroke();
	fill(0.5, 0.7, 0.8);
	rect(cntr, CANVAS_HEIGHT*0.5, cntr*0.5, CANVAS_HEIGHT*0.25);
	for(let th = CANVAS_WIDTH; th > 0; th -= 8){
		fill(2, 0.5, 0.25+(0.75*th/CANVAS_WIDTH));
		arc(cntr, 0, th*1.45, th*1.75, 0.35*PI, 0.65*PI);
	}
}

function draw(){
	tree();
}

function mouseClicked(){save(fName+".png");}