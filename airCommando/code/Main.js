function preload() {
    // initialize sound
    sound = loadSound('assets/bg.mp3');

}

//REFACTOR
// function collision() {
//     if (jetFighter.y > 300 && jetFighter.x >= building.x && jetFighter.x < building.x + 217 && building.destroyed == false) {
//         building.img = building.destroy;
//         building.destroyed = true;
//     }
// }


function setup() {
    createCanvas(1000, 500);
    sound.play();
    jetFighter = new JetFighter();
    background = new Background();
    building = new Building(300);

    //REFACTOR - TREE IS CURRENTLY BLIMP
    tree1 = new Tree(100);
    // tree2 = new Tree(350);
    // tree3 = new Tree(350);
    // tree4 = new Tree(300);
    // tree5 = new Tree(300);
    // tree6 = new Tree(300);
}

function draw() {
    //background(100);
    text(frameRate(), 10, 10);
    background.draw();
    jetFighter.draw();
    building.draw();
    tree1.draw();


    //REFACTOR COLLISION AND TREES
    //collision();
    //tree4.draw();
    //tree5.draw();
    //tree6.draw();
    //tree2.draw();
    //tree3.draw();
}