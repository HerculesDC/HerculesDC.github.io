new p5();

const CANVAS_WIDTH = windowWidth - 20;
const CANVAS_HEIGHT = windowHeight - 85;

function setup(){
    let c = createCanvas(CANVAS_WIDTH, CANVAS_HEIGHT);
    c.position(10, 75, "float:center");
    colorMode(RGB, 255, 255, 255, 255);
    angleMode(RADIANS);
    frameRate(60);
}

//NOTE: This is relative to the calling HTML page location
var rock = loadImage("./assets/images/rock.png");
console.log(rock);

function draw(){
	background(0, 0, 1);
	image(rock, 0, 0);
	noFill();
	stroke(255, 255, 255);
	ellipse(500, 500, 50, 50);
}