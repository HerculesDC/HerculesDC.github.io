class World extends GameObject{
	constructor(canvas){
		super("World", "WORLD");
		this.l = 0;
		this.r = canvas.CANVAS_WIDTH;
		this.t = 0;
		this.b = canvas.CANVAS_HEIGHT;
	}
	update(dt){}
	render(){}
}