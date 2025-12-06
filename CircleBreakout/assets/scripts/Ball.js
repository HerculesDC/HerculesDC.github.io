/*********************************************************************************
 * Ball Class:																	 *
 *  Basic Ball class. Bounces and works through some powerups					 *
 *    TODO: Check how powerups affect and interact with each other. May need to  *
 *          change some mechanics to improve gameplay							 *
 *********************************************************************************/

class Ball extends GameObject{
	constructor(ball_geometry, ball_game_data, ball_colours, _prnt){
		super("Ball", "BALL");
		//geometry
		this.ref_r = ball_geometry.r;
		this.ref_d = this.ref_r*2;
		this.r = this.ref_r;
		this.d = this.ref_d;
		this.sqr = this.r*this.r; //for distance & physics calcs
		
		//parenting
		this.prnt = _prnt;
		this.prnt_angle_offset = 0; //for grip and reflect
		this.launch_angle_offset = 0;
		do{
			this.launch_angle_offset = random(-HALF_PI, HALF_PI);
		}while(this.launch_angle_offset == 0);
		this.is_parented = this.prnt !== null && this.prnt !== undefined;
		
		//positioning: has to be parented at start
		this.angle = this.prnt.angle;
		let centerBallDist = this.prnt.r + (this.prnt.t*0.5) + this.r;
		this.x =  sin(this.prnt.angle) * centerBallDist;
		this.y = -cos(this.prnt.angle) * centerBallDist;
		
		//physics. NEEDS REWORK
		this.ref_vel = ball_game_data.vel;
		let cur_angle = this.prnt.angle + this.prnt_angle_offset + this.launch_angle_offset;
		this.vels = [this.ref_vel*cos(cur_angle), this.ref_vel*sin(cur_angle)];
		this.damage = ball_game_data.damage;
		
		//layering and powerups
		this.is_wrap = ball_game_data.ball_wrap;
		this.is_loop = ball_game_data.ball_loop;
		this.prev_layer = 0;
		this.cur_layer = 0; //layers above 1 are powers: 2 is omni-ball, 3 is melt ball
		this.has_bounced = false;
		
		let render_data = {
			r: ball_geometry.r,
			ball_layers: ball_colours.ball_layers
		}
		
		this.ball_sheet = Renderers.create_ball_render(render_data);
		
		PhysicsSystem.register(this);
		
		PowerupManager.register(this);
	}
	update(dt){
		if(this.is_parented){
			let centerBallDist = this.prnt.r + (this.prnt.t*0.5) + this.r;
			this.angle = this.prnt.angle;
			this.x = cos(this.prnt.angle) * centerBallDist;
			this.y = sin(this.prnt.angle) * centerBallDist;
		}else{
			this.angle = atan2(this.y, this.x);
			this.x += this.vels[0]*dt;
			this.y += this.vels[1]*dt;
		}
	}
	render(){
		image(this.ball_sheet, this.x, this.y, this.d, this.d, this.ref_d*this.cur_layer, 0, this.ref_d, this.ref_d);
	}
	reset_state(){
		this.is_parented = true;
		this.prnt_angle_offset = 0;
		this.launch_angle_offset = 0;
		do{
			this.launch_angle_offset = random(-HALF_PI, HALF_PI);
		}while(this.launch_angle_offset == 0);
		let cur_angle = this.prnt.angle + this.prnt_angle_offset + this.launch_angle_offset;
		this.vels = [this.ref_vel*cos(cur_angle), this.ref_vel*sin(cur_angle)];
		this.prev_layer = 0;
		this.cur_layer = 0;
		this.is_loop = false;
		this.is_wrap = false;
		this.r = this.ref_r;
		this.d = this.r*2;
		this.sqr = this.r * this.r;
	}
	launch(){ this.is_parented = false; }
	reparent(){ this.is_parented = true; }
	get_laser_layer(){ return this.cur_layer % 2; }
	store_prev_layer(){ this.prev_layer = this.cur_layer % 2; } //need a better system. Will set omniball to 0 and meltball to 1
	set_layer(_layer){ 
		this.store_prev_layer();
		this.cur_layer = _layer;
	}
	toggle_layer(){ 
		this.store_prev_layer(); 
		this.cur_layer = 1 - (this.cur_layer % 2);
	}
	toggle_wrap(){ 
		this.is_loop = false;
		this.is_wrap = !this.is_wrap;
	}
	toggle_loop(){
		this.is_wrap = false;
		this.is_loop = !this.is_loop;
	}
	change_size(size_factor){
		this.r *= size_factor;
		this.d = this.r*2;
		this.sqr = this.r*this.r;
	}
	enlarge(){ this.change_size(1.5); }
	shrink(){ this.change_size((2/3)); }
	change_velocities(factor){
		this.vels[0] *= factor;
		this.vels[1] *= factor;
	}
	accelerate(){ this.change_velocities(1.5); }
	decelerate(){ this.change_velocities((2/3)); }
	omni_ball(){ 
		this.store_prev_layer();
		this.cur_layer = 2;
		this.is_loop = false;
		this.is_wrap = false;
	}
	melt_ball(){ 
		this.store_prev_layer();
		this.cur_layer = 3;
		this.is_loop = false;
		this.is_wrap = false;
	}
	on_world_boundary_reached(world){
		//IMPLEMENTATION UNDERWAY
		let ballAngle = atan2(this.y, this.x); //angle from center to edge of world as line that passes through center of ball
		let velAngle = atan2(this.vels[1], this.vels[0]); //current angle at which the ball is actually travelling
		let angleDiff = velAngle - ballAngle;
		let newAngle = ballAngle - angleDiff;
		newAngle -= PI; //for actual reflection
		
		let sNA = sin(newAngle);
		let cNA = cos(newAngle);
		this.vels = [this.ref_vel*cNA, this.ref_vel*sNA];
		
		//NOTE: Might want to implement pixel shift to prevent jittering
	}
	on_collision_enter(other){
		switch(other.type){
			case "PADDLE":
				if(this.vels[1] < 0) return; //creates pass-through effect
				this.y = other.y - this.r;
				let old_vels = this.vels;
				let ball_center_dist = this.x - other.cx;
				let radius_halfside_length = this.r + other.hw;
				let hor_offset = ball_center_dist/radius_halfside_length;
				this.vels[0] = this.ref_vels[0] * hor_offset;
				this.vels[1] *= -1;
				return;
			case "TILE": //GETTING COMPLEX FOR OMNIBALL!!! MAY NEED SEPARATE METHODS
				if(!other.is_active) return;
				if(this.cur_layer === 3) return; //no need to check for collision if melt-ball
				//HOW TO OMNIBALL?
				let calc_layer = this.cur_layer;
				if(this.cur_layer === 2){ //OMNI-BALL CHECK
					if(this.has_bounced){ //not sure if I need this
						this.has_bounced = false;
						return;
					}
					calc_layer = other.widths[0] > other.widths[1] ? 0 : 1;
				}
				if(other.widths[calc_layer] === 0)	return;
				//OMNIBALL CHANGE END
				let tile_l = other.ref_points[calc_layer];
				let tile_r = tile_l+other.widths[calc_layer]; //here for omniball checks
				if(this.x >= tile_l && this.x <= tile_r){
					this.vels[1] *= -1;
					if(this.cur_layer === 2 && !this.has_bounced) this.has_bounced = true;
				}
				else if(this.y >= other.y && this.y <= other.b){this.vels[0] *= -1;}
				else {this.vels[0] *= -1; this.vels[1] *= -1;}
				return;
			default: return;
		}
	}
	activate_powerup_effect(effect){ //array of method pointers didn't work well for some reason
		switch(effect){
			case "BallLayer": 	this.toggle_layer(); return;
			case "BallWrap":  	this.toggle_wrap();  return;
			case "BallLoop":  	this.toggle_loop();  return;
			case "BallEnlarge": this.enlarge();		 return;
			case "BallShrink": 	this.shrink(); 		 return;
			case "BallAccel":	this.accelerate();	 return;
			case "BallDecel":	this.decelerate();	 return;
			case "BallOmni":	this.omni_ball();	 return;
			case "BallMelt":	this.melt_ball();	 return;
			default: return;
		}
	}
}