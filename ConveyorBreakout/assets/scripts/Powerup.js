class Powerup extends GameObject{
	constructor(powerup_data){
		super("Powerup", "POWERUP");
		this.x = 0;
		this.y = -1*(tile_height+1);
		this.w = tile_width;
		this.hw = this.w>>1;
		this.cx = this.x + this.hw;
		this.r = this.x + this.w;
		this.h = tile_height;
		this.hh = this.h >> 1;
		this.cy = this.y + this.hh;
		this.b = this.y + this.h;
		this.vel = 0.25;
		this.is_active = false;
		
		//rendering
		this.bc = powerup_data.bc;
		this.fc = powerup_data.fc;
		this.txtsz = this.h - 4;//remove hardcode later
		this.lbl = powerup_data.lbl;
		
		//Powerup manager
		this.powerup_class = powerup_data._class;
		this.effect = powerup_data.effect;
		PowerupManager.register(this);
	}
	update(dt){
		if (!this.is_active) return;
		this.y += this.vel * dt;
		this.cy = this.y + this.hh;
		this.cx = this.x + this.hw; //has to account for world boundaries later
		this.r = this.x + this.w;
		this.b = this.y + this.h;
	}
	render(){
		if(!this.is_active) return;
		strokeWeight(2);
		stroke(this.bc[0], this.bc[1], this.bc[2]);
		fill(this.fc[0], this.fc[1], this.fc[2]);
		rect(this.x, this.y, this.w, this.h);
		textAlign(CENTER, CENTER);
		textSize(this.txtsz);
		fill(this.bc[0], this.bc[1], this.bc[2]);
		text(this.lbl, this.cx, this.cy);
		
	}
	on_world_boundary_reached(world){ this.reset_state(); }
	on_collision_enter(other){
		if(other.type === "PADDLE"){
			PowerupManager.activate_powerup(this);
			this.reset_state();
		}
	}
	reset_state(){
		this.x = 0;
		this.r = this.x + this.w;
		this.b = this.y + this.h;
		this.y = -1*(this.h+1);
		this.is_active = false;
	}
}