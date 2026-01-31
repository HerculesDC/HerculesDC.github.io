class SceneManager{
	//will need scene library or something of the sort
	//For the time being, it is basically just a factory
	static loadScene(sceneData){ //async?
		return new Scene(sceneData);
	}
}