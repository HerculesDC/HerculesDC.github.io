function cycle(cur, spd, low, high){
	return cur + spd - (high-low)*((cur > high)-(cur <=low));
}