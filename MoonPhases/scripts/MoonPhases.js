new p5();
function setup(){
    let c = createCanvas(400, 400);
    c.position(10, 100, "sticky");
  colorMode(RGB, 255, 255, 255, 255);
  angleMode(RADIANS);
  frameRate(60);
}

var angle = 0;
var angleSpeed = 0.5;
var nightSky = color(0, 0, 50);
function twoColorCrescent(x, y, radius, phaseAngle, c1, c2){ 
    //phaseAngle in RADIANS, in the range 0->TWO_PI!!!
    /*Naming Convention:
     *  x: x, y: y
     * a: anchor, c: control
     * t: top, b: bottom
     * l: left, r: right
     * directions of controls are given
     * using cardinal directions: nsew
     *
     *order:
     * position, (direction,) anchor/control, x/y
     * points follow the same rules as arcs:
     *  they start from the right and go clockwise
     */
    //anchors:
    var rax = 1*radius;
    var ray = 0*radius; //hard-coded
    var bax = 0*radius;
    var bay = 1*radius;
    var lax = -1*radius;
    var lay = 0*radius;
    var tax = 0*radius;
    var tay = -1*radius;
    //controls: 
    // d=r*4*(sqrt(2)-1)/3 => bezier approx to circle
    var dist = 4*(sqrt(2)-1)/3;
    var rscx = 1*radius;
    var rscy = dist*radius;
    var becx = dist*radius;
    var becy = 1*radius;
    var bwcx = -dist*radius;
    var bwcy = 1*radius;
    var lscx = -1*radius;
    var lscy = dist*radius;
    var lncx = -1*radius;
    var lncy = -dist*radius;
    var twcx = -dist*radius;
    var twcy = -1*radius;
    var tecx = dist*radius;
    var tecy = -1*radius;
    var rncx = 1*radius;
    var rncy = -dist*radius;
    
    //used to create the illusion of rotation
    var lf  = 0; //left factor
    var rf  = 0; //right factor
    var slf = 0; //second left factor
    var srf = 0; //second right factor
    
    if (phaseAngle < PI){
        lf = -cos(phaseAngle);
        rf = 1;
        slf = lf;
        srf = -1;
    }else{
        lf = 1;
        rf = -cos(phaseAngle);
        slf = -1;
        srf = rf;
    }
    strokeWeight(1);
    stroke(c2, 7.5);
    fill(c1);
    beginShape();
        vertex(x+rax*rf, y+ray);
        bezierVertex(x+rscx*rf, y+rscy, x+becx*rf, y+becy, x+bax, y+bay);
        bezierVertex(x+bwcx*lf, y+bwcy, x+lscx*lf, y+lscy, x+lax*lf, y+lay);
        bezierVertex(x+lncx*lf, y+lncy, x+twcx*lf, y+twcy, x+tax, y+tay);
        bezierVertex(x+tecx*rf, y+tecy, x+rncx*rf, y+rncy, x+rax*rf, y+ray);
    endShape(CLOSE);
    fill(c2);
    beginShape();
        vertex(x+rax*srf, y+ray);
        bezierVertex(x+rscx*srf, y+rscy, x+becx*srf, y+becy, x+bax, y+bay);
        bezierVertex(x+bwcx*slf, y+bwcy, x+lscx*slf, y+lscy, x+lax*slf, y+lay);
        bezierVertex(x+lncx*slf, y+lncy, x+twcx*slf, y+twcy, x+tax, y+tay);
        bezierVertex(x+tecx*srf, y+tecy, x+rncx*srf, y+rncy, x+rax*srf, y+ray);
    endShape(CLOSE);
}
function phaseName(x, y, phaseAngle){
    fill(0);
    noStroke();
    rectMode(CORNERS);
    rect(0, 0.85*height, width, height);
    fill(200);
    textSize(height/10);
    textAlign(CENTER, BOTTOM);
    //VERY INEFFICIENT!!! SIMPLIFY
    var phase = "";
    var phaseThreshold = PI/12;
    if (phaseAngle > phaseThreshold && phaseAngle < HALF_PI - phaseThreshold ||
        phaseAngle > HALF_PI + phaseThreshold && phaseAngle < PI -phaseThreshold){
            phase += angleSpeed > 0? "Waxing ": "Waning ";
        }
    if(phaseAngle > PI+phaseThreshold && phaseAngle < PI+HALF_PI-phaseThreshold||
       phaseAngle > PI+HALF_PI+phaseThreshold && phaseAngle < TWO_PI-phaseThreshold){
           phase += angleSpeed > 0? "Waning ": "Waxing ";
       }
    if (phaseAngle > phaseThreshold && phaseAngle < HALF_PI - phaseThreshold ||
        phaseAngle > PI+HALF_PI+phaseThreshold && phaseAngle < TWO_PI-phaseThreshold){
            phase += "Cresent";
        }
    if(phaseAngle > HALF_PI+phaseThreshold && phaseAngle < PI-phaseThreshold || 
       phaseAngle > PI+phaseThreshold && phaseAngle < PI+HALF_PI-phaseThreshold){
            phase += "Gibbous";
    }
    if(phaseAngle > HALF_PI-phaseThreshold && phaseAngle < HALF_PI+phaseThreshold){ 
        phase += angleSpeed > 0? "First ": "Last ";
    }
    if(phaseAngle > PI+HALF_PI-phaseThreshold && phaseAngle < PI+HALF_PI+phaseThreshold){ 
        phase += angleSpeed > 0? "Last ": "First ";
    }
    if(phaseAngle > HALF_PI-phaseThreshold && phaseAngle < HALF_PI+phaseThreshold  || 
       phaseAngle > PI+HALF_PI-phaseThreshold && phaseAngle < PI+HALF_PI+phaseThreshold){
           phase += "Quarter";
    }
    if(phaseAngle < phaseThreshold || phaseAngle > TWO_PI - phaseThreshold){ phase += "New "; }
    if(phaseAngle > PI-phaseThreshold && phaseAngle < PI + phaseThreshold){ phase += "Full "; }
    if((phaseAngle < phaseThreshold || phaseAngle > TWO_PI - phaseThreshold) ||
       phaseAngle > PI-phaseThreshold && phaseAngle < PI + phaseThreshold){ phase += "Moon"; }
    
    text(phase, x, y);
}
function mouseClicked(){angleSpeed *= -1;};
background(nightSky);
function draw(){
    var dt = 1/60;
    angle += angleSpeed*dt + TWO_PI*((angle<0 &&angleSpeed < 0)-(angle >TWO_PI &&angleSpeed>0));    
    push();
    translate(width/2, height/2.5);
    //The next lines simulate precession =>Must refine
    var angleFactor = (angleSpeed > 0)?-0.05:0.05;
    var rotAngle = (angle-PI)*angleFactor;
    rotate(rotAngle);
    noStroke();
    twoColorCrescent(0, 0, 150, angle, color(200, 20), color(0,0,32, 20));
    pop();
    phaseName(200, 390, angle);
};