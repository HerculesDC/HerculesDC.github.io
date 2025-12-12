class BlackHole extends GameObject{
	constructor(game_data, render_info){
		super("Black Hole", "BLACKHOLE");
		this.radius = game_data.radius; //game_data.BHRadius
		this.diameter = this.radius * 2;
		this.singColour = [1, 1, 1];//render_info.singularity;
		this.innerColour = [0, 0, 0, 0.2];//render_info.innerColour;
		
		PhysicsSystem.register(this);
		
		this.img = createGraphics(this.diameter, this.diameter);
		this.img.colorMode(HSB, TAU, 1.0, 1.0, 1.0);
		this.img.fill(this.innerColour);
		this.img.stroke(this.singColour);
		this.img.strokeWeight(0.5);
		this.img.ellipse(this.radius, this.radius, this.diameter, this.diameter);
		
		this.imgDiam = this.diameter;
	}
	update(dt){
		this.imgDiam = (this.imgDiam >= 0)? this.imgDiam - 1 : this.diameter;
	}
	render(){
		noFill();
		stroke(0, 0, 1);
		strokeWeight(2);
		ellipse(this.x, this.y, this.radius, this.radius);
		image(this.img, this.x, this.y);
		image(this.img, this.x, this.y, this.imgDiam, this.imgDiam);
	}
	on_ball_enter(ball){}
}