var beam;
var explosion;
var explosionSound;

function preload() {
    // initialize sound
    sound = loadSound("assets/bg.mp3");
    explosion = loadImage("assets/boom.png");
    beam = loadImage("assets/beam.png");
    explosionSound = loadSound("assets/explosion.wav");

}

function setup() {
    createCanvas(1000, 500);
    sound.play(0, 1, 0.7);
    jetFighter = new JetFighter();
    backdrop = new Background();
    building = new Building(300);

    boss = new Boss();
}

function draw() {
    text(frameRate(), 10, 10);
    if(collideRectRect(jetFighter.x, jetFighter.y, jetFighter.imgWidth, jetFighter.imgHeight, boss.x, boss.y, boss.imgWidth, boss.imgHeight)){
        jetFighter.dead = true;
    };
    backdrop.draw();
    jetFighter.draw();
    building.draw();
    boss.draw();
    if(jetFighter.bulletCollision(boss.getCoords())){
        boss.hit(1);
    }
    if(boss.laserCollision(jetFighter.getCoords()) && boss.attack){
        jetFighter.hit(1);
    };
    if(boss.restart){
        boss = new Boss();
    }
    if(jetFighter.restart){
        jetFighter = new JetFighter();
    }
}