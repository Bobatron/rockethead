class JetFighter {

    constructor() {
        this.gun = loadSound('assets/gun.wav');
        this.x = 0;
        this.y = 0;
        this.imgWidth = 160;
        this.imgHeight = 103.5;
        this.jet = loadImage("assets/jet.png");
        this.jetHit = loadImage("assets/jetHit.png");
        this.magazine = 15;
        this.bullets = new Array(this.magazine);
        for (var i = 0; i < this.magazine; i++) {
            this.bullets[i] = null;
        }

        this.explosion = new Sprite(window.explosion, 128, 128, 8, 8, 1, true);

        this.time = millis();

        this.health = 100;
        this.dead = false;
        this.restart = false;

        this.hitTime;
    }

    hit(damage) {
        this.health -= damage;
        this.hitTime = millis();
    }

    getCoords() {
        return [this.x, this.y, this.imgWidth, this.imgHeight];
    }

    draw() {
        textSize(32);
        fill(0, 102, 153);
        text("JET HEALTH: " + this.health, 30, 30);
        if(this.health <= 0){
            this.dead = true;
        }
        if (!this.dead) {
            this.move();
            //DRAW JET FIGHTER
            image(this.jet, this.x, this.y, this.imgWidth, this.imgHeight);
            if (millis() - this.hitTime < 100) {
                image(this.jetHit, this.x, this.y, this.imgWidth, this.imgHeight);
            }

            //DRAW BULLETS
            for (var i = 0; i < this.magazine; i++) {
                if (this.bullets[i] != null) {
                    this.bullets[i].draw();
                    if (this.bullets[i].x > 1000) { this.bullets[i] = null; }

                    //REFACTOR
                    //if((bullets[i].x > tree1.x && bullets[i].x < tree1.x + 111) && (bullets[i].y > 100 && bullets[i].y < 150)){tree1 = new Explosion(tree1.x, 100);}
                }
            }
        } else {
            this.x += 3;
            this.y += 3;
            image(this.jet, this.x, this.y, this.imgWidth, this.imgHeight);
            this.explosion.draw(this.x, this.y);
            if (this.y % 50 > 25){window.explosionSound.play(0, 1, 0.5);}
            if(this.y > 600){
                this.restart = true;
            }
        }
    }

    bulletCollision(location) {
        for (var i = 0; i < this.magazine; i++) {
            if (this.bullets[i] != null) {
                if (this.bullets[i].x > location[0]
                    && this.bullets[i].x < location[0] + location[2]
                    && this.bullets[i].y > location[1]
                    && this.bullets[i].y < location[1] + location[3]
                ) {
                    this.bullets[i] = null;
                    return true;
                }
                //REFACTOR
                //if((bullets[i].x > tree1.x && bullets[i].x < tree1.x + 111) && (bullets[i].y > 100 && bullets[i].y < 150)){tree1 = new Explosion(tree1.x, 100);}
            }
        }
        return false;
    }

    move() {
        if (keyIsDown(LEFT_ARROW) || window.leftX < -0.5) {
            if (this.x > 0) { this.x -= 5; }
        }
        if (keyIsDown(RIGHT_ARROW) || window.leftX > 0.5) {
            this.x += 5;
        }
        if (keyIsDown(UP_ARROW) || window.leftY < -0.5) {
            if (this.y > -30) { this.y -= 5; }
        }
        if (keyIsDown(DOWN_ARROW) || window.leftY > 0.5) {
            if (this.y < 410) { this.y += 5; }
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