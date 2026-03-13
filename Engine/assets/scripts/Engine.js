async function init(){
	let mod = await import("./GameLoader.js");
	
	let gameArea = document.createElement("div");
	
	let game = await fetch("./assets/data/gameAreaParams.json");
	let gameParams = await game.json();
	let areaParams = mod.loadGame(gameParams);
	
	//will handle resize logic later;
	gameArea.style.width = areaParams.width+"px";
	gameArea.style.height = areaParams.height+"px";
	gameArea.style.top = "50%";
	gameArea.style.left = "50%";
	gameArea.style.position = "fixed";
	gameArea.style.transform = "translate(-50%, -46.25%)";
	document.body.appendChild(gameArea);
	
	return gameArea;
}

function cycle(cur, spd, low, high){
	return cur + spd - (high-low)*((cur > high)-(cur < low));
}

// Asynchronous IIFE
(async () => {
  
	let gameArea = await init();
	
	// Create a PixiJS application.
	const app = new PIXI.Application();

	// Intialize the application.
	await app.init({ background: {h:250, s:100, v:100}, resizeTo: gameArea });
	
	const graphics = new PIXI.Graphics();
	graphics.fill({h:270, s:50, v:100}).arc(0,0, 100, 0.5*Math.PI, 1*Math.PI);
	const tex = app.renderer.textureGenerator.generateTexture({target:graphics});
	//apparently, can't add event to graphics. 
	//Must create texture from graphics then create sprite from texture
	//then the texture can be converted into a Button
	//question is: how can this work to recolor the sprite?

	// Then adding the application's canvas to the DOM body.
	gameArea.appendChild(app.canvas);
	
	app.stage.addChild(tex);
	
	app.ticker.add(()=>{
		
	});
})();
