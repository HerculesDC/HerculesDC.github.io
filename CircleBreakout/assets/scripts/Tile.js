/*********************************************************************************
 * Tile Class:																	 *
 * Considerations:															 	 *
 *  Need to fine-tune aspects of different types of tiles. Immune and regen 	 *
 *  tiles require specific tracking variables. UI and end conditions also depend *
 *  on regen and immune tiles not be taken into account. Immune balls should	 *
 *  also be destroyed by melt balls												 *
 *********************************************************************************/

class Tile extends GameObject{
	constructor(tile_data){ //factory-generated
		super("Tile", "TILE");
		
		this.r = tile_data.radius; //radius from center
		this.t = tile_data.thickness; //thickness
		this.ht = this.t/2;
		this.hl = 0.0825; //half-length, in radians => .17 for tiles
		this.angle = tile_data.angle;//-HALF_PI; //angle/position
		this.start_ang = this.angle - this.hl;
		this.stop_ang = this.angle + this.hl;
		this.ref_ang_vel = 0.0025;
		this.cur_ang_vel = 0.0025;
		
		this.hp = 1;
		this.is_active = true;
		this.tiletype = "REGULAR";
		
		// for(const key of Object.keys(tile_data)){this[key] = tile_data[key];}
		// this.ref_hp = this.hp;
		// this.b = this.y + this.h;
		// this.widths = tile_data.ref_points[0] < tile_data.ref_points[1] ? [this.ref_width, 0] : [0, this.ref_width];
		// this.has_powerup = this.powerup !== null && this.powerup !== undefined && this.powerup !== "";
		// this.ref_regen = this.regen_time*1000; //milliseconds
		// this.cur_regen_time = this.ref_regen;
		this.powerup = null;
		this.has_powerup = false;
		this.is_regen = false;
		this.colour = tile_data.colour; //just the hue for now
		
		PhysicsSystem.register(this);
	}
	update(dt){
		// if(this.tiletype === "REGEN"){
			// if(this.is_regen){ this.cur_regen_time -= dt; }
			// if(this.cur_regen_time <= 0){ this.regen(); }
		// }
		this.angle = cycle(this.angle, this.cur_ang_vel*dt*InputDetector.wasd_input.ad, -PI, PI);
		this.start_ang = this.angle - this.hl;
		this.stop_ang = this.angle + this.hl;
	}
	render(){
		if(!this.is_active) return;
		noFill();
		stroke(this.colour, 0.75, 0.75);
		strokeWeight(this.t);
		arc(0, 0, this.r, this.r, this.start_ang, this.stop_ang);
	}
	reveal(){ //breaking single responsibility. Rethink
		this.is_visible = true;
		this.score_counts = 1;
	}
	take_damage(amt){
		if(this.tiletype === "IMMUNE"){return;}
		this.change_health(-amt);
		if(this.tiletype === "INVISIBLE" && this.hp === 1){
			this.reveal();
		}
	}
	restore(amt){ this.change_health(amt); }
	change_health(amt){
		this.hp += amt;
		if (this.hp <= 0){
			this.deactivate_and_deploy_powerup();
			if(this.tiletype === "REGEN"){
				this.start_regen();
			}
		}
	}
	start_regen(){ this.is_regen = true; }
	regen(){
		this.cur_regen_time = this.ref_regen;
		this.is_regen = false;
		this.is_active = true;
		this.hp = this.ref_hp;
		console.log(this.sheet_points);
	}
	deactivate_and_deploy_powerup(){
		this.is_active = false;
		if(this.has_powerup){PowerupManager.request_powerup(this);}
	}
	reset_state(){this.hp = this.ref_hp;}
	on_collision_enter(other){
	  switch(other.type){
		  case "BALL":
			if(!this.is_active) return;
			this.take_damage(other.damage);
			break;
		case "LASER":
			if(!this.is_active) return;
			if(this.widths[other.cur_layer] === 0) return;
			this.take_damage(other.damage);
			break;
		default: return;
	  }
	}
}