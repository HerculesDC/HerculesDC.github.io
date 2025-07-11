function calculate_tile_widths(t, c){
  if(t.ref_points[0] + t.ref_width > c.r && t.trail_layer ===0){
    let width_offset = (t.ref_points[0] + t.ref_width) - c.r;
    t.widths[0] = c.r - t.ref_points[0];
    t.widths[1] = width_offset;
    t.ref_points[1] = c.r - width_offset;
  }
  else if(t.ref_points[0] - t.ref_width < c.x && t.trail_layer === 1){
    /*NOTE: The lead-trail system does not work on this edge,
            as the lead is already on the other layer.
            The temporary solution is to fiddle with widths and
            reference points*/
    let width_1 = t.ref_points[0] - c.x;
    let width_0 = t.ref_width - width_1;
    t.ref_points = [c.x, c.x];
    t.widths = [width_0, width_1];
  }
}

class Conveyor{
  constructor(_x, _y, _w, _h, _n, _v){
    this.x = _x;
    this.y = _y;
    this.ref_width = _w;
    this.ref_height = _h;
    this.num_tiles = _n;
    this.w = _w * _n;
    this.ref_x = _x;
    this.ref_layer = 0;
    this.r = this.x + this.w; //right
    this.vel = _v;
    this.tiles = []; //figure in a bit
    this.trails = [];
    this.layers = [];
    for(let t = 0; t < _n*2; ++t){
      let cur_pos = this.x + t*this.ref_width;
      let leading = cur_pos + this.ref_width;
      let trail_layer = 0;
      if(cur_pos >= this.r){
        trail_layer = 1;
        let pos_offset = cur_pos - this.r;
        cur_pos = this.r - pos_offset;
        leading = cur_pos - this.ref_width;
      }
      this.trails.push(cur_pos);
      this.layers.push(trail_layer);
      this.tiles.push(new Tile(cur_pos, leading, this.y, this.ref_width, this.ref_height, trail_layer, true));
    }
  }
  update(dt){
    this.bounce();
    for(let i = 0; i < this.trails.length; ++i){
      let cur_pos =  this.ref_x + (1 - 2*(this.ref_layer !== 0))* this.ref_width*i;
      let trail_layer = this.ref_layer;
      let leading = cur_pos;
      leading += this.ref_layer === 0? this.ref_width : - this.ref_width;
      /*****************************************************************
       *The current reference layer dictates the order of              *
       * distance checking: if the reference is in front,              *
       * check for right, then left; otherwise, check left, then right *
       *****************************************************************/
      if(this.ref_layer === 0){
        if(cur_pos >= this.r){
          trail_layer = 1;
          let offset = cur_pos - this.r;
          cur_pos = this.r - offset;
          leading = cur_pos - this.ref_width;
        }
        if(cur_pos < this.x){ 
          trail_layer = 0;
          let offset = this.x - cur_pos;
          cur_pos = this.x + offset;
          leading = cur_pos + this.ref_width;
        }
      }
      else{
        if(cur_pos < this.x){ 
          trail_layer = 0;
          let offset = this.x - cur_pos;
          cur_pos = this.x + offset;
          leading = cur_pos + this.ref_width;
        }
        if(cur_pos >= this.r){
          trail_layer = 1;
          let offset = cur_pos - this.r;
          cur_pos = this.r - offset;
          leading = cur_pos - this.ref_width;
        }
      }
      this.tiles[i].widths = [0,0];
      this.tiles[i].widths[trail_layer] = this.ref_width;
      this.trails[i] = cur_pos;
      this.layers[i] = trail_layer;
      this.tiles[i].ref_points[0] = cur_pos;
      this.tiles[i].ref_points[1] = leading;
      this.tiles[i].trail_layer = trail_layer;
      calculate_tile_widths(this.tiles[i], this);
    }
  }
  render(l){
    strokeWeight(5);
    stroke(0, 0, 1);
    for(let t = 0; t < this.trails.length; ++t){
      this.tiles[t].render(l);
    }
  }
  bounce(){
    let old_vel = this.vel;
    this.vel *= 1 - 2*((this.ref_x < this.x)||(this.ref_x >= this.r));
    this.ref_x += this.vel * conveyor_displacement;
	if(this.ref_x < this.x && conveyor_displacement === 0){this.ref_x = this.x;}
	if(this.ref_x > this.r && conveyor_displacement === 0){this.ref_x = this.r-1;}
	if(old_vel !== this.vel){
      ++this.ref_layer;
      this.ref_layer %= 2;
    }
  }
}
