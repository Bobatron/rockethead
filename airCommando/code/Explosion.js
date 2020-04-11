class Explosion {

    constructor(posX, posY) {
        this.x = posX;
        this.y = posY;
        this.speed = 10;
    }

    draw() {
        this.x -= this.speed;
        fill(255, 204, 0);
        translate(this.x, this.y);
        noStroke();
        for (var i = 0; i < 10; i++) {
            ellipse(0, 30, 20, 80);
            rotate(PI / 5);
        }

        //REFACTOR
        if (this.x < -100) {
            tree1 = new Tree(100);
        }
    }
}