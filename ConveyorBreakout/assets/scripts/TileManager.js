/*********************************************************************************
 * Tile Manager Class:															 *
 * Manages tile gameplay data. Different tiles have different colours and hit 	 *
 * points. Still deciding what that should look like...							 *
 *********************************************************************************/
 
var tile_types = {
	invisible: {tiletype: "INVISIBLE", hp: 1,  is_active: true, is_visible: false, is_regen: false, regen_time: 0},
	regular:   {tiletype: "REGULAR",   hp: 1,  is_active: true, is_visible: true,  is_regen: false, regen_time: 0},
	rock:	   {tiletype: "ROCK", 	   hp: 2,  is_active: true, is_visible: true,  is_regen: false, regen_time: 0},
	regen:	   {tiletype: "REGEN", 	   hp: 1,  is_active: true, is_visible: true,  is_regen: true,  regen_time: 5},
	immune:    {tiletype: "IMMUNE",    hp: -1, is_active: true, is_visible: true,  is_regen: false, regen_time: -1}
}

class TileManager{
	static tilesheet = null;
	static tilesheet_refpoints = {}
	static generate_tilemap(geometry_data){ //this gets colour data from global info
		let tc = game_colours.tiles;
		let sheetmap = Renderers.generate_tilemap(geometry_data, tc);
		TileManager.tilesheet = sheetmap.map;
		TileManager.tilesheet_refpoints = sheetmap.points;
	}
	static request_tile_info(geometry_data, tile_type, powerup_type = null){ //conveyor returns geometry data, tile type dictates rendering info
		if(TileManager.tilesheet === null || TileManager.tilesheet === undefined){
			TileManager.generate_tilemap(geometry_data);
		}
		let tile_info = {};
		for(const key of Object.keys(geometry_data)){
			tile_info[key] = geometry_data[key];
		}
		let tiletype = null;
		switch(tile_type){
			case "INVISIBLE":
				tiletype = tile_types.invisible; 
				tile_info.sheet_points = [TileManager.tilesheet_refpoints.invisible]; 
				break;
			case "REGULAR":
				tiletype = tile_types.regular;
				tile_info.sheet_points = [TileManager.tilesheet_refpoints.regular];
				break;
			case "ROCK":
				tiletype = tile_types.rock;
				tile_info.sheet_points = [TileManager.tilesheet_refpoints.rock_full, TileManager.tilesheet_refpoints.rock_half];
				break;
			case "REGEN":
				tiletype = tile_types.regen;
				tile_info.sheet_points = [TileManager.tilesheet_refpoints.regen];
				break;
			case "IMMUNE":
				tiletype = tile_types.immune;
				tile_info.sheet_points = [TileManager.tilesheet_refpoints.immune];
				break;
			default: break;
		}
		for(const key of Object.keys(tiletype)){
			tile_info[key] = tiletype[key];
		}
		tile_info.powerup = powerup_type;
		return tile_info;
	}
}