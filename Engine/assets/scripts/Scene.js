class Scene{
	constructor(scene_data){
		//__of__is for arrays, __in__ is for objects)
		for (let key in scene_data){
			console.log(key,":",scene_data[key]);
		}
		this.a = scene_data.angle;
		this.aSpd = scene_data.angleSpeed;
	}
	update(dt){
		this.a = cycle(this.a, this.aSpd*dt, 0, TAU);
	}
	render(){
		background(this.a, 0.25, 0.5);
	}
}