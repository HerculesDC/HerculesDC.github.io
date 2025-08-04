class Paddle extends GameObject{
	constructor(geometry_data, game_data, render_data){
		super("Paddle", "PADDLE");
		//geometry
		this.ref_w = geometry_data.w;
		this.w = geometry_data.w;
		this.hw = geometry_data.w*0.5;
		this.h = geometry_data.h;
		this.hh = geometry_data.h*0.5;
		
		//position: physics-related
		this.x = game_data.x;
		this.cx = this.x + this.hw; //center-x
		this.r = this.x + this.w; //right
		
		this.y = game_data.y;
		this.b = this.y + this.h; //bottom
		
		//gameplay data
		this.ref_vel = game_data.v;
		this.vel = game_data.v;
		this.lives = game_data.lives;
		this.laser_enabled = game_data.laser;
		
		//render data - PROCESSING
		let renderdata = {
			w: geometry_data.w,
			h: geometry_data.h,
			paddle_colour: render_data.paddle_colour,
			laser_colour: render_data.laser_colour
		}
		this.sheet = Renderers.create_paddle_render(renderdata);
		//render data END
		
		PowerupManager.register(this);
	}
	update(dt){
		this.x += this.vel * dt * paddle_displacement;
		this.calculate_width_center();
	}
	render(){
		//source, destX, destY, destW, destH, srcX, srcY*, srcW, srcH	
		image(this.sheet, this.x, this.y, this.w, this.h, 0, this.h*this.laser_enabled, this.w, this.h);
	}
	calculate_width_center(){
		this.hw = this.w/2;
		this.cx = this.x + this.hw;
		this.r = this.x + this.w;
	}
	on_world_boundary_reached(world){
		if(this.x < world.l){ this.x = world.l; }
		if(this.r > world.r){ this.x = world.r-this.w; }	  
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
		this.calculate_width_center();
	}
	reset_width(){ 
		this.w = this.ref_w;
		this.calculate_width_center();
	}
	accelerate(){ this.change_speed(1.5); }
	decelerate(){ this.change_speed((2/3)); }
	reverse(){ this.change_speed(-1); }
	change_speed(factor){ this.vel *= factor; }
	add_ball(){ this.lives++; }
	set_laser(laser_state){ this.laser_enabled = laser_state; }
	enable_laser(){ this.set_laser(true); }
	disable_laser(){ this.set_laser(false); }
	deploy_laser(){
		return {x: this.cx, y: this.y}
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
		this.x = (canvas_attr.CANVAS_WIDTH >> 1) - this.hw; //NEEDS REFACTOR LATER
		this.calculate_width_center();
		this.vel = this.ref_vel;
		this.disable_laser();
	}
	reset_lives(){ this.lives = 3; }
}