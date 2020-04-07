var x = 0;
var y = 0;
var sky;
var sky2;
var distantTree;
var distantTree2;
var pos1 = 1000;
var pos2 = 0;
var scroll = 1000;
var scroll2 = 0;
var bushScroll = 1000;
var bushScroll2 = 0;
var hillScroll = 1000;
var hillScroll2 = 0;
var jetFighter;
var bullets = [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null];
var magazine = 15;
var time;
var gun;
var building;
var bgSky;
var treesBush;
var treesBush2;
var hill;
var hill1;
var enemy;

var sound;
 
function preload()
{
  // initialize sound
  sound = loadSound('assets/bg.mp3');
  gun = loadSound('assets/gun.wav');

}

function Building(height){
  this.img = loadImage("assets/building.jpg");
  this.x = random(1000,1500);
  this.speed = 10;
  this.destroy = loadImage("assets/destroy.jpg");
  this.destroyed = false;


  this.draw = function(){
    this.x -= this.speed;

    image(this.img, this.x, height, this.img.width, this.img.height);
  
    if(this.x < -200){
      this.x = random(1000,1500);
	  this.destroyed = false;
      this.img = loadImage("assets/building.jpg");
    }
    
  }

}

function collision(){
  if(jetFighter.y > 300 && jetFighter.x >= building.x && jetFighter.x < building.x+217 && building.destroyed == false){
      building.img = building.destroy;
	  building.destroyed = true;
  }
}


function Tree(height){
  this.img = loadImage("assets/zeppelin.png");
  this.x = random(1000,1500);
  this.speed = 10;


  this.draw = function(){
    this.x -= this.speed;

    image(this.img, this.x, height, this.img.width/12, this.img.height/12);
  
    if(this.x < -100){
      this.x = random(1000,1500);
      this.explosion = false;
    }
    
  }

}

function setup() {
  createCanvas(1000,500);
  bgSky = loadImage("assets/background.png")
  sky = loadImage("assets/clouds.png");
  hill = loadImage("assets/hill1.png");
  hill1 = loadImage("assets/hill1.png"); 
  distantTree = loadImage("assets/distant_trees.png");
  distantTree2 = distantTree;
  treesBush = loadImage("assets/trees_bushes.png");
  treesBush2 = treesBush;
  sky2 = sky;
  jetFighter = new JetFighter();
  sound.play();
  tree1 = new Tree(100);
  tree2 = new Tree(350);
  tree3 = new Tree(350);
  tree4 = new Tree(300);
  tree5 = new Tree(300);
  tree6 = new Tree(300);
  building = new Building(300);
  time = millis();
}

function draw() {
  //background(100);
  image(bgSky, 0, 0);
  if (pos1 <= -1000){pos1 = pos2+1000;}
  if (pos2 <= -1000){pos2 = pos1+1000;}
  if (scroll <= -1000){scroll = scroll2+1000;}
  if (scroll2 <= -1000){scroll2 = scroll+1000;}
  if (bushScroll <= -1000){bushScroll = bushScroll2+1000;}
  if (bushScroll2 <= -1000){bushScroll2 = bushScroll+1000;}
  if (hillScroll <= -1000){hillScroll = hillScroll2+1000;}
  if (hillScroll2 <= -1000){hillScroll2 = hillScroll+1000;}
  image(sky, pos2, 0, 1000, 1000);
  image(sky2, pos1, 0, 1000, 1000);
  image(hill,hillScroll2,-300, 1000, 1000);
  image(hill1,hillScroll,-300, 1000, 1000);
  image(distantTree,scroll2,-300, 1000, 1000);
  image(distantTree2,scroll,-300, 1000, 1000);
  image(treesBush,bushScroll2,-300, 1000, 1000);
  image(treesBush2,bushScroll,-300, 1000, 1000);
  text(frameRate(), 10, 10);
  bushScroll -= 10;
  bushScroll2 -= 10;
  scroll-=5;
  scroll2-=5;
  hillScroll -=2;
  hillScroll2 -=2;
  pos1-=1;
  pos2-=1;
  collision();
  //tree4.draw();
  //tree5.draw();
  //tree6.draw();
  //tree2.draw();
  //tree3.draw();
  jetFighter.draw();
  jetFighter.move();
  for(var i = 0; i < magazine; i++){
      if(bullets[i] != null){
        bullets[i].fire();
        if((bullets[i].x > tree1.x && bullets[i].x < tree1.x + 111) && (bullets[i].y > 100 && bullets[i].y < 150)){tree1 = new Explosion(tree1.x, 100);}
        if(bullets[i].x > 1000){bullets[i] = null;}
      }
    }
  //building.draw();
  tree1.draw();
  

  
}

function JetFighter(){
  this.x = 0;
  this.y = 0;
  this.jet = loadImage("assets/jet.png");

  this.draw = function(){
    image(this.jet, this.x, this.y, this.jet.width/4, this.jet.height/4);
  }

  this.move = function(){
    if (keyIsDown(LEFT_ARROW)) {
        this.x -= 3;
        pos1 += 1;
        pos2 += 1;
        hillScroll +=1;
        hillScroll2 +=1;
        scroll += 2;
        scroll2 += 2;
        bushScroll += 5;
        bushScroll2 += 5;
        tree1.x += 7;
        tree2.x += 7;
        tree3.x -= 7;
        tree4.x += 7;
        tree5.x += 7;
        tree6.x += 7;
        building.x += 7;
      }
      if (keyIsDown(RIGHT_ARROW)) {
        this.x += 3;
        pos1 -= 2;
        pos2 -=2;
        hillScroll -=4;
        hillScroll2 -=4;
        scroll -= 10;
        scroll2 -= 10;
        bushScroll -= 20;
        bushScroll2 -= 20;
        tree1.x -= 30;
        tree2.x -= 30;
        tree3.x -= 30;
        tree4.x -= 30;
        tree5.x -= 30;
        tree6.x -= 30;
        building.x -= 30;

      }
      if (keyIsDown(UP_ARROW)) {
        if(this.y > 0){
        this.y -= 3;
      }
      }
      if (keyIsDown(DOWN_ARROW)) {
        if(this.y < 410){this.y += 3;}
      }
      if(keyIsDown(CONTROL)){
        
        for(var i = 0; i < magazine; i++){
          if(millis() - time > 100){
          if(bullets[i] === null){
        bullets[i] = new Bullets();
        gun.play();
        time = millis();
      }
      }
    }
      }

  }

}

function Bullets(){
  this.x = jetFighter.x+128;
  this.y = jetFighter.y+83;
  fill(255, 204, 0);
  this.bullet = ellipse(this.x, this.y, 10, 10);

  this.fire = function(){
    fill(255);
    if(this.x < 1001){
    this.bullet = rect(this.x += 10, this.y, 15, 5);
  }
  }

}

function Explosion(posX, posY){
  this.x = posX;
  this.y = posY;
  this.speed = 10;


  this.draw = function(){
    this.x -= this.speed;
        fill(255, 204, 0);
        translate(this.x, this.y);
        noStroke();
        for (var i = 0; i < 10; i ++) {
        ellipse(0, 30, 20, 80);
        rotate(PI/5);
  }

    if(this.x < -100){
      tree1 = new Tree(100);
    }
    
  }

}

