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
    frameRate(120);
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
		this.reset();
	}
	update(delta){
		switch(this.currentState){
			case 0:
				this.y += CANVAS_HEIGHT/2*delta;
				if(this.y >= CANVAS_HEIGHT/6){
					this.currentState = 1;
				}
				break;
			case 2:
				this.y += CANVAS_HEIGHT*delta*1.25;
				if(this.y > CANVAS_HEIGHT-255){
					this.currentState = 3;
				}
				break;
			case 3:
				this.y = CANVAS_HEIGHT - 232;
				break;
			default: break;
		}
	}
	render(){
		if(this.currentState ==3){
			if(this.hasNugget){
				image(this.nugget, this.x, this.y+100);
			}
			image(this.rock, this.x-200, this.y, 255, 512, 0, 0, 255, 512);
			image(this.rock, this.x+200, this.y, 255, 512, 255, 0, 255, 512);
		}
		else{
			image(this.rock, this.x, this.y);
		}
	}
	requestStateChange(changeTo){
		this.currentState = changeTo;
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
};

var r = new Rock(rock, nugget);

function mouseClicked(){
	switch(r.currentState){
		case 1: r.requestStateChange(2); break;
		case 3: r.reset(); break;
		default: break;
	}
}

function displayText(rock){
	fill(1.05, 0.5, 1.0);
	let lowest = Math.min(CANVAS_WIDTH, CANVAS_HEIGHT);
	textSize(lowest/10);
	if(rock.currentState == 1){
		text("TOUCH OR CLICK\nTO DROP ROCK", CANVAS_WIDTH/2, CANVAS_HEIGHT*(2/3));
	}
	if(rock.currentState == 3){
		let msg = rock.hasNugget?"GOOD JOB!":"BETTER LUCK\nNEXT TIME...";
		text(msg, CANVAS_WIDTH/2, CANVAS_HEIGHT/4);
		textSize(lowest/20);
		text("click or touch to reset", CANVAS_WIDTH/2, CANVAS_HEIGHT*0.975);
	}
}

function draw(){
	background(0, 0, 0.23);
	r.update(1/frameRate());
	r.render();
	displayText(r);
}