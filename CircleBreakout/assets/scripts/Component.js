class Component{ //interface
	constructor(comp_name, _prnt){
		this.name = comp_name;
		this.prnt = _prnt;
	}
	update(dt){}
	render(){}
}