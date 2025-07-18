class ConveyorManager{
	constructor(_numRows){
		//Can be anything, really. Will customize later
		this.x = x_offset;
		this.y = tile_height << 1;
		this.tw	= tile_width;
		this.th = tile_height;
		this.tiles_per_row = max_tile_division;		
		this.num_rows = _numRows;
		this.conveyors = [];
		this.ref_conveyor_speeds = []
		for(let r = 0; r < this.num_rows; ++r){
			let half_rows = this.num_rows >>1;
			let rv = 0.5 + 0.5*r - ((r-half_rows)*(r > half_rows));
			this.ref_conveyor_speeds.push(rv);
			this.conveyors.push(new Conveyor(this.x, this.y + this.th*r, this.tw, this.th, this.tiles_per_row, rv));
		}
	}
	update(dt){
		for(const conv of this.conveyors){ conv.update(dt); }
	}
	render(l){
		for(const conv of this.conveyors){ conv.render(l); }
	}
	reset_state(){
		for (const conv of this.conveyors){ conv.reset_state(); }
	}
}