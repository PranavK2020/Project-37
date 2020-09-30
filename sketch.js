//Global Variables
var player, player_running;
var bananaGroup, bananaImage;
var obstacleGroup, obstacleImage;
var backGround, invisibleGround, Score;

function preload(){
  backGround = loadImage("jungle.jpg");
  
  player_running = loadAnimation("Monkey_01.png","Monkey_02.png","Monkey_03.png","Monkey_04.png","Monkey_05.png","Monkey_06.png","Monkey_07.png","Monkey_08.png","Monkey_09.png","Monkey_10.png");
  
  bananaImage = loadImage("Banana.png");
  obstacleImage = loadImage("stone.png");
  
}

function setup() {
  createCanvas(600,400);
  
  backDrop = createSprite(300,150,600,400);
  backDrop.addImage("Jung", backGround);
  backDrop.scale = 1.2;
  backDrop.x = backDrop.width /2;
  backDrop.velocityX = -2;
  
  player = createSprite(75,350,30,50);
  player.addAnimation("running", player_running);
  player.scale = 0.1;
  
  invisibleGround = createSprite(300,360,600,10);
  invisibleGround.visible = false;
  
  bananaGroup = new Group();
  obstacleGroup = new Group();
  
  score = 0;
}


function draw(){
 background("black"); 
  
  if(keyDown("space")) {
    player.velocityY = -16;
  }
  
  player.velocityY = player.velocityY + 0.8
  
  if (backDrop.x < 0){
    backDrop.x = backDrop.width/2;
  }
  
  spawnBanana();
  
  if(bananaGroup.isTouching(player)) {
    bananaGroup.destroyEach();
    score = score + 2;
  }
  
  switch(score) {
    case 10 : player.scale = 0.12;
      break;
    case 20 : player.scale = 0.14;
      break;
    case 30 : player.scale = 0.16;
      break;
    case 40 : player.scale = 0.18;
      break;
  }
  
  spawnObstacle();
  
  if(obstacleGroup.isTouching(player)) {
    obstacleGroup.destroyEach();
    player.scale = 0.1;
    score = 0;
  }
  
  player.collide(invisibleGround);
  
  drawSprites();
  
  stroke("white");
  textSize(20);
  fill("white");
  text("Score: "+ score,500,50);
}

function spawnBanana(){
  if(frameCount % 140 === 0){
    var banana = createSprite(600,Math.round(random(120,200)),30,10);
    banana.addAnimation("banana", bananaImage);
    banana.scale = 0.05;
    banana.velocityX = -6;
    banana.lifetime = 150;
    
    bananaGroup.add(banana);
  }
}

function spawnObstacle(){
  if(frameCount % 300 === 0){
    var obstacle = createSprite(600,350,30,30);
    obstacle.addAnimation("stone", obstacleImage);
    obstacle.scale = 0.15;
    obstacle.velocityX = -4;
    obstacle.lifetime = 150;
    
    obstacleGroup.add(obstacle);
  }
}

