class Powerup extends GameObject{
	constructor(geometry_data, game_data, powerup_data){
		super("Powerup", "POWERUP");
		
		//geometry
		this.w = geometry_data.w;
		this.h = geometry_data.h;
		this.hw = this.w/2;
		this.hh = this.h/2;
		
		//positioning
		this.x = 0;
		this.y = -1*(this.h+1);
		this.cx = this.x + this.hw;
		this.r = this.x + this.w;
		this.cy = this.y + this.hh;
		this.b = this.y + this.h;
		
		this.vel = game_data.v;
		this.is_active = false;
		
		//rendering
		let render_info = {
			w: this.w,
			h: this.h,
			txtsz: Math.floor(this.h*0.8),
			bc: powerup_data.bc,
			fc: powerup_data.fc,
			lbl: powerup_data.lbl,
		}
		
		this.sheet = Renderers.create_powerup_render(render_info);
		
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
		image(this.sheet, this.x, this.y);
	}
	deploy(pos){
		this.x = pos.x; this.y = pos.y
		this.is_active = true;
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