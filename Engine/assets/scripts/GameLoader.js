//later functionality for different game parameters

const HEIGHT_RATIO = 0.9125

function createSquareArea(){
	let ref = Math.floor(Math.min(window.innerWidth, window.innerHeight*HEIGHT_RATIO));
	return {width:ref, height:ref};
}

function createTallArea(ratio){
	let ref = Math.floor(window.innerHeight*HEIGHT_RATIO);
	ratio = ratio > 1 ? 1/ratio : ratio;
	return {width: ref*ratio, height: ref};
}

function createWideArea(ratio){
	let ref = window.innerWidth;
	ratio = ratio > 1 ? 1/ratio : ratio;
	//will have to fix things in case height is greater than the HEIGHT_RATIO
	let maxHeight = Math.floor(window.innerHeight*HEIGHT_RATIO);
	if(ref * ratio > maxHeight){
		ref *= maxHeight/(ref*ratio);
	}
	return {width:ref, height:ref*ratio};
}

function calculateScreenParams(basis){
	switch(basis.shape){
		case "square":
			return createSquareArea();
		case "tall":
			return createTallArea(basis.ratio);
		case "wide":
			return createWideArea(basis.ratio);
		default:
			return {width:100, height:100};
	}
}

export function loadGame(params){
	var gameParams = {};
	let shape = calculateScreenParams(params);
	gameParams.width = shape.width;
	gameParams.height = shape.height;
	return gameParams;
}