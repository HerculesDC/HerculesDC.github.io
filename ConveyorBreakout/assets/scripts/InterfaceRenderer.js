class InterfaceRenderer{
	constructor(_b, _p, _c){
		this.ball = _b;
		this.paddle = _p;
		this.conveyor = _c;
		this.msgs = {
			rem_tiles: "Remaining Tiles: ",
			win: "YOU WIN!!!",
			lose: "YOU LOSE...\npress ENTER to reset",
			rem_lives: "Remaining lives: ",
			begin: "Press spacebar\nto launch ball\nA<=>D\nto move tile conveyor",
			red_ball: "RED ball in back layer"
		};
	}
	update(dt){
	
	}
	render(){
		textSize(this.conveyor.ref_width);
		noStroke();
		fill(0,0, 1);
		let active_tiles = 0;
		for(let r = 0; r < this.conveyor.tiles.length; ++r){
			active_tiles += 1 * this.conveyor.tiles[r].is_active;
		}
		text(this.msgs.rem_tiles + active_tiles.toString(), CANVAS_WIDTH>>1, this.conveyor.y - this.conveyor.ref_width/2);
		if (active_tiles === 0){
			text(this.msgs.win, CANVAS_WIDTH >> 1, CANVAS_HEIGHT >> 1);
		}
		if(this.paddle.lives === 0){
			text(this.msgs.lose, CANVAS_WIDTH >>1, CANVAS_HEIGHT >> 1);
		}
		text(this.msgs.rem_lives+this.paddle.lives.toString(), CANVAS_WIDTH * 0.45, this.paddle.b + this.conveyor.ref_width/2);
		if(this.ball.is_parented && this.paddle.lives === 3){
			text(this.msgs.begin, CANVAS_WIDTH >>1, CANVAS_HEIGHT >> 1);
			fill(0, 1, 1);
			text(this.msgs.red_ball, CANVAS_WIDTH>>1, CANVAS_HEIGHT*0.25);
		}
	}
}