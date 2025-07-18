/*********************************************************************************
 * Powerup Management System:													 *
 * Manages powerups and their spawning (for now). Contains list of powerups and  *
 * controls which one shows up next. The idea is that there should be no powerup *
 * active more than once at the same time. This will vary in the future, but     *
 * until then, these controls are centralized here.                              *
 *********************************************************************************/
 
class PowerupManager{
	static balls = [];
	static paddles = [];
	static conveyors = [];
	static powerups = [];
	static indices = [];
	static ref_index = 0;
	constructor(){
		for(const pwd of _powerup_data){ new Powerup(pwd); }
	}
	static update(dt){
		for(const pw of PowerupManager.powerups){ pw.update(dt); }
	}
	static render(){
		for(const pw of PowerupManager.powerups){ pw.render(); }
	}
	static register(_obj){
		switch(_obj.type){
			case "BALL": 	 return PowerupManager.register_to_list(_obj, PowerupManager.balls);
			case "PADDLE": 	 return PowerupManager.register_to_list(_obj, PowerupManager.paddles);
			case "CONVEYOR": return PowerupManager.register_to_list(_obj, PowerupManager.conveyors);
			case "POWERUP":	 return PowerupManager.register_to_powerups(_obj, PowerupManager.powerups);				
			case "WORLD" : 	
				if(this.world === null){
					this.world = _obj;
					return true;
				}
				return false;
			default:		return false;
		}
	}
	static register_to_list(gameobject, list){
		for(const obj of list){
			if(gameobject.uuid === obj.uuid) return false; //alerady registered
		}
		list.push(gameobject);
		return true;
	}
	static register_to_powerups(powerup, list){
		for(const obj of list){
			if(powerup.uuid === obj.uuid) return false; //already registered
		}
		PowerupManager.indices.push(PowerupManager.indices.length);
		list.push(powerup);
		PowerupManager.shuffle_powerups();
		return true;
	}
	static request_next_powerup(requester){
		if(PowerupManager.ref_index >= PowerupManager.indices.length){
			PowerupManager.shuffle_powerups();
		}
		let pw = PowerupManager.powerups[PowerupManager.ref_index];
		if(!pw.is_active){
			pw.is_active = true;
			let x = Math.min(requester.ref_points[0], requester.ref_points[1]); //CHANGE LATER
			pw.x = x;
			pw.y = requester.y;
		}
		PowerupManager.ref_index++;
		return pw;
	}
	static shuffle_powerups(){
		// for(const current_index of PowerupManager.indices){ current_index = -1; }
		// for(let max_i = 0; max_i < PowerupManager.indices.length; ++max_i){
			// let i = parseInt(random(PowerupManager.indices.length));
			// for(let cur_i = 0; cur_i < max_i; ++cur_i){
				// //CHECK HOW TO DO THIS PROPERLY LATER
			// }
		// }
		PowerupManager.ref_index = 0;
	}
	static activate_powerup(powerup){
		switch(powerup.powerup_class){
			case "BALL":
				for(const ball of PowerupManager.balls){
					ball.activate_powerup_effect(powerup.effect);
				}
				return;
			case "PADDLE":
				for(const paddle of PowerupManager.paddles){
					paddle.activate_powerup_effect(powerup.effect);
				}
				return;
			case "CONVEYOR":
				for(const conv of PowerupManager.conveyors){
					conv.activate_powerup_effect(powerup.effect);
				}
				return;
			default: return;
		}
	}
}