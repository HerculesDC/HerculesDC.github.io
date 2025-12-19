/*******************************************************************************
 * World Class (Created: Nov 05, 2025 // Latest Update: Nov 05, 2025)		   *
 * THE WORLD IS ROUND!														   *
 * Used for collisions and dawing. As this is a concave-collision case, the    *
 *  renderer will depict the world's boundaries as well. This is not meant to  *
 *  contain physics logic (which is proceessed by the Physics system.		   *
 ******************************************************************************/

class World extends GameObject{
	constructor(canvas){
		super("World", "WORLD");
		//world diameter/radius
		this.wd = canvas.CANVAS_SIDE;
		this.wr = this.wd*0.5;
		
		//image, x-y placement
		this.l = 0;
		this.r = this.wd;
		this.t = 0;
		this.b = this.wd;
		
		//horizontal/vertical foci
		this.hf = this.wr;
		this.vf = this.wr;
		
		PhysicsSystem.register(this);
		
		//RENDERING INFO => WILL LIKELY BE MOVED TO A DIFFERENT CLASS LATER
		this.worldView = createGraphics(this.wd, this.wd);
		this.worldView.fill(0, 0, 0x0F);
		this.worldView.ellipse(this.hf, this.vf, this.wd, this.wd);
		for(let i = 0; i < 150; ++i){
			this.worldView.noFill();
			this.worldView.strokeWeight(random(0.5, 4.5));
			this.worldView.stroke(random(200, 255), random(200,255), random(200, 255));
			let a = random(TAU);
			let d = random(this.wd/8, this.wr);
			this.worldView.point(this.hf+d*cos(a), this.vf+d*sin(a));
		}
		this.worldView.strokeWeight(0.5);
		this.worldView.stroke(255, 255, 255);
		this.worldView.ellipse(this.hf, this.vf, this.wd, this.wd);
		
		GameObjectRegistry.registerTranslateParameters({x:this.hf, y:this.vf});
	}
	update(dt){}
	render(){
		//the registry object renders from the center
		//x and y are defined in GameObject as 0
		image(this.worldView, this.x, this.y);
	}
}