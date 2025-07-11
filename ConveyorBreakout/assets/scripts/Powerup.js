class Powerup extends GameObject{
	constructor(){
		super("Powerup", "POWERUP");
		this.x = 0;
		this.y = -1*(tile_height+1);
		this.w = tile_width;
		this.r = this.x + this.w;
		this.h = tile_height;
		this.b = this.y + this.h;
		this.vel = 0.5;
		this.is_active = false;
	}
	update(dt){
		if (!this.is_active) return;
		this.y += this.vel*dt;
		this.r = this.x + this.w;
		this.b = this.y + this.h;
	}
	render(){
		if(!this.is_active) return;
		stroke(1, 1, 1);
		fill(0, 0, 0);
		rect(this.x, this.y, this.w, this.h);
	}
	reset_state(){
		this.x = 0;
		this.r = this.x + this.w;
		this.b = this.y + this.h;
		this.y = -1*(tile_height+1);
		this.is_active = false;
	}
}