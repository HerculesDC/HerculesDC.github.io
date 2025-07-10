class PhysicsSystem{
	constructor(){}
	check_ball_boundaries(ball){
		if(ball.x + ball.r > CANVAS_WIDTH){
			ball.x = CANVAS_WIDTH-ball.r;
			ball.vels[0] *= -1;
		}
		if(ball.x - ball.r < 0){
			ball.x = ball.r;
			ball.vels[0] *= -1;
		}
		if(ball.y - ball.r < 0){
			ball.y = ball.r;
			ball.vels[1] *= -1;
		}
		if(ball.y + ball.r > CANVAS_HEIGHT){
			ball.reparent();
			ball.prnt.lives--;//BAD BAD CODING, but this is a prototype...
		}
	}
	check_ball_paddle(ball, paddle){
		let bpx = ball.x;
		let bpy = ball.y;
		
		if(ball.x < paddle.x) 		bpx = paddle.x;
		else if(ball.x > paddle.r)	bpx = paddle.r;
		if(ball.y < paddle.y)		bpy = paddle.y;
		else if(ball.y > paddle.b)	bpy = paddle.b;
		
		let dX = ball.x - bpx;
		let dY = ball.y - bpy;
		let dist = (dX*dX) + (dY*dY);
		
		if(dist <= ball.sqr){
			ball.y = paddle.y - ball.r;
			let old_vels = ball.vels;
			let ball_center_dist = ball.x - paddle.center;
			let radius_halfside_length = ball.r + paddle.hw;
			let hor_offset = ball_center_dist/radius_halfside_length;
			ball.vels[0] = ball.ref_vels[0] * hor_offset;
			ball.vels[1] *= -1; //just bounce for test purposes
		}
	}
	check_ball_tile(ball, tile){
		if(!tile.is_active) return;
		if(tile.widths[ball.cur_layer] === 0) return; // check for omni-ball later
		
		let tile_l = tile.ref_points[ball.cur_layer];
		let tile_r = tile.ref_points[ball.cur_layer] + tile.widths[ball.cur_layer];
		
		let bpx = ball.x;
		let bpy = ball.y;
		
		if(ball.x < tile_l) 	 bpx = tile_l;
		else if(ball.x > tile_r) bpx = tile_r;
		if(ball.y < tile.y)		 bpy = tile.y;
		else if(ball.y > tile.b) bpy = tile.b;
		
		let dX = ball.x - bpx;// dX *= dX;
		let dY = ball.y - bpy;// dY *= dY;
		let dist = dX*dX + dY*dY;
		
		if(dist <= ball.sqr){
			tile.is_active = false;
			if(ball.x >= tile_l && ball.x <= tile_r){ball.vels[1] *= -1;}
			else if(ball.y >= tile.y && ball.y <= tile.b){ball.vels[0] *= -1;}
			else {ball.vels[0] *= -1; ball.vels[1] *= -1;}
			
			if(random(100) < 15){
				ball.cur_layer++;
				ball.cur_layer %= 2;
			}
		} 
	}
}
