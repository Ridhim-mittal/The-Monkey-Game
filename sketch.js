

var PLAY = 1;
var END = 0;
var gameState = PLAY;

var monkey , monkey_running, monkeyDead;
var banana ,bananaImage, obstacleImage;
var FoodGroup, obstacleGroup;
var score;
var ground;

var restart, restartImage , gameOver, gameOverImage;


function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
  
  restartImage = loadImage("restart.png");
  gameOverImage = loadImage("gameOver.png");
  
  monkeyDead = loadAnimation("sprite_1.png");
 
}



function setup() {
  createCanvas(400,400);
  
 
  monkey = createSprite(50,280);
  monkey.addAnimation("running",monkey_running);
  monkey.addAnimation("dead",monkeyDead);
  monkey.scale = 0.15;
  monkey.setCollider("rectangle",0,0,monkey.width,monkey.height);
  
  
  ground = createSprite(250,330,800,10);
  ground.shapeColor = "brown";
  ground.x = ground.width/2;
  
  restart = createSprite(200,210);
  restart.addImage(restartImage);
  restart.scale = 0.5;
  
  gameOver = createSprite(200,160);
  gameOver.addImage(gameOverImage);
  gameOver.scale = 0.5;
  
  
  score = 0;
  
  foodGroup = createGroup();
  
  obstacleGroup = createGroup();
  

  
}


function draw() {

  background("lightgreen");
  
  
  
  if(gameState === PLAY){
  spawnFood();
  
  spawnObstacle(); 
    
   if(keyDown("SPACE") && monkey.y > 275){
    monkey.velocityY = -15;
    }
  
   monkey.velocityY = monkey.velocityY+1;
  
  monkey.collide(ground);
  
  ground.velocityX = -5;
  
  if (ground.x < 0){
    ground.x = ground.width/2;
    
    } 
    
  if(foodGroup.isTouching(monkey)){
    foodGroup.destroyEach();
    }  
    
  score =Math.ceil(frameCount/frameRate());
    
  gameOver.visible = false;
  restart.visible = false;
    
  }
  
  if (obstacleGroup.isTouching(monkey)){

    gameState = END;
  }
  
     if (gameState === END){
       
       monkey.changeAnimation("dead");
      
      gameOver.visible = true;
      restart.visible = true;
      
      monkey.velocityY = 0;
      ground.velocityX = 0;
      
      
      obstacleGroup.setLifetimeEach(-1);
      foodGroup.setLifetimeEach(-1);
      obstacleGroup.setVelocityXEach(0);
      foodGroup.setVelocityXEach(0)
       
      if(mousePressedOver(restart)){
        
        reset();
      } 
    }
  
  

 
  
  
  
  drawSprites();
  
  fill("black");
  stroke("white");
  textFont("Georgia");
  textSize(18);
  text("Survival Time: "+score,140,40)
}


function spawnFood() {
  
  if(frameCount % 85=== 0){
  var banana = createSprite(420,200);
  banana.addImage(bananaImage);
  banana.scale = 0.1;
  banana.y = Math.round(random(140,220));
  banana.velocityX = -10;
  banana.lifetime = 50; 
    
     monkey.depth = banana.depth;
   monkey.depth = monkey.depth+1
  
    
  foodGroup.add(banana);
  
  }
  
  }


function spawnObstacle() {
  
  if(frameCount % 300=== 0){
  var obstacle = createSprite(400,295);
  obstacle.addImage(obstacleImage);
  obstacle.scale = 0.15;
  obstacle.velocityX = -8;
  obstacle.lifetime = 100;
    
  obstacleGroup.add(obstacle);  
    
  }
  
}


function reset(){
 
  gameState = PLAY
  
  score = 0;
  
  obstacleGroup.destroyEach();
  
  foodGroup.destroyEach();
  
  gameOver.visible = false;
  
  restart.visible = false;
  
  monkey.changeAnimation("running", monkey_running);
  
  monkey.y = 280;
  
 
}






