class GameObjectRegistry{
	static GameObjectMap = new Map();
	constructor(){}
	static register(_obj){
		if(!GameObjectRegistry.GameObjectMap.has(_obj.type)){
			GameObjectRegistry.GameObjectMap.set(_obj.type, new Array());
			GameObjectRegistry.GameObjectMap.get(_obj.type).push(_obj);
			return true;
		}
		else{
			for(const gameobject of GameObjectRegistry.GameObjectMap.get(_obj.type)){
				if (gameobject.uuid === _obj.uuid) return false;
			}
			GameObjectRegistry.GameObjectMap.get(_obj.type).push(_obj);
			return true;
		}
		return false;
	}
}