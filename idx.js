let stars = [];
let canvheight = 400
let imgcon,imgbob,imgscream,imgbaby;
crocketx = -447;
crockety = 0;
brocketx = (-440) + crocketx;
brockety = 0;

function preload() {
  imgcon = loadImage('assets/rocketcon.png');
  imgbob = loadImage('assets/rocketbob.png');
  imgscream = loadImage('assets/rocketbobscream.png');
  imgbaby = loadImage('assets/baby.jpeg');
}

function setup(){
canvas = createCanvas(windowWidth,canvheight);
canvas.parent('canvas');

	for (i=0;i<1000;i++){
		stars[i] = new Stars();
	}

}

function draw(){
	background(0);

	for (i=0;i<1000;i++){
		stars[i].show();
	}
	image(imgbaby,windowWidth-100, canvheight - 300, 70, 150);
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
crocketx +=2;
brocketx +=2;
image(imgcon,crocketx,crockety);

if ((brocketx + 440) < width/3){
  image(imgbob,brocketx,brockety);
} else {
  image(imgscream,brocketx,brockety);
  brockety += 2;
}

if (crocketx >= width){
	crocketx = -447;
  brocketx = -887;
  brockety = 0;
}




}

function windowResized() {
  resizeCanvas(windowWidth, canvheight);
}
