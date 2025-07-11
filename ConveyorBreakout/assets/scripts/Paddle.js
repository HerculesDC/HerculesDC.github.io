class Paddle extends GameObject{
  constructor(_x, _y, _w, _h, _v, _fc, _bc){
	super("Paddle", "PADDLE");
    this.x = _x;
    this.y = _y;
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
  }
  update(dt){
    this.x += this.vel * paddle_displacement;
	this.center = this.x + this.hw;
	this.r = this.x + this.w;
	//will need to take boundaries into account later
    if(this.x < 0){this.x = 0;}
    if(this.r > CANVAS_WIDTH){this.x = CANVAS_WIDTH-this.w;}
  }
  render(){
    noStroke();
    let fill_colour = this.colours[this.current_layer];
    fill(fill_colour[0], fill_colour[1], fill_colour[2]);
    //ellipse(this.x, this.mh, this.h, this.h);
    rect(this.x, this.y, this.w, this.h);
    //ellipse(this.x+this.w, this.mh, this.h, this.h);
  }
}