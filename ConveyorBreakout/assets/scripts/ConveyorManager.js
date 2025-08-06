
var test_tile_data = [{tiletype:"NULL", 	 powerup:""},
					  {tiletype:"REGULAR", 	 powerup:"BallEnlarge"},
					  {tiletype:"INVISIBLE", powerup:"ConvReverse"},
					  {tiletype:"ROCK", 	 powerup:"BallOmni"},
					  {tiletype:"REGEN", 	 powerup:"PaddleLaser"},
					  {tiletype:"IMMUNE", 	 powerup:""},]

var test_conveyor_tile_data = [test_tile_data, test_tile_data];
var test_conveyor_data = [{vel: 0.5}, {vel:-1}];
		  
class ConveyorManager{
	constructor(pos_data, tile_info, conv_tile_data, conv_gameplay_data){
		this.x = pos_data.x;
		this.y = pos_data.y;
		this.conveyors = [];
		for(let c = 0; c < test_conveyor_data.length; ++c){
			let conv_pos_data = {}
			conv_pos_data.x = pos_data.x;
			conv_pos_data.y = pos_data.y + c*tile_info.h;
			this.conveyors.push(new Conveyor(conv_pos_data, tile_info, conv_tile_data[c], conv_gameplay_data[c]));
		}
		console.log(this);
	}
	// constructor(_numRows){
		// //Can be anything, really. Will customize later
		// this.x = x_offset;
		// this.y = tile_height << 1;
		// this.tw	= tile_width;
		// this.th = tile_height;
		// this.tiles_per_row = max_tile_division;		
		// this.num_rows = _numRows;
		// this.conveyors = [];
		// this.ref_conveyor_speeds = [];
		// for(let r = 0; r < this.num_rows; ++r){
			// let half_rows = this.num_rows >>1;
			// let rv = 0.5 + 0.5*r - ((r-half_rows)*(r > half_rows));
			// this.ref_conveyor_speeds.push(rv);
			// this.conveyors.push(new Conveyor(this.x, this.y + this.th*r, this.tw, this.th, this.tiles_per_row, rv));
		// }
	// }
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