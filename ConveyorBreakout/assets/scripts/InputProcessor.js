class InputProcessor{
	constructor(){}
	process_input(){
		//PADLLE INPUTS
		if (keyIsDown(LEFT_ARROW)){ paddle_displacement = -1; }
		if (keyIsDown(RIGHT_ARROW)){ paddle_displacement = 1; }
		if (keyIsDown(LEFT_ARROW) && keyIsDown(RIGHT_ARROW)|| 
			!keyIsDown(LEFT_ARROW) && !keyIsDown(RIGHT_ARROW)){ paddle_displacement = 0; }
		
		//CONVEYOR INPUTS
		//65: A, 68: D
		if (keyIsDown(65)){ conveyor_displacement = -1; }
		if (keyIsDown(68)){ conveyor_displacement = 1; }
		if (keyIsDown(65) && keyIsDown(68)|| 
			!keyIsDown(65) && !keyIsDown(68)){ conveyor_displacement = 0; }
	}
}

function keyReleased(e){
	switch(keyCode){
		case 13: //has to reset powerups as well
			if(end_condition){
				for(const tile of PhysicsSystem.tiles){ tile.is_active = true; }
				for(const pw of PhysicsSystem.powerups){ pw.reset_state(); }
				pd.reset_state();
				pd.reset_lives();
				ball.reset_state();
				conv.reset_state();
				PowerupManager.shuffle_powerups();
			}
			break;
		case 32:
			if(pd.lives > 0){
				if(ball.is_parented){
					ball.launch();
				}
				if(!ball.is_parented && pd.laser_enabled){
					if(!laser.is_active){
						laser.deploy(pd.deploy_laser(), ball.get_laser_layer());
					}
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