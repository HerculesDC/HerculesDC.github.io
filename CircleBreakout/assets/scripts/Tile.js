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
		for(const key of Object.keys(tile_data)){this[key] = tile_data[key];}
		this.ref_hp = this.hp;
		this.b = this.y + this.h;
		this.widths = tile_data.ref_points[0] < tile_data.ref_points[1] ? [this.ref_width, 0] : [0, this.ref_width];
		this.has_powerup = this.powerup !== null && this.powerup !== undefined && this.powerup !== "";
		this.ref_regen = this.regen_time*1000; //milliseconds
		this.cur_regen_time = this.ref_regen;
		this.is_regen = false;
	}
	update(dt){
		if(this.tiletype === "REGEN"){
			if(this.is_regen){ this.cur_regen_time -= dt; }
			if(this.cur_regen_time <= 0){ this.regen(); }
		}
	}
	render(l){
		if(!this.is_active) return;
		if(this.widths[l] === 0) return;
		if(!this.is_visible) return;
		let l_ref = l === 0 ? "front" : "back";
		let health_map = this.sheet_points.length - this.hp;
		if(this.tiletype === "IMMUNE"){health_map = 0;}
		image(TileManager.tilesheet, //source tilesheet
			  this.ref_points[l], this.y, this.widths[l], this.h, //conveyor points
			  //source points, based on health and layer
			  this.sheet_points[health_map][l_ref].x, 
			  this.sheet_points[health_map][l_ref].y, 
			  this.sheet_points[health_map][l_ref].w, 
			  this.sheet_points[health_map][l_ref].h);
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
			let other_layer = other.cur_layer;
			if(other.cur_layer === 2){ //2: omni-ball
				other_layer = this.widths[0] > this.widths[1] ? 0 : 1;
			}
			if(other.cur_layer === 3){ //3: melt-ball 
				other_layer = other.prev_layer;
			}
			if(this.widths[other_layer] === 0) return;
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