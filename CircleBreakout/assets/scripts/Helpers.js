function cycle(cur, spd, low, high){
	return cur + spd - (high-low)*((cur > high)-(cur <=low));
}

class Debug{
	static draw(){
		let world  = GameObjectRegistry.GOMap.get("WORLD")[0];
		let paddle = GameObjectRegistry.GOMap.get("PADDLE")[0];
		let ball   = GameObjectRegistry.GOMap.get("BALL")[0];
		
		let nAngle = ball.angle;
		let iAngle = atan2(ball.vels[1], ball.vels[0]);
		let rAngle = iAngle - ball.angle;
		
		//?
		rAngle = nAngle - rAngle;
		
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
		
		noStroke();
		fill(1, 1, 1);
		text("Incident:\t"+iAngle, 100, 100);
		fill(0, 1, 1);
		text("Normal:\t\t"+nAngle, 100, 120);
		fill(2, 1, 1);
		text("Reflection:\t"+rAngle, 100, 140);
	}
}