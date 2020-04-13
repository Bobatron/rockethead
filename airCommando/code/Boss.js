class Boss {
    constructor() {
        this.imgSwap = 0;
        this.laserSound = loadSound('assets/laser.wav');
        this.hitSound = loadSound('assets/hitSound.wav');

        this.img1 = loadImage("assets/zeppelin1.png");
        this.img2 = loadImage("assets/zeppelin2.png");
        this.imgHit = loadImage("assets/zeppelinHit.png");
        this.imgAttack = loadImage("assets/zeppelinAttack.png");
        this.imgDead = loadImage("assets/zeppelinDead.png");

        this.laser = new Sprite(window.beam, 192, 192, 5, 5, 0.1, true);
        this.explosion = new Sprite(window.explosion, 128, 128, 8, 8, 1, true);

        this.x = 1200;
        this.y = 0;
        this.imgWidth = 294.25;
        this.imgHeight = 167.125;

        this.xSpeed;
        this.ySpeed;
        this.yDirection = "DOWN";
        this.xDirection = "LEFT";

        this.drawImg = this.img1;
        this.sequenceID = 0;

        this.health = 500;

        this.xLaser;
        this.yLaser;
        this.xBeam = 10;
        this.yBeam = 30;

        this.time;
        this.attack = false;
        this.dead = false;

        this.hitTime;
        this.explosion;
        this.restart = false;
    }

    fireLaser() {
        this.xLaser = this.x + 35;
        this.yLaser = this.y + 75;

        if (millis() - this.time > 1000) {
            this.laser.draw(this.xLaser, this.yLaser, this.xBeam, this.yBeam);
            this.laserSound.play(0, 1, 0.1);
            if (this.xBeam > -650) { this.xBeam -= 25; }
        }
        if (millis() - this.time > 5000) {
            this.attack = false;
            this.xBeam = 10;
            this.time = millis();
        }
    }

    laserCollision(location) {
        var result = collideRectRect(location[0], location[1], location[2], location[3], this.xLaser + this.xBeam, this.yLaser, this.xBeam * -1, this.yBeam);
        return result;
    }

    getCoords() {
        return [this.x, this.y, this.imgWidth, this.imgHeight];
    }

    hit(damage) {
        this.health -= damage;
        this.hitTime = millis();
        this.hitSound.play(0, 1, 0.8);
    }

    draw() {
        this.move();
        textSize(32);
        fill(0, 102, 153);
        text("BOSS HEALTH: " + this.health, 600, 30);
        
        if (!this.dead) {
            if (this.attack) {
                image(this.imgAttack, this.x, this.y, this.imgWidth, this.imgHeight);
                this.fireLaser();
            } else {
                if (this.imgSwap % 15 == 0) { this.swap() };
                image(this.drawImg, this.x, this.y, this.imgWidth, this.imgHeight);
                this.imgSwap++;
            }
            if (millis() - this.hitTime < 100) {
                image(this.imgHit, this.x, this.y, this.imgWidth, this.imgHeight);
            }
        } else {
            image(this.imgDead, this.x, this.y, this.imgWidth, this.imgHeight);
            this.explosion.draw(this.x, this.y);
            if (this.y % 50 > 25) { window.explosionSound.play(0, 1, 0.8); }
            if (this.y > 600) {
                this.restart = true;
            }
        }


    }

    swap() {
        if (this.drawImg === this.img1) { this.drawImg = this.img2 }
        else { this.drawImg = this.img1 };
    }

    move() {
        if (this.sequenceID == 0) {
            this.entrance();
        } else if (this.sequenceID == 1) {
            this.middle();
        } else if (this.sequenceID == 2) {
            this.end();
        } else if (this.sequenceID == 3) {
            this.deadBoss();
        }
        this.x -= this.xSpeed;
        this.y += this.ySpeed;
    }

    entrance() {
        if (this.x > 600) {
            this.xSpeed = 2;
            this.ySpeed = 0;
        }
        else {
            this.sequenceID = 1;
            this.yDirection = "DOWN";
            this.ySpeed = 2;
            this.xSpeed = 0;
            this.time = millis();
        }
    }

    middle() {
        if (this.health <= 200) {
            this.sequenceID = 2;
            this.ySpeed = 2;
            this.yDirection = "DOWN";
            this.xDirection = "RIGHT";
            this.time = millis();
            this.xSpeed = -2;
        }
        if (this.y > (500 - (this.drawImg.height / 8)) && this.yDirection === "DOWN") {
            this.ySpeed = -2;
            this.yDirection = "UP";
        } else if (this.y < 0 && this.yDirection === "UP") {
            this.ySpeed = 2;
            this.yDirection = "DOWN";
        }
        if (millis() - this.time > 5000 && this.attack == false) {
            this.attack = true;
            this.time = millis();
        }
    }

    end(){
        if (this.y > 500 - this.imgHeight && this.yDirection === "DOWN") {
            this.ySpeed = -2;
            this.yDirection = "UP";
        } else if (this.y < 0 && this.yDirection === "UP") {
            this.ySpeed = 2;
            this.yDirection = "DOWN";
        }
        if (this.x > 1000 - this.imgWidth && this.xDirection === "RIGHT") {
            this.xSpeed = 2;
            this.xDirection = "LEFT";
        } else if (this.x < 0 && this.xDirection === "LEFT") {
            this.xSpeed = -2;
            this.xDirection = "RIGHT";
        }
        if (millis() - this.time > 500 && this.attack == false) {
            this.attack = true;
            this.time = millis();
        }
        if (this.health <= 0) {
            this.sequenceID = 3;
            this.ySpeed = 2;
            this.dead = true;
        }

    }

    deadBoss(){
        this.xSpeed = 2;
        this.ySpeed = 2;
    }
}