class Ball extends GameObject{
	constructor(_x, _y, _r, _flc, _blc, _omc, _mmc, _hv, _vv, _prnt){
		super("Ball", "BALL");
		this.x = _x;
		this.y = _y;
		this.ref_r = _r;
		this.r = _r; //radius
		this.sqr = this.r*this.r; //for distance & physics calcs
		this.shadeDist = this.r/2;
		this.prev_layer = 0;
		this.cur_layer = 0; //layers above 1 are powers: 2 is omni-ball, 3 is melt ball
		this.colours = [_flc, _blc, _omc, _mmc];
		this.ref_vels = [_hv, _vv];
		this.vels = [_hv, _vv];
		this.prnt = _prnt;
		this.prnt_offset = 0; //for grip
		this.is_parented = this.prnt !== null && this.prnt !== undefined;
		this.has_bounced = false;
		
		//Ball Powerup effects:
		PowerupManager.register(this);
		this.is_wrap = false;
		this.is_loop = false;
	}
	update(dt){
		if(this.is_parented){
			this.x = this.prnt.center + this.prnt_offset;
			this.y = this.prnt.y - this.r;
		}else{
			this.x += this.vels[0];
			this.y += this.vels[1];
		}
	}
	render(){
		let layer_colour = this.colours[this.cur_layer];
		noStroke();
		fill(0, 0, 0.2);
		//ellipse(this.x+ this.shadeDist, this.y+ this.shadeDist, this.r, this.r);
		fill(layer_colour[0], layer_colour[1], layer_colour[2]);
		ellipse(this.x, this.y, this.r, this.r);
	}
	reset_state(){
		this.is_parented = true;
		this.cur_layer = 0;
		this.is_loop = false;
		this.is_wrap = false;
		this.r = this.ref_r;
		this.sqr = this.r * this.r;
	}
	reparent(){ this.is_parented = true; }
	toggle_layer(){ this.cur_layer = this.cur_layer === 0 ? 1 : 0; }
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
	omni_ball(){ this.cur_layer = 2; }
	melt_ball(){ this.cur_layer = 3; }
	on_world_boundary_reached(world){
		if(this.is_wrap){
			let d = this.r * 2; //to create the illusion of out-in
			if(this.x - d > world.r){
				this.x = world.r + d;
				this.vels[0] *= -1;
				this.toggle_layer();
			}
			if(this.x + d < world.l){
				this.x = world.l - d;
				this.vels[0] *= -1;
				this.toggle_layer();
			}
			if(this.y + d < world.t){
				this.y =  world.t - d;
				this.vels[1] *= -1;
				this.toggle_layer();
			}
		}
		else if(this.is_loop){
			let d = this.r * 2; //to create the illusion of out-in
			if(this.x - d > world.r){ this.x = world.l - d; }
			if(this.x + d < world.l){ this.x = world.r + d; }
			if(this.y  < world.t){
				this.y =  world.t -1;
				this.vels[1] *= -1;
			}
		}
		else{
			if(this.x + this.r > world.r){
				this.x = world.r-this.r;
				this.vels[0] *= -1;
			}
			if(this.x - this.r < world.l){
				this.x = world.l + this.r;
				this.vels[0] *= -1;
			}
			if(this.y - this.r < world.t){
				this.y = world.t + this.r;
				this.vels[1] *= -1;
			}
		}
		if(this.y + this.r > world.b){
			this.reset_state();
			this.prnt.reset_state();
			this.prnt.lives--;//BAD BAD CODING, but this is a prototype...
		}
	}
	on_collision_enter(other){
		switch(other.type){
			case "PADDLE":
				if(this.vels[1] < 0) return; //creates pass-through effect
				this.y = other.y - this.r;
				let old_vels = this.vels;
				let ball_center_dist = this.x - other.center;
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
					if(this.has_bounced){
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