new p5();

const CANVAS_WIDTH = windowWidth - 20;
const CANVAS_HEIGHT = windowHeight - 85;

function setup(){
    let c = createCanvas(CANVAS_WIDTH, CANVAS_HEIGHT);
    c.position(10, 75, "float:center");
    colorMode(HSB, TAU, 1.0, 1.0, 1.0);
    angleMode(RADIANS);
	rectMode(CENTER);
	imageMode(CENTER);
	textFont("Courier New");
	textAlign(CENTER, CENTER);
    frameRate(60);
}

//NOTE: This is relative to the calling HTML page location
//var rock = loadImage("./assets/images/rock.png");
//var nugget = loadImage("./assets/images/goldnugget.png")
var rock = loadImage("https://herculesdc.github.io/DropARock/assets/images/rock.png");
var nugget = loadImage("https://herculesdc.github.io/DropARock/assets/images/goldnugget.png")

class Rock{
	constructor(imgRock, imgNugget){
		this.rock = imgRock;
		this.nugget = imgNugget;
		this.x = CANVAS_WIDTH/2;
		this.y = -255;
		this.chance = 0.1;
		this.hasNugget = false;
		this.currentState = 0; //0 - intro, 1 - idle, 2 - falling, 3 - broken;
		this.stateFunctions = [this.intro, this.idle, this.fall, this.broken];
		this.renderFunctions = [this.renderFull, this.renderBroken];
		this.reset();
	}
	update(delta){
		//this.stateFunctions[this.currentState](delta);
		switch(this.currentState){
			case 0:
				this.y += 5;
				if(this.y >= 255){
					this.currentState = 1;
				}
				break;
			case 2:
				this.y += 12;
				if(this.y >= CANVAS_HEIGHT-255){
					this.currentState = 3;
				}
				break;
			default: break;
		}
	}
	render(){
		//let currFunc = this.currentState == 3 ? 1 : 0;
		if(this.currentState ==3){
			if(this.hasNugget){
				image(this.nugget, this.x, this.y);
			}
			image(this.rock, this.x-200, this.y, 255, 512, 0, 0, 255, 512);
			image(this.rock, this.x+200, this.y, 255, 512, 255, 0, 255, 512);
		}
		else{
			image(this.rock, this.x, this.y);
		}
		//this.renderFunctions[currFunc](this.x, this.y, this.hasNugget);
	}
	reset(){
		let prob1 = Math.random();
		let prob2 = Math.random();
		this.hasNugget = prob1 < this.chance || prob2 < this.chance;
		this.y = -255;
		let hasNugget = this.hasNugget ? "has" : "does not have";
		console.log("The current rock "+hasNugget+" a nugget.");
		this.requestStateChange(0);
	}
	requestStateChange(changeTo){
		this.currentState = changeTo;
	}
	intro(delta){
		this.y += 10;
		if(this.y >= this.rh){ this.requestStateChange(1); } 
	}
	idle(delta){
		//this.y = this.rock.height;
	}
	fall(delta){
		this.y += delta;
		if(this.y >= CANVAS_HEIGHT-this.rh){this.requestStateChange(3);}
	}
	broken(delta){
		
	}
	renderFull(x, y){
		image(this.rock, x, y);
	}
	renderBroken(x, y, nugget){
		if(nugget){
			image(this.nugget, x, y);
		}
		image(this.rock, x-200, y, 255, 512, 0, 0, 255, 512);
		image(this.rock, x+200, y, 255, 512, 255, 0, 512, 512);
	}
};

var r = new Rock(rock, nugget);

function mouseClicked(){
	switch(r.currentState){
		case 1: r.currentState = 2; break;
		case 3: r.reset(); break;
		default: break;
	}
}

function displayText(rock){
	fill(1.05, 0.5, 1.0);
	textSize(CANVAS_HEIGHT/10);
	if(rock.currentState == 1){
		text("TOUCH OR CLICK\nTO DROP ROCK", CANVAS_WIDTH/2, CANVAS_HEIGHT*(2/3));
	}
	if(rock.currentState == 3){
		let msg = rock.hasNugget?"GOOD JOB!":"BETTER LUCK NEXT TIME...";
		text(msg, CANVAS_WIDTH/2, CANVAS_HEIGHT/4);
		textSize(CANVAS_HEIGHT/20);
		text("click or touch to reset", CANVAS_WIDTH/2, CANVAS_HEIGHT*0.975);
	}
}

function draw(){
	background(0, 0, 0.23);
	r.update(1);
	r.render();
	displayText(r);
}