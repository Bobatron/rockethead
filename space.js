let ship;
let shipimg,shipimg2,astimg,fruitimg1,fruitimg2,fruitimg3;
let bullets = [];
let stars = [];
let shipspeed = 5;
let shipspeedlimit = 100;
let ast = [];
let spacelength = 500;
let spacewidth = 500;
let asteroidfieldsize = 10;
let health = 100;

function preload(){
	shipimg = loadImage('assets/ship.png');
	shipimg2 = loadImage('assets/shipzoom.png');
	astimg = loadImage('assets/asteroid.png');
	fruitimg1 = loadImage('assets/apple.png');
	fruitimg2 = loadImage('assets/strawb.png');
	fruitimg3 = loadImage('assets/cherry.png');

}

function setup() {
  var cnv = createCanvas(spacewidth, spacelength);
  var x = (windowWidth - width) / 2;
  var y = (windowHeight - height) / 2;
  cnv.position(x, y);
  background(0);

  ship = new player();

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

	ship.show();
	ship.move();
	ship.shoot();

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
	DisplayHealth();




}


class player{
	constructor(){
		this.x = 235;
		this.y = 450;
		this.size = 50;


	}

	getpos(){
		return [this.x,this.y];
	}

	show(){
		//translate(-(this.size/2),-(this.size/2))
		if (keyIsDown(ESCAPE)) {
			//hyperspeed
			image(shipimg2,this.x,this.y,this.size, this.size);
			if (shipspeed <= shipspeedlimit){
			shipspeed += 1;
			}
		} else {
			shipspeed = 5;
			image(shipimg,this.x,this.y,this.size, this.size);
			// stroke(0);
			// rect(this.x, this.y, this.size, this.size);
		}


	}

	move(){

	  if (keyIsDown(LEFT_ARROW) && ship.x > (this.size/2)) {
		ship.x -= 5;
	  }

	  if (keyIsDown(RIGHT_ARROW) && ship.x < width -(this.size/2)) {
		ship.x += 5;
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
		this.x = random(50,width);
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
			this.x = random(50,width);
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

function Displayspeed(){
	document.getElementById("speed").innerHTML = "Speed: " +shipspeed.toString() + " Space miles per hour";

}

function DisplayHealth(){
	if (health > 0){
		var mappedhealth = map(health,0,100,50,spacewidth - 80);
		var healthcol;
		if (health > 70) {healthcol = 'green'} else
		if (health > 40) {healthcol = 'orange'} else
		{healthcol = 'red'};
		fill(healthcol);
		push();
		noStroke();
		text("Health",0,spacelength - 1);
		pop();
		rect(50,spacelength - 8,mappedhealth,5)
		return true;
	} else {
		return false;
	}



}
//Increase for each level ->
//resizeCanvas(windowWidth, windowHeight);
