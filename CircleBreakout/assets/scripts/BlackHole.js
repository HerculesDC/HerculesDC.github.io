class BlackHole extends GameObject{
	constructor(game_data, render_info){
		super("Black Hole", "BLACKHOLE");
		this.radius = 64; //game_data.BHRadius
		this.diameter = this.radius * 2;
		this.singColour = [0, 0, 0];//render_info.singularity;
		this.innerColour = [25, 25, 50, 50];//render_info.innerColour;
		
		this.img = createGraphics(this.diameter, this.diameter);
		this.img.fill(this.innerColour);
		this.img.stroke(this.singColour);
		this.img.strokeWeight(0.5);
		this.img.ellipse(this.radius, this.radius, this.diameter, this.diameter);
	}
	update(dt){}
	render(){
		image(this.img, this.x, this.y);
	}
}