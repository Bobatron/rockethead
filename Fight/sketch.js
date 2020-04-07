var fighters = [1,2];
Fighterthere = false;
var phrase
var Quotes = ["Fight!", "To the Death!", "KILL KILL KILL", "OOH that HAD to hurt", "MURDER", "Bash Him!!", "SMITE THEE","KILL THE KELLEYS!!", "SAVE THE KELLEYS!"];
var currQuote = "";
var xquote = 20;
var yquote = 20;
var backr;
var backg;
var backb;
var rain = [];
var fruits = [];
var bottom = 550;
var OpeningScreen = true;
var P1Lastkey = "";
var P2LLastkey = "";
var guns = [];
  
function preload() {
  soundFormats('aac');
  mySound = loadSound('assets/WhatsApp Audio 2019-05-05 at 15.11.01.aac');
}  
  
function setup() {
  createCanvas(windowWidth - 50,windowHeight - 50);
    mySound.setVolume(0.1);
    mySound.play();
  //frameRate(24);

  for (i = 0; i < 5; i++){
	  fruits[i] = new Fruit();
  }

  for (i=0;i<fighters.length;i++){
	  fighters[i] = new Fighter(i);
	  guns[i] = new Gun(i);
  }
  
  for (i=0;i<10;i++){
	  rain[i] = new Rain();
	  
  }
  
}

function collision(locationFighter, locationRain) {
	if(
	(locationFighter[0] < locationRain[0] + 10 && locationFighter[0] > locationRain[0] - 10) 
	&& 
	(locationFighter[1] < locationRain[1] + 10 && locationFighter[1] > locationRain[1] - 10)
	)
	{
		return true;
	}
}

function draw() {
	
  //background(random(0,255),random(0,255),random(0,255));  
    background(255);  
	
/*   DeathQuote();
  fill(255);
  text(currQuote, xquote,yquote);

  } */
		
	text(frameRate(),20,20);
	text(fighters[1].score, 60, 40);
	text(fighters[0].score, 800, 40);

    for (i = 0;i < fruits.length;i++){
	  fruits[i].display();
  } 	
  
	//bullets go here
  
	
	
    for (i = 0;i < rain.length;i++){
	  rain[i].display();
	  rain[i].move();
  } 
    
  for (i=0;i<fighters.length;i++){
	  fighters[i].show();
	  fighters[i].gravity();
  }
  

  	
 
 	  // Player one
    if (keyIsDown(DOWN_ARROW)) {  
    fighters[0].move("down");
	P1Lastkey = "down";
  }

    if (keyIsDown(UP_ARROW)) {
    fighters[0].move("up");
	P1Lastkey = "up";
  }
    if (keyIsDown(LEFT_ARROW)) {
    fighters[0].move("left");
	P1Lastkey = "left";
  }
    if (keyIsDown(RIGHT_ARROW)) {
    fighters[0].move("right");
	P1Lastkey = "right";
  }
    if (keyIsDown(13)) {
    fighters[0].taunt();
  }
    if (keyIsDown(12)){
		//shoot bullet
	}
  
  
  
  
  //Player two
  if (keyIsDown(83)) {
    fighters[1].move("down");
	P2Lastkey = "down";
  }

    if (keyIsDown(87)) {
    fighters[1].move("up");
	P2Lastkey = "down";
  }
    if (keyIsDown(65)) {
    fighters[1].move("left");
	P2Lastkey = "left";
  }
    if (keyIsDown(68)) {
    fighters[1].move("right");
	P2Lastkey = "right";
  }
  
    if (keyIsDown(81)) {
    fighters[1].taunt();
  }
 
	for(i = 0;  i < fighters.length; i++){
		for(j = 0; j < rain.length; j++) {
			if(collision(fighters[i].getPosition(), rain[j].getPosition())){
				background(Math.round(random(1,255)));
				//mySound.pause();
				fighters[i].score -=1;
				console.log("player " + i + ":" + fighters[i].score);
			}
		}
	}
 
	for(i = 0;  i < fighters.length; i++){
		for(j = 0; j < fruits.length; j++) {
			if(collision(fighters[i].getPosition(), fruits[j].getPosition())){
				//background(Math.round(random(1,255)));
				//mySound.pause();
				fighters[i].score +=1;
				fruits[j].eaten();
				console.log("Yummerz");
			}
		}
	}
  

	//console.log(fighters[0].getPosition());
	
}

function Fruit(){
	this.x = Math.round(random(1, width));
	this.y = Math.round(random(1, height));
	this.size = 4;
	
	this.eaten = function(){
		this.x = Math.round(random(1, width));
		this.y = Math.round(random(1, height));
	}
	
	this.display = function(){
		ellipse(this.x, this.y, this.size, this.size);
	}
	
	this.getPosition = function(){
		return [this.x, this.y];
	}
	
}


function keyPressed(){
	OpeningScreen = false;
}
