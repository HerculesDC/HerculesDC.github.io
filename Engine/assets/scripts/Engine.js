new p5();

var scenedata;
var scene;

function preload(){
	//loadJSON is p5's way of doing it
	window.scenedata = loadJSON("./assets/data/scenedata.json");
}

function calculateCanvasAttributes(){
	let cHeight = Math.floor(windowHeight*.9125);
	let cWidth = Math.floor(cHeight * 0.725);
	return {
		CANVAS_HEIGHT: cHeight,
		TPADDING: 75,
		CANVAS_WIDTH: cWidth,
		LPADDING: Math.floor((windowWidth-cWidth)*0.5),
		align: "float:center"
	}
}

let cattr = calculateCanvasAttributes();

function setup(){
	let c = createCanvas(cattr.CANVAS_WIDTH, cattr.CANVAS_HEIGHT /*, WEBGL*/);
	c.position(cattr.LPADDING, cattr.TPADDING, cattr.align);
	colorMode(HSB, TAU, 1.0, 1.0, 1.0);
	angleMode(RADIANS);
	rectMode(CORNER);
	ellipseMode(RADIUS);
	imageMode(CORNER);
	textFont("Courier New");
	textAlign(CENTER, CENTER);
	
	scene = SceneManager.loadScene(scenedata)
}

/******************************************************************************
 * Not sure why, but windowResize doesn't quite work. Not sure if this is 	  *
 * only on Brave, or if it happens on other browsers as well.					  *
 ******************************************************************************/

function draw(){
	scene.update(deltaTime);
	scene.render();
}