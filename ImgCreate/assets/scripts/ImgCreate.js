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

function mountain(){
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

function draw(){
	mountain();
}

function mouseClicked(){save(fName+".png");}