function cycle(cur, spd, low, high){
	return cur + spd - (high-low)*((cur > high)-(cur <=low));
}

function vectorLength(vec){
	return Math.sqrt(vec.x*vec.x + vec.y*vec.y);
}

function normalizeVector(vec){
	const len = vectorLength(vec);
	if (len == 0) return {x:0, y:0};
	return {x:vec.x/len, y:vec.y/len};
}

function reflect(normal, incident, scaling = 1){
	//normalize normal
	const nLen = normalizeVector(normal);
	
	//dot product between normalized normal and incident
	const dotProd = incident.x *nLen.x+ incident.y*nLen.y;
	const rX = incident.x - 2*dotProd*nLen.x;
	const rY = incident.y - 2*dotProd*nLen.y;
	
	const iLen = vectorLength({x:rX, y:rY});
	if(iLen == 0) return {x:0, y:0};
	
	const scale = scaling/iLen;
	return {x: rX * scale, y: rY * scale};
}

function reflectVelocityAcrossBall(x, y, vels, refVel) {
    // Normalize the radial direction
    const len = Math.hypot(x, y);
    const nx = x / len;
    const ny = y / len;

    // Reflect velocity vector across the normal (nx, ny)
    const dot = vels[0] * nx + vels[1] * ny;
    const rx = vels[0] - 2 * dot * nx;
    const ry = vels[1] - 2 * dot * ny;

    // Rescale to desired magnitude
    const scale = refVel / Math.hypot(rx, ry);
    return [rx * scale, ry * scale];
}

function rVAB(x, y, vels, refVel) {
    // Normalize the radial direction
    const len = Math.sqrt(x*x+y*y);
    const nx = x / len;
    const ny = y / len;

    // Reflect velocity vector across the normal (nx, ny)
    const dot = vels[0] * nx + vels[1] * ny;
    const rx = vels[0] - 2 * dot * nx;
    const ry = vels[1] - 2 * dot * ny;

    // Rescale to desired magnitude
    const scale = refVel / Math.hypot(rx, ry);
    return [rx * scale, ry * scale];
}

class Debug{
	static draw(){
		let world  = GameObjectRegistry.GOMap.get("WORLD")[0];
		let paddle = GameObjectRegistry.GOMap.get("PADDLE")[0];
		let ball   = GameObjectRegistry.GOMap.get("BALL")[0];
		
		let iAngle = atan2(ball.vels[1], ball.vels[0]);
		let rAngle = iAngle - ball.angle;
		
		//?
		//rAngle = nAngle - rAngle;
		
		let ballSin = sin(ball.angle);
		let ballCos = cos(ball.angle);
		
		let bVSin = sin(iAngle);
		let bVCos = cos(iAngle);
		
		let bRSin = sin(rAngle);
		let bRCos = cos(rAngle);
		
		strokeWeight(1);
		stroke(0, 1, 1); //red-Normal
		line(0, 0, world.wr*ballCos, world.wr*ballSin);
		stroke(1, 1, 1); //yellow-Incident
		let ext = 150;
		line(ball.x, ball.y, ball.x+(ext+world.wr)*bVCos, ball.y+(ext+world.wr)*bVSin);
		stroke(2, 1, 1); //green-Reflection
		line(ball.x, ball.y, ball.x + world.wr*bRCos, ball.y+world.wr*bRSin);
		
		// noStroke();
		// textAlign(LEFT);
		// fill(0, 1, 1);
		// text("Ball Angle:\t"+ball.angle, 0, 100);
		// fill(1, 1, 1);
		// text("Ball Dist:\t"+ball.get_polar_coords().dist, 0, 120);
		// fill(2, 1, 1);
		// text("Paddle Angles:\t"+paddle.start_ang+","+paddle.stop_ang, 0, 140);
		// fill(3, 1, 1);
		// text("Paddle Dist:\t"+paddle.r, 0, 160);
	}
}