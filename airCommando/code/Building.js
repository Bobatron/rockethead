class Building {

    constructor(height) {
        this.img = loadImage("assets/building.jpg");
        this.x = random(1000, 1500);
        this.speed = 10;
        this.destroy = loadImage("assets/destroy.jpg");
        this.destroyed = false;
    }


    draw() {
        this.move();
        this.x -= this.speed;
        image(this.img, this.x, height, this.img.width, this.img.height);

        if (this.x < -200) {
            this.x = random(1000, 1500);
            this.destroyed = false;
            this.img = loadImage("assets/building.jpg");
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
