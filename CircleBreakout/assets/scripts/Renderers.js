class Renderers{
	static create_paddle_render(render_info){
		let paddle_btm = render_info.h<<1;
		let paddle = createGraphics(render_info.w, paddle_btm);
		paddle.colorMode(HSB, TAU, 1.0, 1.0, 1.0);
		
		let laser_width = render_info.w * 0.025;
		let laser_offset = render_info.w * 0.1;
		let left_laser = laser_offset;
		let right_laser = render_info.w - laser_offset;
		
		paddle.noStroke();
		paddle.background(render_info.paddle_colour);
		paddle.stroke(render_info.laser_colour);
		paddle.strokeWeight(laser_width);
		paddle.strokeCap(SQUARE);
		paddle.line(left_laser, render_info.h, left_laser, paddle_btm);
		paddle.line(right_laser, render_info.h, right_laser, paddle_btm);
		
		return paddle;
	}
	static create_ball_render(render_info){
		let ball_diameter = render_info.r*2;
		let sheet_length = ball_diameter * render_info.ball_layers.length;
		let ball = createGraphics(sheet_length, ball_diameter);
		ball.colorMode(HSB, TAU, 1.0, 1.0, 1.0);
		ball.ellipseMode(RADIUS);
		ball.noStroke();
		for(let layer_index = 0; layer_index < render_info.ball_layers.length; ++layer_index){
			ball.fill(render_info.ball_layers[layer_index]);
			ball.ellipse(render_info.r + ball_diameter*layer_index, render_info.r, render_info.r, render_info.r);
		}
		return ball;
	}
	static create_powerup_render(render_info){
		let powerup = createGraphics(render_info.w, render_info.h);
		powerup.colorMode(HSB, TAU, 1.0, 1.0, 1.0);
		powerup.textFont("Courier New");
		powerup.background(render_info.fc);
		powerup.noFill();
		powerup.strokeWeight(Math.floor(render_info.h*0.1));
		powerup.stroke(render_info.bc);
		powerup.rect(0, 0, render_info.w, render_info.h);
		powerup.textAlign(CENTER, CENTER);
		powerup.textSize(render_info.txtsz);
		powerup.strokeWeight(1);
		powerup.fill(render_info.bc);
		powerup.text(render_info.lbl, render_info.w>>1, render_info.h>>1);
		
		return powerup;
	}
	static generate_tilemap(tile_info, render_info){
		let num_cols = Object.keys(render_info).length;
		let num_rows = Object.keys(render_info.fills).length;
		let total_tile_width = tile_info.ref_width * num_cols;
		let total_tile_height = tile_info.h * num_rows;
		
		let tilemap = createGraphics(total_tile_width, total_tile_height);
		tilemap.colorMode(HSB, TAU, 1.0, 1.0, 1.0);
		
		let tilepoints = {};
		
		for(let c = 0; c < num_cols; ++c){
			let ck = c === 0 ? "front" : "back";
			for(let r = 0; r < num_rows; ++r){
				let type_index = Object.keys(render_info.fills)[r];
				tilemap.strokeWeight(1);
				tilemap.fill(render_info.fills[type_index][ck]);
				tilemap.stroke(render_info.outlines[type_index][ck]);
				if(tilepoints[type_index] === null || tilepoints[type_index] === undefined) {tilepoints[type_index] = {}}
				if(tilepoints[type_index][ck] === null || tilepoints[type_index][ck] === undefined){tilepoints[type_index][ck] = {}}
				tilepoints[type_index][ck]['x'] = c*tile_info.ref_width;
				tilepoints[type_index][ck]['y'] = r*tile_info.h;
				tilepoints[type_index][ck]['w'] = tile_info.ref_width;
				tilepoints[type_index][ck]['h'] = tile_info.h;
				tilemap.rect(c*tile_info.ref_width, r*tile_info.h, tile_info.ref_width-1, tile_info.h-1);
			}
		}
		return {map: tilemap, points: tilepoints};
	}
}