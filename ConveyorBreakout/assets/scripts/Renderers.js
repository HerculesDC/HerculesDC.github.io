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
}