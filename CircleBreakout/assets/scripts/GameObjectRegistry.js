class GameObjectRegistry{
	static GOMap = new Map();
	static GOTypeList = new Array();
	static translateParameters = {x:0, y:0}
	constructor(){}
	static register(_obj){
		if(!GameObjectRegistry.GOMap.has(_obj.type)){
			GameObjectRegistry.GOTypeList.push(_obj.type);
			GameObjectRegistry.GOMap.set(_obj.type, new Array());
			GameObjectRegistry.GOMap.get(_obj.type).push(_obj);
			return true;
		}
		else{
			for(const gameobject of GameObjectRegistry.GOMap.get(_obj.type)){
				if (gameobject.uuid === _obj.uuid) return false;
			}
			GameObjectRegistry.GOMap.get(_obj.type).push(_obj);
			return true;
		}
		return false;
	}
	static update(dt){
		for(const objList of GameObjectRegistry.GOTypeList){
			for(const obj of GameObjectRegistry.GOMap.get(objList)){
				obj.update(dt);
			}
		}
		PhysicsSystem.update(dt);
	}
	static render(){
		//figure better way to pass translate parameters
		push();
		translate(GameObjectRegistry.translateParameters.x, GameObjectRegistry.translateParameters.y);
		for(const objList of GameObjectRegistry.GOTypeList){
			for(const obj of GameObjectRegistry.GOMap.get(objList)){
				obj.render();
			}
		}
		
		//DEBUG DRAW
		// Debug.draw();
		//DEBUG DRAW END
		
		pop();
	}
	static registerTranslateParameters(params){
		GameObjectRegistry.translateParameters.x = params.x;
		GameObjectRegistry.translateParameters.y = params.y;
	}
}