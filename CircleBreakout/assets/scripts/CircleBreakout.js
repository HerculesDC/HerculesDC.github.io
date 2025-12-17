new p5();

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
	imageMode(CENTER);
	textFont("Courier New");
	textAlign(CENTER, CENTER);
}

frameRate(120);

let paddle_data = {
	dist_from_center: canvas_attr.CANVAS_SIDE/8,
	paddle_thickness: canvas_attr.CANVAS_SIDE/75,
	l: 0.5, //RADIANS, will have half-lengths of .25
	angle: -HALF_PI,
	ang_vel: 0.005,
	lives: 3,
	laser: false
}

let paddle_colours = {
	paddle_colour: game_colours.paddle.paddle_colour,
	paddle_contour: game_colours.paddle.paddle_contour,
	laser_colour: game_colours.laser.laser_colour
}

let ball_geometry = { r: 0.625*paddle_data.paddle_thickness }
let ball_game_data = { vel: 0.5,
					   ball_wrap: false,
					   ball_loop: false,
					   damage: 1
					   }
let ball_colours = game_colours.ball;

new World(canvas_attr);
new BlackHole({radius:paddle_data.dist_from_center});
new Paddle(paddle_data, paddle_colours);
new Ball(ball_geometry, ball_game_data, ball_colours, GameObjectRegistry.GOMap.get("PADDLE")[0]);
const tileNum = 36;

let h = 7
for(var j = 0; j < h; ++j){
	for(var i = 0; i < tileNum; ++i){
		new Tile({radius: 300+j*17, thickness: 15, angle:-PI+(i*TAU)/tileNum, colour: 1+j*(PI/h)})
	}	
}

function draw(){
	background(4.25, 0.15, 0.25);
	InputDetector.process_input();
	GameObjectRegistry.update(deltaTime);
	GameObjectRegistry.render();
}