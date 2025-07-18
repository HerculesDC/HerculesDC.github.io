class PhysicsSystem{
	static colliders = [];
	constructor(){}
	static update(dt){}
	static register(_coll){
		for(const coll of PhysicsSystem.colliders){
			if(coll.uuid === _coll.uuid){ return false; } //already registered
			PhysicsSystem.colliders.push(_coll);
			return true;
		}
	}
}