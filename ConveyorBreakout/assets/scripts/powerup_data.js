/*********************************************************************************
 * Powerup Classes:																 *
 *  Classes are based on what the powerup affects. They can be:					 *
 *    Ball Powerups:															 *
 *	   Ball Layer Change: Changes ball layer									 *
 *	   Ball Wrap: Changes ball layer when it collides with world's boundaries	 *
 *	   Ball Loop: Loops the ball around the screen along its x-axis				 *
 *	   Ball Accelerate: Ball becomes faster										 *
 *     Ball Decelerate: Ball becomes slower										 *
 *     Ball Enlarge: Increases ball size										 *
 *     Ball Shrink: Decreases ball size 										 *
 *     OmniBall: Ball hits both layers											 *
 *     MeltBall: Ball melts through tiles (single layer)						 *
 *     MultiBall: Splits one ball in play into 8 others ***TBI***				 *
 *    Paddle Powerups:															 *
 *     Paddle Enlarge: Paddle becomes wider										 *
 *     Paddle Shrink: Paddle becomes narrower									 *
 *     Paddle Accelerate: Paddle becomes faster									 *
 *     Paddle Decelerate: Paddle becomes slower									 *
 *     Paddle Reverse: Switches Left-Right Paddle controls						 *
 *     Paddle Laser: Enables Laser-firing from Paddle							 *
 *     Paddle Extra Life: Paddle gets one more ball to launch 					 *
 *    Conveyor Powerups: 														 *
 *     Conveyor Accelerate: Conveyor becomes faster								 *
 *     Conveyor Decelerate: Conveyor becomes slower								 *
 *     Conveyor Freeze: Freezes Conveyor Belt									 *
 *     Conveyor Reverse: Switches Left-Right Conveyor controls					 *
 *     Conveyor Physics: Conveyor rotates based on ball impact ***TBI***		 *
 *	  Ball-Paddle Powerups:														 *
 *     Ball Grip: Ball sticks to paddle on contact until it is re-launched		 *
 *	  World Powerups:														 	 *
 *     World Shield: Prevents the ball from falling through the bottom gap		 *
 *********************************************************************************/
//very JSON-y
/*TODO: STANDARDIZE COLOURS*/
var _powerup_data = [
		/*BALL EFFECTS*/
		{_class:"BALL", effect:"BallLayer", bc:[1,1,1], fc:[0,0,0], lbl:"BLy"},
		{_class:"BALL", effect:"BallWrap", bc:[2,1,1], fc:[0,0,0.5], lbl:"BWr"},
		{_class:"BALL", effect:"BallLoop", bc:[3,1,1] , fc:[0,0,0.25], lbl:"BLp"},
		{_class:"BALL", effect:"BallEnlarge", bc:[2.5,1,1], fc:[0,0.2,0.1], lbl:"BEl"},
		{_class:"BALL", effect:"BallShrink", bc:[0.5,1,1], fc:[0,0.2,0.1], lbl:"BSh"},
		{_class:"BALL", effect:"BallAccel", bc:[1.5,1,1], fc:[0,0.2,0.1], lbl:"BAc"},
		{_class:"BALL", effect:"BallDecel", bc:[3.5,1,1], fc:[0,0.2,0.1], lbl:"BDc"},
		{_class:"BALL", effect:"BallOmni", bc:[4.5,1,1], fc:[0,0.2,0.1], lbl:"BOm"},
		{_class:"BALL", effect:"BallMelt", bc:[5.5,1,1], fc:[0,0.2,0.1], lbl:"BMl"},
		/*PADDLE EFFECTS*/
		{_class:"PADDLE", effect:"PaddleEnlarge", bc:[0,0.2,0.1], fc:[2.5,1,1], lbl:"PEl"},
		{_class:"PADDLE", effect:"PaddleShrink", bc:[0,0.2,0.1], fc:[0.5,1,1], lbl:"PSh"},
		{_class:"PADDLE", effect:"PaddleAccel", bc:[0,0.2,0.1], fc:[1.5,1,1], lbl:"PAc"},
		{_class:"PADDLE", effect:"PaddleDecel", bc:[0,0.2,0.1], fc:[3.5,1,1], lbl:"PDc"},
		{_class:"PADDLE", effect:"PaddleReverse", bc:[0,0.2,0.1], fc:[1,1,1], lbl:"PRv"},
		{_class:"PADDLE", effect:"PaddleLaser", bc:[0,0.2,0.1], fc:[4,1,1], lbl:"PLs"},
		{_class:"PADDLE", effect:"ExtraBall", bc:[0,0.2,0.5], fc:[5,1,1], lbl:"PEb"},
		/*CONVEYOR EFFECTS*/
		{_class:"CONVEYOR", effect:"ConvAccel", bc:[4,0.2,0.1], fc:[0.5,1,1], lbl:"CAc"},
		{_class:"CONVEYOR", effect:"ConvDecel", bc:[4,0.2,0.1], fc:[1.5,1,1], lbl:"CDc"},
		{_class:"CONVEYOR", effect:"ConvFreeze", bc:[4,0.2,0.1], fc:[3.5,1,1], lbl:"CFr"},
		{_class:"CONVEYOR", effect:"ConvReverse", bc:[4,0.2,0.1], fc:[1,1,1], lbl:"CRv"}//,
		// {_class:"", effect:"", bc:[,,], fc:[,,], lbl:""}
];