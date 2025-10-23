class Laser extends GameObject{
	constructor(laser_data){
		super("Laser", "LASER");
		this.l = laser_data.len;
		this.b = this.y + this.l;
		this.vel = laser_data.vel; //tunneling through tiles now...
		this.cur_layer = laser_data.layr;
		this.is_active = laser_data.active;
		this.damage = laser_data.damage;
		
		this.colour = laser_data.colour;
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
	deploy(pos, _layer){
		this.x = pos.x; this.y = pos.y; this.is_active = true;
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