class Tile extends GameObject{
  constructor(xt, xl, y, rw, h, _tl, _a){
	  super("Tile", "TILE");
    this.is_active = _a;
    this.ref_points = [xt, xl];
    this.trail_layer - _tl;
    this.ref_width = rw;
    this.y = y;
    this.h = h;
	this.b = this.y + this.h;
    this.widths = [0,0];
    if (xl > xt){
      this.widths = [rw,0];
    }
    else{
      this.widths = [0,rw];
    }
    this.layer_edge = [[0, 0, 1],[0, 0, 0]];
    this.layer_fill = [[3.5, 0.5, 0.75, 0.3],[0.36, 0.5, 0.75, 0.3]];
  }
  render(l){
	if(!this.is_active) return;
    if(this.widths[l] === 0) return;
    let edging = this.layer_edge[l];
    let filling = this.layer_fill[l];
    strokeWeight(1);
    stroke(edging[0], edging[1], edging[2]);
    fill(filling[0], filling[1], filling[2]);//*/, filling[3]);
    rect(this.ref_points[l], this.y, this.widths[l], this.h);
  }
  toString(){
    let _str = "Tx: " + this.ref_points[0] + ", Lx: " + this.ref_points[1] + 
        ", W0: " + this.widths[0] + ", W1: " + this.widths[1];
    return _str;
  }
}