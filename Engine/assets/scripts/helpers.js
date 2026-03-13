/*Starting to consider developing a library for this...*/

async function loadSceneData(){
	const response = await fetch("../Engine/assets/data/scenedata.json");
	const data = await response.json();
	return data;	
}

function cycle(cur, spd, low, high){
	return cur + spd - (high - low)*((cur > high)-(cur < low));
}