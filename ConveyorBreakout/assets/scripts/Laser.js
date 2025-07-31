class Laser extends GameObject{
	constructor(_l){ //Defaulted to front layer for now. Could try and check for ball layer later
		super("Laser", "LASER");
		this.x = 0;
		this.y = 0;
		this.l = _l;
		this.b = this.y + this.l;
		this.vel = 5; //will probably have to be faster
		this.cur_layer = 0;
		this.is_active = false;
		
		this.colour = [0, 0.75, 1];
	}
	update(dt){
		if(!this.is_active) return;
		this.y -= this.vel*dt;
		this.b = this.y + this.l;
	}
	render(){
		if(!this.is_active) return;
		strokeWeight(this.l*0.1);
		strokeCap(ROUND);
		stroke(this.colour[0], this.colour[1], this.colour[2]);
		line(this.x, this.y, this.x, this.b);
	}
	deploy(_x, _y, _layer){
		this.x = _x; this.y = _y; this.is_active = true;
		this.cur_layer = _layer;
	}
	on_collision_enter(other){ //omnilaser later???
		if(this.cur_layer > 1) this.is_active = false;
		if(other.widths[this.cur_layer] === 0) return;
		this.is_active = false;
	}
	on_world_boundary_reached(){
		this.is_active = false;
	}
}