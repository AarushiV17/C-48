var bg , bgImg ;
var soil , soilImg;
var seed , trash1 , trash2 , trash3;
var boy , boyImg ;
var score = 0 ;
var START = 0;
var PLAY = 1;
var END = 2;
var gameState = START;
var gameOver , gameOverImg;
var restart , restartImg ;

function preload(){
  bgImg = loadImage("bg.jpg");
  soilImg = loadImage("soil3.png");
  boyImg = loadAnimation("boy1.png","boy2.png","boy3.png","boy4.png");
  boyImg2 = loadImage("boy5.png");
  seed = loadImage("seed.png");
  seed3 = loadImage("seed3.png");
  trash1 = loadImage("trash1.png");
  trash2 = loadImage("trash2.png");
  trash3 = loadImage("trash3.png");
  gameOverImg = loadImage("gameOver.png");
  restartImg = loadImage("restart.png")
}

function setup(){
  createCanvas(windowWidth, windowHeight);
  
  soil = createSprite(0,height-50,windowWidth,50);
  soil.addImage("soil",soilImg);
  soil.scale = 0.4

  boy = createSprite(50,height-100);
  boy.addAnimation("boy",boyImg);
  boy.addAnimation("boy2",boyImg2)
  boy.scale = 0.7;

  gameOver = createSprite(width/2,height/2-100);
  gameOver.addImage(gameOverImg);

  restart = createSprite(width/2,height/2+20);
  restart.addImage(restartImg);
  restart.scale = 0.3;

  obstaclesGroup = createGroup();
  saplingGroup = createGroup();
  
}

function draw(__) {
  background(bgImg);

  if(gameState === START){
  fill("black");
  textSize(30);
  textFont("Baskerville Com");
  text("Make sure the boy is collecting ",width/2,height-600);
  text("only the garbage",width/2,height-570)
  text("Press space to start",width/2,height/2)

  gameOver.visible = false;
  restart.visible = false;

  if(keyCode === 32){
    gameState = PLAY;
  }

  }
  else if (gameState === PLAY){

    fill("white");
  textSize(30);
  textFont("algerian");
  text("Score: "+ score, 50,50);

  boy.x = World.mouseX;
  
  if(obstaclesGroup.isTouching(boy)){
    obstaclesGroup.destroyEach();
    boy.changeAnimation("boy2",boyImg2);
    score = score + Math.round(getFrameRate()/60);
  }


  if(saplingGroup.isTouching(boy)){
    saplingGroup.destroyEach();
    gameState = END;
    boy.changeAnimation("boy",boyImg)
  }

  if(obstaclesGroup.isTouching(soil)){
    obstaclesGroup.destroyEach();
  }

  if(saplingGroup.isTouching(soil)){
    saplingGroup.destroyEach();
  }
  
spawnObstacles();
spawnSapling();
  } 
  else{

 gameOver.visible = true;
 restart.visible = true;

 if(mousePressedOver(restart)) {
  reset();
}

  }



  drawSprites();
}

function reset(){

 gameState = START;
 restart.visible = false;
 gameOver.visible = false;
 obstaclesGroup.destroyEach();
 saplingGroup.destroyEach();
 score = 0;
 boy.changeAnimation("boy",boyImg)
  
}


function spawnObstacles() {
  if (frameCount % 120 === 0){
var obstacle = createSprite(Math.round(random(width-50,0),20,20))
obstacle.scale = 0.5;
obstacle.velocityY = (6 + score/100);

var rand = Math.round(random(1,3));
switch (rand){
  case 1: obstacle.addImage(trash1);
  break;
  case 2: obstacle.addImage(trash2);
  break;
  case 3 : obstacle.addImage(trash3);
  break;
  default: break;
}
obstaclesGroup.add(obstacle);
  }
}

function spawnSapling() {
  if (frameCount % 150 === 0){
var sapling = createSprite(Math.round(random(width-50,0),20,20))
sapling.velocityY = 3;
sapling.scale = 0.5;

var rand = Math.round(random(1,2));
switch (rand){
  case 1: sapling.addImage(seed);
  break;
  case 2: sapling.addImage(seed3);
  break;
  default: break;
}
saplingGroup.add(sapling);
  }
}

