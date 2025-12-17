class GameObject{
	static counter = 0;
	constructor(_name, _type){
		this.name = _name + GameObject.counter;
		GameObject.counter++;
		this.type = _type;
		this.uuid = crypto.randomUUID();
		this.x = 0;
		this.y = 0;
		GameObjectRegistry.register(this);
	}
	update(dt){}
	render(){}
}