class Paddle extends GameObject{
  constructor(_x, _y, _w, _h, _v, _fc, _bc){
	super("Paddle", "PADDLE");
    this.x = _x;
    this.y = _y;
	this.ref_w = _w;
    this.w = _w;
    this.h = _h;
	this.hw = this.w*0.5;
    this.hh = _h/2;
	this.center = this.x + this.hw; //for collision purposes
	this.r = this.x + this.w; //right
	this.b = this.y + this.h; //bottom
    this.vel = _v;
    //TODO: remove hardcode
	this.current_layer = 0;
	this.lives = 3;
    //drawing
    this.colours = [_fc, _bc];
    this.mh = this.y + (this.hh);
    this.right = this.x + this.w;
	
	//Powerups
	PowerupManager.register(this);
  }
  update(dt){
    this.x += this.vel * paddle_displacement;
	this.center = this.x + this.hw;
	this.r = this.x + this.w;
	
  }
  render(){
    noStroke();
    let fill_colour = this.colours[this.current_layer];
    fill(fill_colour[0], fill_colour[1], fill_colour[2]);
    //ellipse(this.x, this.mh, this.h, this.h);
    rect(this.x, this.y, this.w, this.h);
    //ellipse(this.x+this.w, this.mh, this.h, this.h);
  }
  on_world_boundary_reached(world){
	  if(this.x < world.l){this.x = world.l;}
	  if(this.r > world.r){this.x = world.r-this.w;}	  
  }
  on_collision_enter(other){
	  switch(other.type){
		  case "BALL": return;
		  case "POWERUP": return;
		  default: return;
	  }
  }
  enlarge(){ this.w *= 1.5; }
  shrink(){ this.w *= (2/3); }
  reset_width(){ this.w = this.ref_w; }
  activate_powerup_effect(effect){
	  switch(effect){
		  default: return;
	  }
  }
  reset_state(){
	  this.x = (CANVAS_WIDTH >> 1) - this.hw;
	  this.center = this.x + this.hw;
	  this.r = this.x + this.ref_w;
	  this.lives = 3;
  }
}