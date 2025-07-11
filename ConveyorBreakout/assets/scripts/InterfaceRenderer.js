class InterfaceRenderer{
	constructor(_b, _p){
		this.ball = _b;
		this.paddle = _p;
		this.msgs = {
			rem_tiles: "Remaining Tiles: ",
			win: "YOU WIN!!!\npress ENTER to reset",
			lose: "YOU LOSE...\npress ENTER to reset",
			rem_lives: "Remaining lives: ",
			begin: "Press spacebar\nto launch ball\nA<=>D\nto move tile conveyor",
			red_ball: "RED ball\nin back layer"
		};
	}
	update(dt){
	
	}
	render(){
		textSize(tile_width);
		noStroke();
		fill(0,0, 1);
		let active_tiles = 0;
		//feels cheaty, but it works
		for(let r = 0; r < PhysicsSystem.tiles.length; ++r){
			active_tiles += 1 * PhysicsSystem.tiles[r].is_active;
		}
		text(this.msgs.rem_tiles + active_tiles.toString(), CANVAS_WIDTH>>1, tile_width>>1);
		if (active_tiles === 0){
			text(this.msgs.win, CANVAS_WIDTH >> 1, CANVAS_HEIGHT >> 1);
		}
		if(this.paddle.lives === 0){
			text(this.msgs.lose, CANVAS_WIDTH >>1, CANVAS_HEIGHT >> 1);
		}
		text(this.msgs.rem_lives+this.paddle.lives.toString(), CANVAS_WIDTH * 0.45, this.paddle.b + (tile_width>>1));
		if(this.ball.is_parented && this.paddle.lives === 3 && !end_condition){
			text(this.msgs.begin, CANVAS_WIDTH >>1, CANVAS_HEIGHT >> 1);
			fill(0, 1, 1);
			text(this.msgs.red_ball, CANVAS_WIDTH>>1, CANVAS_HEIGHT*0.25);
		}
	}
}