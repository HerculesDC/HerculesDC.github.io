new p5();

var ip = new InputProcessor();
var ps = new PhysicsSystem();

//REMOVE LATER!!!
var CANVAS_HEIGHT = Math.floor(windowHeight*.9125);
var TPADDING = 75;
var CANVAS_WIDTH = Math.floor(CANVAS_HEIGHT * 0.725);
var LPADDING = Math.floor((windowWidth-CANVAS_WIDTH)*0.5);
//REMOVE LATER END

function calculateCanvasAttrs(){
	let cHeight = Math.floor(windowHeight*.9125);
	let cWidth = Math.floor(cHeight * 0.725);
	return {
		CANVAS_HEIGHT: cHeight,
		TPADDING: 75,
		CANVAS_WIDTH: cWidth,
		LPADDING: Math.floor((windowWidth-cWidth)*0.5)
	}
}

var canvas_attr = calculateCanvasAttrs();

function setup() {
	let c  = createCanvas(canvas_attr.CANVAS_WIDTH, canvas_attr.CANVAS_HEIGHT);
	c.position(canvas_attr.LPADDING, 75, "float:center");
	colorMode(HSB, TAU, 1.0, 1.0, 1.0);
	angleMode(RADIANS);
	rectMode(CORNER);
	ellipseMode(RADIUS);
	imageMode(CORNER);
	textFont("Courier New");
	textAlign(CENTER, CENTER);
    frameRate(120);
}

function windowResized(){ //not working?
	let attr = calculateCanvasAttrs();
    let c = resizeCanvas(attr.CANVAS_WIDTH, attr.CANVAS_HEIGHT); 
    c.position(attr.LPADDING, 75, "float:center");
}

function calculateTileAttributes(canvasattr, maxtilediv){
	let tWidth = Math.floor(canvasattr.CANVAS_WIDTH / maxtilediv)
	return{
		tile_width: tWidth,
		tile_height: tWidth >> 1,
		x_offset: (canvasattr.CANVAS_WIDTH - (tWidth*maxtilediv)) >> 1
	}
}

var max_tile_division = 13;
let tile_attr = calculateTileAttributes(canvas_attr, max_tile_division);

//REMOVE LATER!!!
var tile_width = Math.floor(CANVAS_WIDTH / max_tile_division);
var tile_height = tile_width >> 1;
var x_offset = (CANVAS_WIDTH - (tile_width*max_tile_division))>>1;
//REMOVE LATER END

var conveyor_displacement = 0;
var paddle_displacement = 0;

//PADDLE DATA CALC & REFS
let paddle_geometry = { w: tile_attr.tile_width*1.5,
						h: tile_attr.tile_height }	
let paddle_game_data = {x: canvas_attr.CANVAS_WIDTH/2 - 0.75*tile_attr.tile_width, 
						y: canvas_attr.CANVAS_HEIGHT - 3*tile_attr.tile_height, 
						v: 1.5, lives: 3, laser: false }
let paddle_colours = {  paddle_colour: game_colours.paddle.paddle_colour,
						laser_colour: game_colours.laser.laser_colour }

//BALL DATA CALC & REFS
let ball_geometry = { r: 0.25*tile_attr.tile_height }
let ball_game_data = { hv: 0.5, vv: -0.5,
					   ball_wrap: false,
					   ball_loop: false,
					   damage: 1
					   }
let ball_colours = game_colours.ball;

//POWERUP DATA => CONTINUE FROM HERE! NEEDS GEOMETRY AND GAME DATA
let powerup_geometry = { w: tile_attr.tile_width,
						 h: tile_attr.tile_height }
let powerup_game_data = { v: 0.3 }

let laser_game_data = {
	len: tile_attr.tile_height, //laser length
	colour: game_colours.laser.laser_colour,
	vel: 5,
	layr: 0,
	active: false,
	damage: 1
}

PowerupManager.build_powerups(powerup_geometry, powerup_game_data); //reads powerup data directly

//CONVEYOR MANAGER DATA:
let cmdata = {x: tile_attr.x_offset, y: tile_attr.tile_height<<1}
let tile_attrib = {ref_width: tile_attr.tile_width, w:tile_attr.tile_width, h: tile_attr.tile_height}

var nult = {tiletype:"NULL", 	 powerup:""}
var regt = {tiletype:"REGULAR", 	 powerup:"BallEnlarge"}
var invt = {tiletype:"INVISIBLE", powerup:"ConvReverse"}
var rckt = {tiletype:"ROCK", 	 powerup:"BallOmni"}
var rgnt = {tiletype:"REGEN", 	 powerup:"PaddleLaser"}
var immt = {tiletype:"IMMUNE", 	 powerup:""}

var test_tile_data1 = [immt,regt,regt,regt,regt,regt,regt,regt,regt,regt,regt,regt,immt,immt,regt,regt,regt,regt,regt,regt,regt,regt,regt,regt,regt,immt];
var test_tile_data2 = [rckt,nult,rckt,nult,rckt,nult,rckt,nult,rckt,nult,rckt,nult,rckt,nult,rckt,nult,rckt,nult,rckt,nult,rckt,nult];
var test_tile_data3 = [invt,invt,invt,invt,invt,invt,invt,invt,invt,invt,invt,invt,invt,invt,invt,invt,invt,invt];

var test_conveyor_tile_data = [test_tile_data1, test_tile_data2, test_tile_data3];
var test_conveyor_data = [{x:tile_attr.x_offset, vel: 0.5}, {x:(tile_attr.x_offset+tile_attr.tile_width), vel:-1},{x:(tile_attr.x_offset+(2*tile_attr.tile_width)), vel:-1}];
console.log(test_conveyor_data)

var wd = new World(canvas_attr);
var pd = new Paddle(paddle_geometry, paddle_game_data, paddle_colours);
var ball = new Ball(ball_geometry, ball_game_data, ball_colours, pd);
var conv = new ConveyorManager(cmdata, tile_attrib, test_conveyor_tile_data, test_conveyor_data);

var laser = new Laser(laser_game_data);

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

let tgeom = {
	ref_points: [300, 346], y: 400, ref_width: powerup_geometry.w, h: powerup_geometry.h, _layer: 0, trail_layer: 0
}

//TILEMAP TEST
// let t = new Tile(TileManager.request_tile_info(tgeom, "REGULAR", "BallEnlarge"));
//TILEMAP TEST END

let break_unbreak = 0;
let is_broken = false;

function draw(){
	background(4.25, 0.25, 0.25);	
	ip.process_input();
	
	//updates
	check_end();
	if(!end_condition){
		PowerupManager.update(deltaTime);
		conv.update(deltaTime);
		pd.update(deltaTime);
		ball.update(deltaTime);
		laser.update(deltaTime);
		
		//physics
		PhysicsSystem.update(deltaTime);
	}
    ir.update(deltaTime);
		
	// t.render(0);
	
    //rendering
	pd.render();
	conv.render(1);
	PowerupManager.render();
	ball.render();
	conv.render(0);
	laser.render();
	ir.render();
}