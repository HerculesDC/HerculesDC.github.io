class ConveyorManager{
	//NOTE TO SELF: WILL NEED TO REWORK CONVEYOR GAMEPLAY DATA TO INCLUDE CONVEYOR POSITIONS
	constructor(pos_data, tile_info, conv_tile_data, conv_gameplay_data){ 
		this.x = pos_data.x;
		this.y = pos_data.y;
		this.conveyors = [];
		for(let c = 0; c < test_conveyor_data.length; ++c){
			conv_gameplay_data[c].y = pos_data.y + c*tile_info.h;
			this.conveyors.push(new Conveyor(tile_info, conv_tile_data[c], conv_gameplay_data[c]));
		}
		console.log(this);
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