class World extends GameObject{
	constructor(_r, _b){
		super("World", "WORLD");
		this.l = 0;
		this.r = _r;
		this.t = 0;
		this.b = _b;
	}
	update(dt){}
	render(){}
}