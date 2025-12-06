class Paddle extends GameObject{
	constructor(game_data, render_data){
		super("Paddle", "PADDLE");
		
		//geometry. Center will be assumed to be 0, 0
		this.r = game_data.dist_from_center;
		this.t = game_data.paddle_thickness; //drawing purposes only
		
		this.ref_l = game_data.l; //reference length (of arc). Might include min/max lengths later
		this.l = this.ref_l;
		this.hl = this.ref_l/2; //half-length, for start-stop rendering functionality
		
		this.angle = game_data.angle;
		this.start_ang = this.angle - this.hl;
		this.stop_ang = this.angle + this.hl;
		
		//gameplay data
		this.ref_ang_vel = game_data.ang_vel; //reference angular velocity. Might include min/max velocities later
		this.ang_vel = game_data.ang_vel;
		this.lives = game_data.lives;
		this.laser_enabled = game_data.laser;
		
		//render data - PROCESSING
		this.paddle_colour = render_data.paddle_colour;
		this.paddle_contour = render_data.paddle_contour;
		this.laser_colour = render_data.laser_colour;
		//render data END
		
		//Gotta register with the Interface, Physics, and Powerup systems later
		//PowerupManager.register(this);
	}
	update(dt){
		
		this.angle = cycle(this.angle, this.ang_vel*dt*InputDetector.arrow_input.horizontal, 0, TAU);
		this.calculate_length_center();
	}
	render(){
		
		noFill();
		stroke(this.paddle_contour);
		strokeCap(SQUARE);
		let outlineFactor = 1.05;
		strokeWeight(this.t*outlineFactor);
		let sa = this.angle - this.hl*outlineFactor;
		let ea = this.angle + this.hl*outlineFactor;
		arc(this.x, this.y, this.r, this.r, sa, ea);
		
		stroke(this.paddle_colour);
		strokeWeight(this.t);
		arc(this.x, this.y, this.r, this.r, this.start_ang, this.stop_ang);
	}
	calculate_length_center(){
		this.start_ang = this.angle - this.hl;
		this.stop_ang = this.angle + this.hl;
	}
	on_collision_enter(other){
		switch(other.type){
			case "BALL": return;
			case "POWERUP": return;
			default: return;
		}
	}
	enlarge(){ this.change_length(1.5); }
	shrink(){ this.change_length((2/3)); }
	change_length(factor){ 
		this.length *= factor;
		this.calculate_length_center();
	}
	reset_length(){ 
		this.l = this.ref_l;
		this.calculate_length_center();
	}
	accelerate(){ this.change_speed(1.5); }
	decelerate(){ this.change_speed((2/3)); }
	reverse(){ this.change_speed(-1); }
	change_speed(factor){ this.ang_vel *= factor; }
	add_ball(){ this.lives++; }
	set_laser(laser_state){ this.laser_enabled = laser_state; }
	enable_laser(){ this.set_laser(true); }
	disable_laser(){ this.set_laser(false); }
	deploy_laser(){
		return {x: this.x+this.r*sin(this.angle), y: this.y-this.r*cos(this.angle)}
	}
	activate_powerup_effect(effect){
		switch(effect){
			// case "PaddleEnlarge": this.enlarge();		return;
			// case "PaddleShrink":  this.shrink();		return;
			// case "PaddleAccel":	  this.accelerate();	return;
			// case "PaddleDecel":	  this.decelerate();	return;
			// case "PaddleReverse": this.reverse();		return;
			// case "PaddleLaser":   this.enable_laser();	return;
			// case "ExtraBall":	  this.add_ball();		return;
			default: return;
		}
	}
	reset_state(){
		this.l = this.ref_l;
		this.calculate_width_center();
		this.ang_vel = this.ref_ang_vel;
		this.disable_laser();
	}
	reset_lives(){ this.lives = 3; }
}