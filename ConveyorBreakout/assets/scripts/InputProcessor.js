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

function keyReleased(){
	//ball => SPACEBAR. Need to move somewhere else
	if(keyCode === 32){
		if(ball.is_parented && pd.lives > 0){ball.is_parented = false;}
	}
	if(keyCode === ENTER){
		if(end_condition){
			for(var t = 0; t < cs.tiles.length; ++t){
				cs.tiles[t].is_active = true;
			}
			pd.lives = 3;
			ball.cur_layer = 0;
		}
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