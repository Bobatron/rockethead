function Fighter(id){
	this.player = id;
	console.log(this.player);
	this.score = 0;
	this.hasTaunted = false;
	this.currentquote = "";
	this.tauntStartTime = 0;
	
	this.getPosition = function(){
		return [this.x, this.y];
	}
	
	if(this.player === 1){
		this.x = 0;
		this.y = height / 2;
		console.log("player2");
	}else {
		this.x = width - 20;
		this.y = height / 2;
		console.log("player1");
	}
	

	this.colr = random(0,255);
	this.colg = random(0,255);
	this.colb = random(0,255);
	
	this.show = function(){
		fill(this.colr,this.colg,this.colb);
		strokeWeight(1);
		rect(this.x,this.y,20,20);
		
		
		
		
		
		
	}
	
	this.move = function(dir){
		if (dir === "up"){
			this.y -= 5;
		}
		if (dir === "down"){
			if (this.y < height - 20){
			this.y = this.y + 5;
			}else{
			this.y -= 1;
			}
		}
		if (dir === "right"){
			this.x += 5;
		}
		if (dir === "left"){
			this.x -= 5;
		}
		
	
		
	}
	this.taunt = function(){
		
		if(this.hasTaunted === false){
			this.currentquote = Quotes[Math.round(random(0,6))];
			this.hasTaunted = true;
			this.tauntStartTime = millis();
			
		} else if (this.hasTaunted === true & millis() - this.tauntStartTime < 30000 ){
			fill(0);
			console.log("test");
			line(this.x + 20, this.y - 5, this.x + 25, this.y - 15); 
			text(this.currentquote, this.x + 30,this.y - 20);
		} else {
			this.hasTaunted = false;
		}

		
		
	}
	
	this.gravity = function(){
		if (this.y < height - 20){
		this.y = this.y + 1;
		}
		
	}


	
}

 function Gun(player){
	this.player = player;
	//this.y =  player.getPosition[1];
	//this.x =  player.getPosition[0];
	this.bullets = [];
	
	
	this.speed = 5;
	//here
	this.shoot = function(Direction, coordinates){
		bullets.push(new Bullets());
		console.log("Shoot! Bullet count = " + bullets.length);
	}
	this.move = function(){
		for (i = 0;i < bullets.length;i++){
			if (bullets[i].direction ==="up"){
				bullets[i].y -=10;
			}
			else if (bullets[i].direction ==="down"){
				bullets[i].y +=10;
			} 
			else if (bullets[i].direction ==="right"){
				bullets[i].x +=10;
			}
			else if (bullets[i].direction ==="left"){
				bullets[i].x -=10;
			}
		}
		
	}
		

	
} 

function Bullets(Direction, coordinates){
	this.direction = Direction;
	this.x = coordinates[0];
	this.y = coordinates[1];//position
	this.size = 2;
	fill(0);
	if (this.direction === "up" || this.direction === "down"){
		line(this.x, this.y,this.x - this.size, this.y);
	}else{
		line(this.x, this.y,this.x, this.y - this.size);	
	}
}