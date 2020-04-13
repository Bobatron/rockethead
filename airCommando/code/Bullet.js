class Bullet {
    constructor(startX, startY) {
        this.x = startX + 128;
        this.y = startY + 83;
        fill(255, 204, 0);
        this.bullet = ellipse(this.x, this.y, 10, 10);
    }

    getCoords(){
        return [this.x, this.y, 10, 10];
    }

    draw() {
        fill(255);
        if (this.x < 1001) {
            this.bullet = rect(this.x += 10, this.y, 15, 5);
        }
    }
}