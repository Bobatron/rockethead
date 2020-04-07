function Rain(){
		this.x = Math.round(random(0, width));
		this.y = Math.round(random(0, -500));
		this.direction = 1;
		var stroke = Math.round(random(1,5));
		
		this.display = function(){
			strokeWeight(stroke);
			//stroke(128,0,128);
			line(this.x, this.y, this.x, (this.y + 20));
		}
		this.move = function(){
			this.y = this.y += (stroke*3)*this.direction;
			if (this.y > height || this.y < -600){
				this.y = random(0, -100);
				this.x = Math.round(random(0, width));
				//this.direction *= -1;
			}
			
		}
		
		this.getPosition = function(){
			return [this.x, this.y];
		}


	}	
	//rain should stop at flood line