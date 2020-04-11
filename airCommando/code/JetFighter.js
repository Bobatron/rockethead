class JetFighter {

    constructor() {
        this.gun = loadSound('assets/gun.wav');
        this.x = 0;
        this.y = 0;
        this.jet = loadImage("assets/jet.png");
        this.magazine = 15;
        this.bullets = new Array(this.magazine);
        for(var i = 0; i < this.magazine; i++){
            this.bullets[i] = null;
        }
        this.time = millis();
    }

    draw() {
        this.move();
        //DRAW JET FIGHTER
        image(this.jet, this.x, this.y, this.jet.width / 4, this.jet.height / 4);

        //DRAW BULLETS
        for(var i = 0; i < this.magazine; i++){
            if(this.bullets[i] != null){
                this.bullets[i].draw();
              if(this.bullets[i].x > 1000){this.bullets[i] = null;}

              //REFACTOR
              //if((bullets[i].x > tree1.x && bullets[i].x < tree1.x + 111) && (bullets[i].y > 100 && bullets[i].y < 150)){tree1 = new Explosion(tree1.x, 100);}
            }
          }
    }

    move() {
        if (keyIsDown(LEFT_ARROW) || window.leftX < -0.5) {
            this.x -= 3;
        }
        if (keyIsDown(RIGHT_ARROW) || window.leftX > 0.5) {
            this.x += 3;
        }
        if (keyIsDown(UP_ARROW) || window.leftY < -0.5) {
            if (this.y > 0) { this.y -= 3; }
        }
        if (keyIsDown(DOWN_ARROW) || window.leftY > 0.5) {
            if (this.y < 410) { this.y += 3; }
        }
        if (keyIsDown(CONTROL) || window.xPressed) {

            for (var i = 0; i < this.magazine; i++) {
                if (millis() - this.time > 100) {
                    if (this.bullets[i] === null) {
                        this.bullets[i] = new Bullet(this.x, this.y);
                        this.gun.play();
                        this.time = millis();
                    }
                }
            }
        }
    }
}