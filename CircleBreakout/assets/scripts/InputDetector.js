class InputDetector{
	static arrow_input = { //Input Data
			horizontal: 0, //left-right arrows
			vertical: 0, //up-down arrows
		}
	static wasd_input = {
			ad: 0, //A-D left-right
			ws: 0 //W-S up-down
	}
	constructor(){}
	static process_input(){
		
		//Horizontal Input (Arrows)
		if (keyIsDown(LEFT_ARROW)){ InputDetector.arrow_input.horizontal = -1; }
		if (keyIsDown(RIGHT_ARROW)){ InputDetector.arrow_input.horizontal = 1; }
		if (keyIsDown(LEFT_ARROW) && keyIsDown(RIGHT_ARROW)|| 
			!keyIsDown(LEFT_ARROW) && !keyIsDown(RIGHT_ARROW)){ InputDetector.arrow_input.horizontal = 0; }
		
		//Vertical input (Arrows)
		if (keyIsDown(UP_ARROW)){ InputDetector.arrow_input.vertical = -1; }
		if (keyIsDown(DOWN_ARROW)){ InputDetector.arrow_input.vertical = 1; }
		if (keyIsDown(UP_ARROW) && keyIsDown(DOWN_ARROW)|| 
			!keyIsDown(UP_ARROW) && !keyIsDown(DOWN_ARROW)){ InputDetector.arrow_input.vertical = 0; }
		
		//WASD
		//65: A, 68: D
		if (keyIsDown(65)){ InputDetector.wasd_input.ad = -1; }
		if (keyIsDown(68)){ InputDetector.wasd_input.ad = 1; }
		if (keyIsDown(65) && keyIsDown(68)|| 
			!keyIsDown(65) && !keyIsDown(68)){ InputDetector.wasd_input.ad = 0; }
		
		//83: S (down), 87: W(up)
		if (keyIsDown(87)){ InputDetector.wasd_input.ws = -1; }
		if (keyIsDown(83)){ InputDetector.wasd_input.ws = 1; }
		if (keyIsDown(87) && keyIsDown(83)|| 
			!keyIsDown(83) && !keyIsDown(83)){ InputDetector.wasd_input.ws = 0; }
	}
}

function keyReleased(e){
	switch(keyCode){
		case 13: //has to reset powerups as well
			// if(end_condition){
				// for(const tile of PhysicsSystem.tiles){ tile.is_active = true; }
				// for(const pw of PhysicsSystem.powerups){ pw.reset_state(); }
				// pd.reset_state();
				// pd.reset_lives();
				// ball.reset_state();
				// conv.reset_state();
				// PowerupManager.shuffle_powerups();
			// }
			break;
		case 32:
			let gomap = GameObjectRegistry.GOMap;
			let pd = gomap.get("PADDLE")[0];
			let ball = gomap.get("BALL")[0];
			if(pd.lives > 0){
				if(ball.is_parented){
					ball.launch();
				}
				if(!ball.is_parented && pd.laser_enabled){
					// if(!laser.is_active){
						// laser.deploy(pd.deploy_laser(), ball.get_laser_layer());
					// }
				}
			}
			break;
		default: break;
	}
}

// function mouseClicked(){
	// for(var i = 0; i < cs.tiles.length; ++i){
		// if(mouseX > cs.tiles[i].ref_points[0] && mouseX < cs.tiles[i].ref_points[0] + cs.tiles[i].widths[0] &&
		   // mouseY > cs.tiles[i].y && mouseY < cs.tiles[i].b){
			// cs.tiles[i].is_active = false;
		// }
	// }
// }