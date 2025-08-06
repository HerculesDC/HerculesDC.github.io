var game_colours = {
	paddle: {paddle_colour: [4,0.5,1]},
	laser:  {laser_colour:  [0,  1,1]},
	ball:   {ball_layers:  [[0, 0, 1], [0, 1, 0.75], [1.25, 1, 1], [0, 1, 0.5]] },
	tiles:{
		outlines: { 
			invisible:{front: [0, 0, 1, 1], back: [0, 0, 0, 1]},
			regular:  {front: [0, 0, 1, 1], back: [0, 0, 0, 1]},
			rock_full:{front: [0, 0, 1, 1], back: [0, 0, 0, 1]},
			rock_half:{front: [0, 0, 1, 1], back: [0, 0, 0, 1]},
			regen:	  {front: [0, 0, 1, 1], back: [0, 0, 0, 1]},
			immune:	  {front: [0, 0, 1, 1], back: [0, 0, 0, 1]}
		},
		fills:{
			invisible:{front:[ 3.5,  0.25,  0.75, 0.25], back:[  3.5,   0.25,   0.5, 0.25]},
			regular:  {front:[   4, 0.825,     1,    1], back:[    4,  0.825,   0.5,    1]},
			rock_full:{front:[ 0.5,   0.5,  0.75,    1], back:[  0.5,   0.35,  0.25,    1]},
			rock_half:{front:[0.45,  0.35,  0.75,    1], back:[ 0.45,   0.35,  0.25,    1]},
			regen:    {front:[   0,     0,  0.75,    1], back:[    0,      0,  0.25,    1]},
			immune:   {front:[0.75, 0.875, 0.975,    1], back:[0.725, 0.3625, 0.725,    1]}
		}		
	}
}