var path, mainCyclist;
var player1, player2, player3;
var pathImg, mainRacerImg1, mainRacerImg2;

var oppPink1Img, oppPink2Img;
var oppYellow1Img, oppYellow2Img;
var oppRed1Img, oppRed2Img;
var gameOverImg, cycleBell;

var pinkCG, yellowCG, redCG;

var END = 0;
var PLAY = 1;
var gameState = PLAY;

var distance = 0;
var gameOver, restart;

//to pre load images and sounds
function preload() {

    pathImg = loadImage("images/Road.png");
    mainRacerImg1 = loadAnimation("images/mainPlayer1.png", "images/mainPlayer2.png");
    mainRacerImg2 = loadAnimation("images/mainPlayer3.png");

    oppPink1Img = loadAnimation("images/opponent1.png", "images/opponent2.png");
    oppPink2Img = loadAnimation("images/opponent3.png");

    oppYellow1Img = loadAnimation("images/opponent4.png", "images/opponent5.png");
    oppYellow2Img = loadAnimation("images/opponent6.png");

    oppRed1Img = loadAnimation("images/opponent7.png", "images/opponent8.png");
    oppRed2Img = loadAnimation("images/opponent9.png");

    cycleBell = loadSound("sound/bell.mp3");
    gameOverImg = loadImage("r.png");
}

function setup() {

    //to create canvas
    createCanvas(1200, 300);

    // Moving background
    path = createSprite(100, 150);
    path.addImage(pathImg);
    path.velocityX = -8;

    //creating boy running
    mainCyclist = createSprite(70, 150);
    mainCyclist.addAnimation("SahilRunning", mainRacerImg1);
    mainCyclist.scale = 0.07;

    //set collider for mainCyclist
    mainCyclist.setCollider("rectangle", 0, 0, 1300, 1300);
    mainCyclist.debug = false;

    //to add gameover image
    gameOver = createSprite(650, 150);
    gameOver.addImage(gameOverImg);
    gameOver.scale = 0.8;
    gameOver.visible = false;

    //to create group
    pinkCG = new Group();
    yellowCG = new Group();
    redCG = new Group();

}

function draw() {

    //to give background
    background(0);

    //to check ig game state is play
    if (gameState === PLAY) {

        //to control the speed of distance
        distance = distance + Math.round(getFrameRate() / 50);

        //to increase the velocity of distance as the score increases by 150
        path.velocityX = -(6 + 2 * distance / 150);

        //to move the cyclist with mouse
        mainCyclist.y = World.mouseY;

        //to create edges and collide maincyclist with it
        edges = createEdgeSprites();
        mainCyclist.collide(edges);

        //code to reset the background
        if (path.x < 0) {
            path.x = width / 2;
        }

        //code to play cycle bell sound
        if (distance > 0 && distance % 150 === 0) {
            cycleBell.play();
        }

        //creating continous opponent players
        var select_oppPlayer = Math.round(random(1, 3));

        //to display random cyclist
        if (World.frameCount % 150 == 0) {
            if (select_oppPlayer == 1) {
                pinkCyclists();
            } else if (select_oppPlayer == 2) {
                yellowCyclists();
            } else {
                redCyclists();
            }
        }

        //to check if pink cyclist is touching the main cyclist
        if (pinkCG.isTouching(mainCyclist)) {
            gameState = END;
            player1.velocityY = 0;
            player1.addAnimation("opponentPlayer1", oppPink2Img);
        }

        //to check if yellow cyclist is touching the main cyclist
        if (yellowCG.isTouching(mainCyclist)) {
            gameState = END;
            player2.velocityY = 0;
            player2.addAnimation("opponentPlayer2", oppYellow2Img);
        }

        //to check if red cyclist is touching the main cyclist
        if (redCG.isTouching(mainCyclist)) {
            gameState = END;
            player3.velocityY = 0;
            player3.addAnimation("opponentPlayer3", oppRed2Img);
        }

    } else if (gameState === END) {  //to check if game state is end

        gameOver.visible = true;


        //to stop the path and main cyclist and change cyclist animation
        path.velocityX = 0;
        mainCyclist.velocityY = 0;
        mainCyclist.addAnimation("SahilRunning", mainRacerImg2);

        //to stop the pink cyclist set its lifetime to -1
        pinkCG.setVelocityXEach(0);
        pinkCG.setLifetimeEach(-1);

        //to stop the yellow cyclist set its lifetime to -1
        yellowCG.setVelocityXEach(0);
        yellowCG.setLifetimeEach(-1);

        //to stop the red cyclist set its lifetime to -1
        redCG.setVelocityXEach(0);
        redCG.setLifetimeEach(-1);

        // condition for calling reset( ) if 'R' is pressed
        if (keyDown("r")) {
            reset();
        }
    }
    //to create sprites
    drawSprites();

    //to display distance
    textSize(20);
    fill(255);
    text("Distance: " + distance, 900, 30);
}

//function to create pink cyclist
function pinkCyclists() {
    player1 = createSprite(1100, Math.round(random(50, 250)));
    player1.scale = 0.06;
    player1.velocityX = -(8 + 2 * distance / 150);
    player1.addAnimation("opponentPlayer1", oppPink1Img);
    player1.setLifetime = 170;
    pinkCG.add(player1);
}

//function to create yellow cyclist
function yellowCyclists() {
    player2 = createSprite(1100, Math.round(random(50, 250)));
    player2.scale = 0.06;
    player2.velocityX = -(8 + 2 * distance / 150);
    player2.addAnimation("opponentPlayer2", oppYellow1Img);
    player2.setLifetime = 170;
    yellowCG.add(player2);
}

//function to create red cyclist
function redCyclists() {
    player3 = createSprite(1100, Math.round(random(50, 250)));
    player3.scale = 0.06;
    player3.velocityX = - (8 + 2 * distance / 150);
    player3.addAnimation("opponentPlayer3", oppRed1Img);
    player3.setLifetime = 170;
    redCG.add(player3);
}

//to create reset function 
function reset() {

    //to change game state to play
    gameState = PLAY;

    //to disappear the game over image
    gameOver.visible = false;

    //to change animation of cyclist
    mainCyclist.addAnimation("SahilRunning", mainRacerImg1);

    //to destroy all cyclist
    pinkCG.destroyEach();
    yellowCG.destroyEach();
    redCG.destroyEach();

    //to reset the distance to '0' again
    distance = 0;
}