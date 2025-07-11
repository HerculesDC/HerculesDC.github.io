new p5();

var ip = new InputProcessor();
var ps = new PhysicsSystem();

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
	colorMode(HSB, TAU, 1.0, 1.0, 1.0);angleMode(RADIANS);
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

var max_tile_division = 13;
var tile_width = Math.floor(CANVAS_WIDTH / max_tile_division);
var tile_height = tile_width >> 1;
var x_offset = (CANVAS_WIDTH - (tile_width*max_tile_division))>>1;

var conveyor_displacement = 0;
var paddle_displacement = 0;

function cycle(cur, vel, low, high){
  return cur + vel +(high - low)*((cur <= low)-(cur >= high));
}

var pw = new Powerup(); //currently only observed by the physics system
var pd = new Paddle(CANVAS_WIDTH/2 - 0.75*tile_width, CANVAS_HEIGHT - 3*tile_height, 1.5*tile_width, tile_height, 2, [4, 0.5, 1],[2, 0.5, 0.5]);
var ball = new Ball(0, 0, 0.25*tile_height, [0, 0, 1], [0, 1, 0.75], 2, -2, pd);
var conv = new ConveyorManager(7);

var ir = new InterfaceRenderer(ball, pd);

var end_condition = false;

function check_end(){
	end_condition = true;
	for(const tile of PhysicsSystem.tiles){
		if(tile.is_active){
			end_condition = false;
			break;
		}
	}
	end_condition = end_condition || pd.lives === 0;
}

function draw(){
	background(4.25, 0.25, 0.25);	
	ip.process_input();
	
	//updates
	check_end();
	if(!end_condition){
		pw.update(deltaTime);
		conv.update(deltaTime);
		pd.update(deltaTime);
		ball.update(deltaTime);
		
		//physics
		PhysicsSystem.update(deltaTime);
	}
    ir.update(deltaTime);
	
    //rendering
	pd.render();
	conv.render(1);
	pw.render();
	ball.render();
	conv.render(0);
	ir.render();
}