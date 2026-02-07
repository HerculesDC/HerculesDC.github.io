// Asynchronous IIFE

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

(async () => {
	
	var hue = 0;
  
	let gameArea = await init();
	
	// Create a PixiJS application.
	const app = new PIXI.Application();

	// Intialize the application.
	await app.init({ background: {h:30, s:100, v:100}, resizeTo: gameArea });
	
	const graphics = new PIXI.Graphics();
	
	graphics.fill({h:hue, s:100, v:100});

	// Then adding the application's canvas to the DOM body.
	gameArea.appendChild(app.canvas);
	
	app.stage.addChild(graphics);
	app.ticker.add(()=>{
		graphics.clear();
		hue = cycle(hue, 0.25, 0, 360);
		graphics.rect(100, 100, 100, 100);
		graphics.fill({h:hue, s:100, v:100});
		
		graphics.circle(400, 400, 150);
		graphics.fill({h:360-hue, s:100, v:100});
	});
})();
