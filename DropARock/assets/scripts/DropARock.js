new p5();

const CANVAS_WIDTH = windowWidth - 20;
const CANVAS_HEIGHT = windowHeight - 85;

function setup(){
    let c = createCanvas(CANVAS_WIDTH, CANVAS_HEIGHT);
    c.position(10, 75, "float:center");
    colorMode(HSB, 1.0, 1.0, 1.0, 1.0);
    angleMode(RADIANS);
	rectMode(CENTER);
	imageMode(CENTER);
    frameRate(60);
}

//NOTE: This is relative to the calling HTML page location
//var rock = loadImage("./assets/images/rock.png");
//var nugget = loadImage("./assets/images/goldnugget.png")
var rock = loadImage("https://herculesdc.github.io/DropARock/assets/images/rock.png");
var nugget = loadImage("https://herculesdc.github.io/DropARock/assets/images/goldnugget.png")

function draw(){
	background(0, 0, 0.23);
	image(rock, 0, 0);
	image(nugget, 0, 0);
}