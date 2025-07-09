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
		//if(keyIsDown(SPACEBAR)){}
	}
}