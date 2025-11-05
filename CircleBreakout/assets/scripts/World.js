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
		this.wr = this.wd/2;
		
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
		this.worldView.noFill();
		this.worldView.strokeWeight(0.5);
		this.worldView.stroke(255, 255, 255);
		this.worldView.ellipse(this.hf, this.vf, this.wd, this.wd);
	}
	update(dt){}
	render(){
		image(this.worldView, this.l, this.t);
	}
}