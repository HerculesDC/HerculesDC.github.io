class Ball{
	constructor(_x, _y, _r, _flc, _blc, _hv, _vv, _prnt){
		this.x = _x;
		this.y = _y;
		this.r = _r; //radius
		this.sqr = this.r*this.r; //for distance & physics calcs
		this.cur_layer = 0;
		this.colours = [_flc, _blc];
		this.ref_vels = [_hv, _vv];
		this.vels = [_hv, _vv];
		this.prnt = _prnt;
		this.is_parented = this.prnt !== null && this.prnt !== undefined;
	}
	update(dt){
		if(this.is_parented){
			this.x = this.prnt.center;
			this.y = this.prnt.y - this.r;
		}else{
			this.x += this.vels[0];
			this.y += this.vels[1];
		}
	}
	render(){
		let layer_colour = this.colours[this.cur_layer];
		noStroke();
		fill(layer_colour[0], layer_colour[1], layer_colour[2]);
		ellipse(this.x, this.y, this.r, this.r);
	}
	reparent(){
		this.is_parented = true;
	}
}