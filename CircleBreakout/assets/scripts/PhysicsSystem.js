class CollisionObject{
	constructor(_colObj){
		this.collision_object = _colObj;
	}
}

class PhysicsSystem{
	static balls = [];
	static paddles = [];
	static tiles = [];
	static powerups = [];
	static lasers = [];
	static world = null;
	constructor(){}
	static check_ball_boundaries(ball){
		let bSqDist = (ball.x * ball.x) + (ball.y * ball.y);
		let wdSqRad = PhysicsSystem.world.wr * PhysicsSystem.world.wr;
		if(bSqDist >= wdSqRad){
			   ball.on_world_boundary_reached(PhysicsSystem.world);
		}
	}
	static check_ball_paddle(ball, paddle){
		
		const ballCoords = ball.get_polar_coords();
		if(ballCoords.angle >= paddle.start_ang && ballCoords.angle <= paddle.stop_ang){
			const inner = paddle.r - paddle.ht;
			const outer = paddle.r + paddle.ht;
			if(ballCoords.dist >= inner && ballCoords.dist <= outer){
				ball.on_collision_enter(paddle);
			}
		}
	}
	static check_ball_tile(ball, tile){
		if(!tile.is_active) return;
		
		const ballCoords = ball.get_polar_coords();
		if(ballCoords.angle >= tile.start_ang && ballCoords.angle <= tile.stop_ang){
			const inner = tile.r - tile.ht;
			const outer = tile.r + tile.ht;
			if(ballCoords.dist >= inner && ballCoords.dist <= outer){
				ball.on_collision_enter(tile);
				tile.on_collision_enter(ball);
			}
		}
	}
	static check_laser_boundaries(laser){
		if(laser.b < 0){
			laser.on_world_boundary_reached();
		}
	}
	static check_laser_tile(laser, tile){
		if(!tile.is_active) return;
		if(!laser.is_active) return;
		
		let ref_index = tile.widths[0] < tile.widths[1] ? 1 : 0;
		
		let tile_l = tile.ref_points[ref_index];
		let tile_r = tile.ref_points[ref_index] + tile.widths[ref_index];
		
		if(laser.x >= tile_l && 
		   laser.x <= tile_r && 
		   laser.y <= tile.b && 
		   laser.b >= tile.y){
			   laser.on_collision_enter(tile);
			   tile.on_collision_enter(laser);
		   }
	}
	static check_paddle_powerup(paddle, powerup){
		if (!powerup.is_active) return;
		//straight AABB collision
		if(paddle.r >= powerup.x && paddle.x <= powerup.r &&
		   paddle.y <= powerup.b && paddle.b >= powerup.y){
			   powerup.on_collision_enter(paddle);
			   paddle.on_collision_enter(powerup);
		   }
	}
	static check_powerup_bottom(powerup){
		if(powerup.y > PhysicsSystem.world.b){
			powerup.on_world_boundary_reached(PhysicsSystem.world);
		}
	}
	static update(dt){
		for (const bl of PhysicsSystem.balls){
			PhysicsSystem.check_ball_boundaries(bl);
			for(const tl of PhysicsSystem.tiles){ 
				PhysicsSystem.check_ball_tile(bl, tl);
				for(const ls of PhysicsSystem.lasers){
					PhysicsSystem.check_laser_tile(ls, tl);
					PhysicsSystem.check_laser_boundaries(ls);
				}
			}
			for(const pd of PhysicsSystem.paddles){
				PhysicsSystem.check_ball_paddle(bl, pd);
				for(const pw of PhysicsSystem.powerups){
					PhysicsSystem.check_paddle_powerup(pd, pw);
					PhysicsSystem.check_powerup_bottom(pw);
				}
			}
		}
	}
	static register(_obj){
		switch(_obj.type){
			case "BALL": 	return PhysicsSystem.register_to_list(_obj, PhysicsSystem.balls);
			case "PADDLE": 	return PhysicsSystem.register_to_list(_obj, PhysicsSystem.paddles);
			case "TILE":	return PhysicsSystem.register_to_list(_obj, PhysicsSystem.tiles);
			case "POWERUP":	return PhysicsSystem.register_to_list(_obj, PhysicsSystem.powerups);
			case "LASER":	return PhysicsSystem.register_to_list(_obj, PhysicsSystem.lasers);
			case "WORLD" : 	
				if(PhysicsSystem.world === null){
					PhysicsSystem.world = _obj;
					return true;
				}
				return false;
			default:		return false;
		}
	}
	static register_to_list(gameobject, list){
		for(const obj of list){
			if(gameobject.uuid === obj.uuid) return false;
		}
		list.push(gameobject);
		return true;
	}
}
