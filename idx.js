let stars = [];
let canvheight = 400
let img;
rocketx = -913;
rockety = 0;

function preload() {
  img = loadImage('assets/rocket.png');
}

function setup(){
createCanvas(windowWidth,canvheight);

	for (i=0;i<1000;i++){
		stars[i] = new Stars();
	}

}

function draw(){
	background(0);

	for (i=0;i<1000;i++){
		stars[i].show();
	}
	
	Rocketfly();

}

class Stars {
  constructor() {
    this.x = random(0,width);
    this.y = random(0,canvheight);
	this.size = random(1,5);
	
  }
  
  
  show(){
	  stroke("#FFFFFF");
	  strokeWeight(this.size);
	  point(this.x, this.y);
  }
  

}

function Rocketfly(){

image(img,rocketx,rockety);

rocketx +=2;

if (rocketx >= width){
	rocketx = -913;
}
	
	
}