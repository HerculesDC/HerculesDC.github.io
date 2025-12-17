class Scene{
	constructor(attr){
		
		let paddle_data = {
			dist_from_center: attr.CANVAS_SIDE/8,
			paddle_thickness: attr.CANVAS_SIDE/75,
			l: 0.5, //RADIANS, will have half-lengths of .25
			angle: -HALF_PI,
			ang_vel: 0.005,
			lives: 3,
			laser: false
		}

		let paddle_colours = { //draws from globals
			paddle_colour: game_colours.paddle.paddle_colour,
			paddle_contour: game_colours.paddle.paddle_contour,
			laser_colour: game_colours.laser.laser_colour
		}

		let ball_geometry = { r: 0.625*paddle_data.paddle_thickness }
		let ball_game_data = { vel: 0.5,
							   ball_wrap: false,
							   ball_loop: false,
							   damage: 1
							   }
		let ball_colours = game_colours.ball; //from globals
		
		new World(attr);
		new BlackHole({radius:paddle_data.dist_from_center});
		new Paddle(paddle_data, paddle_colours);
		new Ball(ball_geometry, ball_game_data, ball_colours, GameObjectRegistry.GOMap.get("PADDLE")[0]);
		const tileNum = 36;

		let h = 7
		for(var j = 0; j < h; ++j){
			for(var i = 0; i < tileNum; ++i){
				new Tile({radius: 300+j*17, thickness: 15, angle:-PI+(i*TAU)/tileNum, colour: 1+j*(PI/h)})
			}	
		}
	}
	update(dt){
		GameObjectRegistry.update(dt);
	}
	render(){
		GameObjectRegistry.render();
	}
}