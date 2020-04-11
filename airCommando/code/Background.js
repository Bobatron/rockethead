class Background {
    cloudsPos1 = 1000;
    cloudsPos2 = 0;

    hillPos1 = 1000;
    hillPos2 = 0;

    treePos1 = 1000;
    treePos2 = 0;

    bushPos1 = 1000;
    bushPos2 = 0;

    constructor() {
        this.sky = loadImage("assets/background.png")

        this.clouds = loadImage("assets/clouds.png");
        this.clouds2 = this.clouds;

        this.hill = loadImage("assets/hill.png");
        this.hill2 = this.hill;

        this.tree = loadImage("assets/distant_trees.png");
        this.tree2 = this.tree;

        this.bush = loadImage("assets/trees_bushes.png");
        this.bush2 = this.bush;
    }

    draw() {
        this.move();
        if (this.cloudsPos1 <= -1000) { this.cloudsPos1 = this.cloudsPos2 + 1000; }
        if (this.cloudsPos2 <= -1000) { this.cloudsPos2 = this.cloudsPos1 + 1000; }

        if (this.hillPos1 <= -1000) { this.hillPos1 = this.hillPos2 + 1000; }
        if (this.hillPos2 <= -1000) { this.hillPos2 = this.hillPos1 + 1000; }

        if (this.treePos1 <= -1000) { this.treePos1 = this.treePos2 + 1000; }
        if (this.treePos2 <= -1000) { this.treePos2 = this.treePos1 + 1000; }

        if (this.bushPos1 <= -1000) { this.bushPos1 = this.bushPos2 + 1000; }
        if (this.bushPos2 <= -1000) { this.bushPos2 = this.bushPos1 + 1000; }


        image(this.sky, 0, 0);
        image(this.clouds, this.cloudsPos1, 0, 1000, 1000);
        image(this.clouds2, this.cloudsPos2, 0, 1000, 1000);

        image(this.hill, this.hillPos1, -300, 1000, 1000);
        image(this.hill2, this.hillPos2, -300, 1000, 1000);

        image(this.tree, this.treePos1, -300, 1000, 1000);
        image(this.tree2, this.treePos2, -300, 1000, 1000);

        image(this.bush, this.bushPos1, -300, 1000, 1000);
        image(this.bush2, this.bushPos2, -300, 1000, 1000);

        this.cloudsPos1 -= 1;
        this.cloudsPos2 -= 1;

        this.hillPos1 -= 2;
        this.hillPos2 -= 2;

        this.treePos1 -= 5;
        this.treePos2 -= 5;
        
        this.bushPos1 -= 10;
        this.bushPos2 -= 10;

    }

    move() {
        if (keyIsDown(LEFT_ARROW) || window.leftX < -0.5) {
            this.cloudsPos1 += 1;
            this.cloudsPos2 += 1;
            this.hillPos1 += 1;
            this.hillPos2 += 1;
            this.treePos1 += 2;
            this.treePos2 += 2;
            this.bushPos1 += 5;
            this.bushPos2 += 5;
        }
        if (keyIsDown(RIGHT_ARROW) || window.leftX > 0.5) {
            this.cloudsPos1 -= 2;
            this.cloudsPos2 -= 2;
            this.hillPos1 -= 4;
            this.hillPos2 -= 4;
            this.treePos1 -= 10;
            this.treePos2 -= 10;
            this.bushPos1 -= 20;
            this.bushPos2 -= 20;


        }
    }
}