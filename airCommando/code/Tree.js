class Tree {

    constructor(height) {
        this.img = loadImage("assets/zeppelin.png");
        this.x = random(1000, 1500);
        this.speed = 10;
    }

    draw() {
        this.move();
        this.x -= this.speed;

        image(this.img, this.x, height, this.img.width / 12, this.img.height / 12);

        if (this.x < -100) {
            this.x = random(1000, 1500);
            this.explosion = false;
        }
    }

    move() {
        if (keyIsDown(LEFT_ARROW) || window.leftX < -0.5) {
            this.x += 7;
        }
        if (keyIsDown(RIGHT_ARROW) || window.leftX > 0.5) {
            this.x -= 30;
        }

    }
}