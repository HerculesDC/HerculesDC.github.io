class Tile extends GameObject{
	constructor(tile_data){ //factory-generated
		super("Tile", "TILE");
		//geometry and position data
		for(const key of Object.keys(tile_data)){
			this[key] = tile_data[key]
		}
		this.ref_hp = this.hp;
		this.b = this.y + this.h;
		this.widths = tile_data.ref_points[0] < tile_data.ref_points[1] ? [this.ref_width, 0] : [0, this.ref_width];
		this.has_powerup = this.powerup !== null && this.powerup !== undefined && this.powerup !== "";
	}
	render(l){
		if(!this.is_active) return;
		if(this.widths[l] === 0) return;
		if(!this.is_visible) return;
		let l_ref = l === 0 ? "front" : "back";
		let health_map = this.sheet_points.length - this.hp;
		image(TileManager.tilesheet, //source tilesheet
			  this.ref_points[l], this.y, this.widths[l], this.h, //conveyor points
			  //source points, based on health and layer
			  this.sheet_points[health_map][l_ref].x, 
			  this.sheet_points[health_map][l_ref].y, 
			  this.sheet_points[health_map][l_ref].w, 
			  this.sheet_points[health_map][l_ref].h)
	}
	reveal(){ this.is_visible = true; }
	take_damage(amt){
		this.change_health(-amt);
		this.reveal();
	}
	restore(amt){ this.change_health(amt); }
	change_health(amt){
		this.hp += amt;
		if (this.hp <= 0) {
			this.deactivate_and_deploy_powerup();
		}
	}
	deactivate_and_deploy_powerup(){
		this.is_active = false;
		if(this.has_powerup){
			PowerupManager.request_powerup(this);
		}
	}
	toString(){
	let _str = "Tx: " + this.ref_points[0] + ", Lx: " + this.ref_points[1] + 
		", W0: " + this.widths[0] + ", W1: " + this.widths[1];
	return _str;
	}
	on_collision_enter(other){
	  switch(other.type){
		  case "BALL":
			if(!this.is_active) return;
			//CHANGE INTRODUCED
			let other_layer = other.cur_layer;
			if(other.cur_layer === 2){ //2: omni-ball
				other_layer = this.widths[0] > this.widths[1] ? 0 : 1;
			}
			if(other.cur_layer === 3){ //3: melt-ball 
				other_layer = other.prev_layer;
			}
			if(this.widths[other_layer] === 0) return;
			//CHANGE INTRODUCED END
			this.take_damage(other.damage);
			return;
		case "LASER":
			if(!this.is_active) return;
			if(this.widths[other.cur_layer] === 0) return;
			this.take_damage(1);
		  default: return;
	  }
	}
}