class Paddle extends GameObject{
	constructor(_x, _y, _w, _h, _v, _fc, _bc, _lc){
		super("Paddle", "PADDLE");
		this.x = _x;
		this.y = _y;
		this.ref_w = _w;
		this.w = _w;
		this.h = _h;
		this.hw = this.w*0.5;
		this.hh = _h/2;
		this.center = this.x + this.hw; //for collision purposes
		this.r = this.x + this.w; //right
		this.b = this.y + this.h; //bottom
		this.ref_vel = _v;
		this.vel = _v;
		//TODO: remove hardcode
		this.current_layer = 0;
		this.lives = 3;
		this.laser_enabled = false;
		//drawing
		this.colours = [_fc, _bc, _lc]; //_lc: laser colour
		this.mh = this.y + (this.hh);
		this.right = this.x + this.w;

		//Powerups
		PowerupManager.register(this);
	}
	update(dt){
		this.x += this.vel * paddle_displacement;
		this.center = this.x + this.hw;
		this.r = this.x + this.w;

	}
	render(){
		noStroke();
		let fill_colour = this.colours[this.current_layer];
		fill(fill_colour[0], fill_colour[1], fill_colour[2]);
		//ellipse(this.x, this.mh, this.h, this.h);
		rect(this.x, this.y, this.w, this.h);
		let laser_colour = this.colours[2];
		stroke(laser_colour[0], laser_colour[1], laser_colour[2], 1*this.laser_enabled);
		let laser_width = this.ref_w * 0.025;
		strokeWeight(laser_width);
		strokeCap(SQUARE);
		let laser_offset = this.ref_w*0.1; //10%
		let left_laser = this.x + laser_offset;
		let right_laser = this.r - laser_offset;
		line(left_laser, this.y, left_laser, this.y+this.h);
		line(right_laser, this.y, right_laser, this.y+this.h);
		//ellipse(this.x+this.w, this.mh, this.h, this.h);
	}
	on_world_boundary_reached(world){
		if(this.x < world.l){this.x = world.l;}
		if(this.r > world.r){this.x = world.r-this.w;}	  
	}
	on_collision_enter(other){
		switch(other.type){
			case "BALL": return;
			case "POWERUP": return;
		default: return;
		}
	}
	enlarge(){ this.change_width(1.5); }
	shrink(){ this.change_width((2/3)); }
	change_width(factor){ 
		this.w *= factor;
		this.hw = this.w/2;
		this.r = this.x + this.w;
		this.center = this.x + this.hw;
	}
	reset_width(){ this.w = this.ref_w; }
	accelerate(){ this.change_speed(1.5); }
	decelerate(){ this.change_speed((2/3)); }
	reverse(){ this.change_speed(-1); }
	change_speed(factor){ this.vel *= factor; }
	add_ball(){ this.lives++; }
	set_laser(laser_state){ this.laser_enabled = laser_state; }
	enable_laser(){ this.set_laser(true); }
	disable_laser(){ this.set_laser(false); }
	deploy_laser(){
		return {x: this.center, y: this.y}
	}
	activate_powerup_effect(effect){
		switch(effect){
			case "PaddleEnlarge": this.enlarge();		return;
			case "PaddleShrink":  this.shrink();		return;
			case "PaddleAccel":	  this.accelerate();	return;
			case "PaddleDecel":	  this.decelerate();	return;
			case "PaddleReverse": this.reverse();		return;
			case "PaddleLaser":   this.enable_laser();	return;
			case "ExtraBall":	  this.add_ball();		return;
			default: return;
		}
	}
	reset_state(){
		this.w = this.ref_w;
		this.hw = this.ref_w >> 1;
		this.x = (CANVAS_WIDTH >> 1) - this.hw;
		this.r = this.x + this.w;
		this.center = this.x + this.hw;
		this.vel = this.ref_vel;
		this.disable_laser();
	}
	reset_lives(){ this.lives = 3; }
}