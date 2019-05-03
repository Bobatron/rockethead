var x = 0, y = 0, z = 100, w = 100;
var balls = [];
var ball;
var width = 500;
var height = 500;
var dirX = 5;
var dirY = 7;
var changeX = 1;
var changeY = 1;
var controlX = 5;
var controlY = 7;
var colorModX = 1;
var colorModY = 1;
var colorLevel = 0;
var mic;
var stopCommand = 1;
var time;
var br = 0;
var loadaballs = 1;



function setup() {
  this.width = windowWidth-100;

  this.height = 500;
createCanvas(this.width,this.height);
balls[0] = new Ball();
mic = new Micro();
mic.start();
time = millis();
}

function draw() {
  background(br);
  command();
  for(var i = 0; i < balls.length; i++){
    balls[i].keys();
    mic.getVolume();
    balls[i].color();
    balls[i].move();
    balls[i].display();
  }

}

function test(){
	loadaballs = loadaballs + 3;
}

function CrazyBalls(){
	loadaballs = loadaballs + 30;
}

function mover(){
  if(x > 450){changeX = -1;}
  if(y > 450){changeY = -1;}
  if(x < 50){changeX = 1;}
  if(y < 50){changeY = 1;}

  x += dirX;
  y += dirY;
}

function moveYouShit(){
    if (keyIsDown(LEFT_ARROW)) {
    controlX-=2;
    controlX = constrain(controlX, 0, 20);
  }
    if (keyIsDown(RIGHT_ARROW)) {
    controlX+=2;
    controlX = constrain(controlX, 0, 20);
  }
  if (keyIsDown(UP_ARROW)) {
    controlY-=2;
    controlY = constrain(controlY, 0, 20);
  }
    if (keyIsDown(DOWN_ARROW)) {
    controlY+=2;
    controlY = constrain(controlY, 0, 20);
  }
}


function Ball() {
  this.x = 0;
  this.y = 0;
  this.width = 10;
  this.height = 10;
  this.dirX = 5;
  this.dirY = 7;
  this.controlX = random(1,20);
  this.controlY = random(1,20);
  this.colorModX = 1;
  this.colorModY = 1;
  this.maxDiameter = 50;
  this.maxBalls = loadaballs;
  this.sound = new MySound();
  this.time;

    this.display = function() {
      ellipse(this.x, this.y, this.width, this.height);
    }

    this.color = function() {
      fill(color(constrain(colorLevel,0,255), 100+(this.colorModY*this.changeY), constrain(colorLevel,0,255)));
    }


    this.move = function() {
      if(this.x > (width-(this.width/2))){
        this.changeX = -1;

        if (balls.length < loadaballs){
        balls = append(balls, new Ball());
        }
        //this.sound.play();
        //this.sound.stop();

      }
      if(this.y > (height-(this.height/2))){
        this.changeY = -1;
        //this.sound.stop();
      }
      if(this.x < (0+(this.width/2))){
        this.changeX = 1;
      }
      if(this.y < (0+(this.height/2))){
        this.changeY = 1;
      }

      this.dirX = this.controlX*this.changeX;
      this.dirY = this.controlY*this.changeY;
      this.colorModX = this.colorModX+this.changeX;
      this.colorModY = this.colorModY+this.changeY;


      this.x += (this.dirX)*stopCommand; 
      this.y += (this.dirY)*stopCommand;
    }

    this.keys = function(){
      if (keyIsDown(LEFT_ARROW)) {
        this.controlX-=random(1,4);
        this.controlX = constrain(this.controlX, 0, 20);
      }
      if (keyIsDown(RIGHT_ARROW)) {
        this.controlX+=random(1,4);
        this.controlX = constrain(this.controlX, 0, 20);
      }
      if (keyIsDown(UP_ARROW)) {
        this.controlY-=random(1,4);
        this.controlY = constrain(this.controlY, 0, 20);
      }
      if (keyIsDown(DOWN_ARROW)) {
        this.controlY+=random(1,4);
        this.controlY = constrain(this.controlY, 0, 20);
      }
      if (keyIsDown(ENTER)){
        balls = [new Ball()];
      }
      if (keyIsDown(SHIFT) && this.width < this.maxDiameter){
        this.width += 1;
        this.height += 1;
      }
      if (keyIsDown(CONTROL) && this.height > 1){
        this.width -= 1;
        this.height -= 1;
      }
    }

}

function MySound(){
  this.osc = new p5.SinOsc();
  this.freq = 440;
  this.env = new p5.Env();
  this.env.setADSR(0.1,1,0,0.2);
  this.env.setRange(1,0);

  this.osc.start();
  this.osc.amp(this.env);

  this.play = function(){
    this.osc.freq(random(200,500));
    this.env.triggerAttack();
  }
  this.stop = function(){
    this.env.triggerRelease();
  }
}

function Micro(){
  this.mic = new p5.AudioIn();

  this.start = function(){
    this.mic.start();
  }

  this.getVolume = function(){
    colorLevel = this.mic.getLevel()*400;
  }
}

function command(){
        if(colorLevel > 40 && stopCommand === 1 && (millis()-time)>2000){
          stopCommand = 0;
          time = millis();
        }
      if(colorLevel > 40 && stopCommand === 0 && (millis()-time)>2000){
          stopCommand = 1;
          time = millis();
        }
}