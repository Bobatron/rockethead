let ship;
let shipimg,shipimg2,shipimg3,astimg,fruitimg1,fruitimg2,fruitimg3,fuelimg,menuframe;
let bullets = [];
let stars = [];
let shipspeed = 5;
let shipspeedlimit = 100;
let ast = [];
let spacelength = 500;
let spacewidth = 500;
let asteroidfieldsize = 10;
let health = 100;
let fuel = 20;
let hud;
let distance = 1;
let level = 1;
let cnv;

function preload(){
	shipimg = loadImage('assets/ship.png');
	shipimg2 = loadImage('assets/shipzoom.png');
	shipimg3 = loadImage('assets/shipdie.png');
	astimg = loadImage('assets/asteroid.png');
	fruitimg1 = loadImage('assets/apple.png');
	fruitimg2 = loadImage('assets/strawb.png');
	fruitimg3 = loadImage('assets/cherry.png');
	fuelimg = loadImage('assets/fuel.png');
	menuframe = loadImage('assets/menuframe.png');

}

function setup() {
  cnv = createCanvas(spacewidth, spacelength);
  var x = (windowWidth - width) / 2;
  var y = (windowHeight - height) / 2;
  cnv.position(x, y);
	hud = new HUD();
  ship = new player();
	gas = new fueltank();
  //asteroid field
  for(i=0;i<asteroidfieldsize;i++){
	  ast[i] = new asteroid();
  }
  //star field
  for(i=0;i<200;i++){
	  stars[i] = new space();
  }




}

function draw(){
	background(0);

	for (i=0;i<stars.length;i++){
		stars[i].show();
		stars[i].move();
	}

	gas.show();
	gas.move();
	gas.collide(ship.x,ship.y,ship.size);

	//bullet movement
	if (bullets.length > 0){
		for (i=0;i<bullets.length;i++){
			bullets[i].show();
			bullets[i].move();
		}
	}

	//asteroid movement & collisions
	for (i=0;i<ast.length;i++){
		ast[i].show();
		ast[i].move();
		ast[i].collide(ship.x,ship.y,ship.size);
		}

	Displayspeed();
	hud.health();
	hud.fuel();


	ship.show();
	if (health > 0){

		ship.move();
		ship.shoot();
		distance += shipspeed * 0.01;
	} else {
		DisplayFinalScore();
	}

	if (distance % 1000 < 1){
		levelup();
	}

}


class player{
	constructor(){
		this.x = 225;
		this.y = 450;
		this.size = 50;


	}

	getpos(){
		return [this.x,this.y];
	}

	show(){
		//translate(-(this.size/2),-(this.size/2))
		//shouldn' this be under move?
		if (health > 0){
			if (keyIsDown(ESCAPE) && fuel > 1) {
				//hyperspeed
				image(shipimg2,this.x,this.y,this.size, this.size);
				if (shipspeed <= shipspeedlimit){shipspeed += 1;};
				fuel -= 0.1;
			} else {
				shipspeed = 5;
				image(shipimg,this.x,this.y,this.size, this.size);
				// stroke(0);
				// rect(this.x, this.y, this.size, this.size);
			}
		} else {
			image(shipimg3,this.x,this.y,this.size, this.size);
		}

	}

	move(){

	  if (keyIsDown(LEFT_ARROW) && ship.x > -(this.size/2)) {
		ship.x -= 10;
	  }

	  if (keyIsDown(RIGHT_ARROW) && ship.x < width -(this.size/2)) {
		ship.x += 10;
	  }


	}

	shoot(){

		if (keyIsDown(SHIFT) && bullets.length <= 10) {
		bullets.push(new bullet);
		}

	}


}


class bullet{
	constructor(){
		this.x = ship.x + (ship.size/2);
		this.y = ship.y - (ship.size/2);
		this.col = "yellow";
		this.size = 5;
	}

	show(){
		push();
		stroke(this.col);
		strokeWeight(this.size);
		point(this.x,this.y);
		pop();

	}

	move(){
		this.y -= 10;

		if (this.y < 0){
			bullets.shift();
			console.log(bullets.length);
		}

	}


}

class space{

	constructor(){
		this.x = random(0,width);
		this.y = random(0,height);
		this.size = random(1,3);

	}

	show(){

		if(shipspeed < shipspeedlimit){
			stroke('white');
			strokeWeight(this.size);
			point(this.x,this.y);
		} else {
			stroke('white');
			strokeWeight(this.size);
			line(this.x,this.y, this.x, this.y + 10);
		}


	}

	move(){
		this.y += shipspeed;
		if (this.y > height){
			this.y = random(0, -200);
			this.x = random(0,width);
		}

	}


}

class asteroid{
	constructor(){
		this.x = random(0,spacewidth);
		this.size = random(10,100);
		this.y = random((-250) - this.size,0);
	}

	show(){
		//translate(-(this.size/2),-(this.size/2))
		image(astimg,this.x,this.y,this.size, this.size);


		// circles to test collision
		// push();
		// fill("white");
		// ellipse(this.x,this.y,this.size);
		// pop();

	}

	move(){
		this.y += (shipspeed * 0.2);
		if (this.y > height){
			this.x = random(0,width);
			this.y = random(0,-(spacelength));
			this.size = random(10,100);
		}

	}

	collide(x,y,s){
		if (collideRectCircle(x,y,s,s,this.x + (this.size/2),this.y + (this.size/2),this.size)){
			console.log("HIT!");
			health -= 1;
		}

	}

}

//WIP
class fueltank{
	constructor(){
		this.sizex = 5;
		this.sizey = this.sizex * 3;
		this.x = random(0,spacewidth - this.sizex);
		this.y = random(0, -(spacelength));
	}
	show(){
		image(fuelimg,this.x,this.y,this.sizex,this.sizey);
	}

	move(){
		this.y += (shipspeed * 0.2);
		if (this.y > spacelength){
			this.x = random(0,spacewidth - this.sizex);
			this.y = random(-(spacelength),0);
		}

	}

	collide(x,y,s){
		if (collideRectRect(x,y,s,s,this.x,this.y,this.sizex,this.sizey) && fuel <=100){
			console.log("REFUELLED!");
			fuel += 20;
			fuel = constrain(fuel,0,100);

			this.y = spacelength;
		}

	}

}

function Displayspeed(){
	document.getElementById("speed").innerHTML = "Speed: " +shipspeed.toString() + " Space miles per hour";
	document.getElementById("dist").innerHTML = "Distance travelled " +(Math.trunc(distance)).toString() + " Space miles";

}

function HUD(){
	const hudlength = ((spacewidth/2) - 80)

	this.health = function(){
		if (health > 0){
			var mappedhealth = map(health,0,100,50,(spacewidth/2));
			var healthcol;
			if (health > 70) {healthcol = 'green'} else
			if (health > 40) {healthcol = 'orange'} else
				 					  	 {healthcol = 'red'};

			fill(healthcol);
			push();
			noStroke();
			text("HEALTH",0,spacelength - 1);
			pop();
			rect(50,spacelength - 8,mappedhealth - 50,5)

			return true;
		} else {
			return false;
		}
	}

	this.fuel = function(){
		if (fuel){
			var mappedfuel = map(fuel,0,100,280,spacewidth);
			var fuelcol = "red";
			fill(fuelcol);
			push();
			noStroke();
			text("FUEL",250,spacelength - 1);
			text
			pop();
			rect(280,spacelength - 8,mappedfuel - 280,5)

			rect
			return true;
		}
	}

}

function keyPressed(){
	if (keyCode === UP_ARROW) {
		alert("I didn't fucking say push the UP key did I?");
		document.getElementById("upkey").innerHTML = "I didn't fucking say push the UP key did I?";
	}
	if (keyCode === DOWN_ARROW) {
		alert("I didn't fucking say push the DOWN key did I?");
		document.getElementById("downkey").innerHTML = "I didn't fucking say push the DOWN key did I?";
	}

}
//Increase for each level ->
//resizeCanvas(windowWidth, windowHeight);

function DisplayFinalScore(){
	image(menuframe,100,100,300,150);
	fill('green');
	push();
	noStroke();
	textSize(30)
	text("Distance travelled: ",120,150);
	text(Math.trunc(distance).toString() + " Space miles",120,200);
	pop();
}

function levelup(){
	console.log("Level up!");
	level +=1;
	resizespace(level);
	//inform user - currently dissapears immediately
		image(menuframe,100,100,300,150);
		fill('green');
		push();
		noStroke();
		textSize(30)
		text("LEVEL " + level.toString(),120,150);
		pop();

}

function resizespace(level){
	switch (level) {
		case 2:
			spacelength +=100;
			resizeCanvas(spacewidth,spacelength);
			console.log("level 2");
			document.getElementById("level").innerHTML = "LEVEL 2";
			break;
		case 3:
			spacewidth +=100;
			resizeCanvas(spacewidth,spacelength);
			console.log("level 3");
			document.getElementById("level").innerHTML = "LEVEL 3";
		case 4:
			resizeCanvas(spacewidth + 100,spacelength + 200);
		default:

	}


}
