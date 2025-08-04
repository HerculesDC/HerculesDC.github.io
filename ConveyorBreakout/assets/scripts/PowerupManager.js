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
	static powerups = new Map();
	static names = [];
	static ref_index = 0;
	constructor(){}
	static build_powerups(geometry_data, game_data){
		for(const pwd of _powerup_data){ new Powerup(geometry_data, game_data, pwd); }
	}
	static update(dt){
		for(const pw of PowerupManager.powerups.keys()){ PowerupManager.powerups.get(pw).update(dt); }
	}
	static render(){
		for(const pw of PowerupManager.powerups.keys()){ PowerupManager.powerups.get(pw).render(); }
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
	static register_to_powerups(powerup, map){
		for(const key of map.keys()){
			if(powerup.effect === key) return false; //already registered
		}
		map.set(powerup.effect, powerup);
		PowerupManager.names.push(powerup.effect);
		PowerupManager.shuffle_powerups();
		return true;
	}
	static request_powerup(requester){
		if(PowerupManager.ref_index >= PowerupManager.names.length){
			PowerupManager.shuffle_powerups();
		}
		let entry = PowerupManager.names[PowerupManager.ref_index];
		let pw = PowerupManager.powerups.get(entry);
		if(!pw.is_active){
			pw.deploy({x: Math.min(requester.ref_points[0], requester.ref_points[1]), y: requester.y});
		}
		PowerupManager.ref_index++;
		return pw;
	}
	static shuffle_powerups(){
		// GET A BETTER SHUFFLE ALGORITHM LATER. MIGHT NOT BE NECESSARY IF POWERUPS ARE FIXED
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