class Collider{
	constructor(_name, _type, _x, _y){
		this.name = _name;
		this.type = _type;
		this.uuid = crypto.uuid();
		this.x = _x;
		this.y = _y;
		PhysicsSystem.register(this);
	}
}

class CircleCollider extends Collider{
	constructor(_name, _x, _y, _r){
		super(_name, "CircleCollider", _x, _y);
		this.r = _r;
		this.sqr = _r*_r; //for dist purposes
	}
}

class RectCollider extends Collider{ //corner-based for the moment
	constructor(_name, _x, _y, _w, _h){
		super(_name, "RectCollider", _x, _y);
		this.w = _w;
		this.h = _h;
	}
}

class PolyCollider extends Collider{
	constructor(_name, "PolyCollider", _x, _y){//use variadic notation
		super(_name, "PolyCollider", _x, _y);
	}
}