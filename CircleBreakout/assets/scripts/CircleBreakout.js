new p5();

var ip = new InputDetector();
var ps = new PhysicsSystem();

function calculateCanvasAttrs(){
	let cSide = Math.min(Math.floor(windowHeight*.9125), Math.floor(windowWidth*.9125));
	return {
		CANVAS_SIDE: cSide,
		TPADDING: 75,
		LPADDING: Math.floor((windowWidth-cSide)*0.5)
	}
}

var canvas_attr = calculateCanvasAttrs();

function setup() {
	let c  = createCanvas(canvas_attr.CANVAS_SIDE, canvas_attr.CANVAS_SIDE);
	c.position(canvas_attr.LPADDING, 75, "float:center");
	colorMode(HSB, TAU, 1.0, 1.0, 1.0);
	angleMode(RADIANS);
	rectMode(CORNER);
	ellipseMode(RADIUS);
	imageMode(CORNER);
	textFont("Courier New");
	textAlign(CENTER, CENTER);
}

frameRate(120);

function windowResized(){ //not working?
	let attr = calculateCanvasAttrs();
    let c = resizeCanvas(attr.CANVAS_SIDE, attr.CANVAS_SIDE);
    c.position(attr.LPADDING, 75, "float:center");
}

var pf = -HALF_PI; //paddle focus (angle)
var phl = 0.25; //paddle half length
var pStart = pf - phl; //paddle start angle
var pStop = pf + phl; //paddle stop angle

var av = 0.01; // angular velocity (for Paddle)
var _dist = 100; //from focus
var _focus = canvas_attr.CANVAS_SIDE/2;
var t = 0;

var bh = createGraphics(100, 100);
bh.strokeWeight(0.5);
bh.stroke(0, 0, 0);
bh.fill(50, 10, 100, 20);
bh.ellipse(50, 50, 100, 100);

let paddle_data = {
	dist_from_center: canvas_attr.CANVAS_SIDE/8,
	paddle_thickness: canvas_attr.CANVAS_SIDE/80,
	l: 0.5, //RADIANS, will have half-lengths of .25
	angle: -HALF_PI,
	ang_vel: 0.01,
	lives: 3,
	laser: false
}

let paddle_colours = {
	paddle_colour: game_colours.paddle.paddle_colour,
	paddle_contour: game_colours.paddle.paddle_contour,
	laser_colour: game_colours.laser.laser_colour
}

var world = new World(canvas_attr);
var paddle = new Paddle(paddle_data, paddle_colours);

function draw(){
	background(4.25, 0.25, 0.55);
	
	let ci = ip.process_input(); //collected input
	//id = { //Input Data
		// HorArrDirection: 0, //left-right arrows
		// VerArrDirection: 0, //up-down arrows
		// HorADDirection: 0, //A-D left-right
		// VertWSDirection: 0 //W-S up-down
	// };
	
	paddle.update(deltaTime); //rig input in a bit
	
	world.render();
	push(); //WILL NEED REVIEWING LATER
		translate(canvas_attr.CANVAS_SIDE/2, canvas_attr.CANVAS_SIDE/2);
		paddle.render();
	pop();
	image(bh, _focus-0.5*_dist, _focus-0.5*_dist);
}