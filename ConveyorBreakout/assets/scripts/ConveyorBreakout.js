new p5();

var ip = new InputProcessor();

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

var cs = new ConveyorSlots(x_offset, tile_height<<1, tile_width, tile_height, max_tile_division, 1);
var pd = new Paddle(CANVAS_WIDTH/2 - 0.75*tile_width, CANVAS_HEIGHT - 3*tile_height, 1.5*tile_width, tile_height, 2, [4, 0.5, 1],[2, 0.5, 0.5]);

function draw(){
	background(4.25, 0.25, 0.25);	
	ip.process_input();
    cs.update(1);
	pd.update(1);
    cs.render();
	pd.render();
}

function mouseClicked(){
	for(var t = 0; t < cs.tiles.length; ++t){
		if(cs.tiles[t].widths[0] > 0){
			let tileLeft = cs.tiles[t].ref_points[0];
			let tileRight = tileLeft + cs.tiles[t].widths[0]
			let tileTop = cs.tiles[t].y;
			let tileBtm = tileTop + cs.tiles[t].h;
			if(mouseX >  tileLeft && mouseX < tileRight &&
			   mouseY > tileTop && mouseY < tileBtm){
				cs.tiles[t].is_active = false;
			}
		}
	}
}