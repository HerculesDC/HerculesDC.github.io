class Scene{
	constructor(){}
	init(sceneData){
		//__of__is for arrays, __in__ is for objects
		for (let key in scene_data){
			console.log(key,":",scene_data[key]);
		}
	}
	update(dt){
		
	}
	render(){
		//background
	}
}