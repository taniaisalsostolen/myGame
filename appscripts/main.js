//http://speckyboy.com/demo/windmill-demo/index.html
require(
    [],
    function () {
            
        console.log("yo, I'm alive!");

        //audio 
        var backgroundSound = new Audio("resources/background.wav");
        backgroundSound.play();
        backgroundSound.loop = true;

        var gameoverSound = new Audio("resources/gameover.wav");
        gameoverSound.autoplay = false; 
       
        var paper = new Raphael(document.getElementById("mySVGCanvas"));

        var counter = 0;
        var maxCount = 10;
        var starttime;
        var totaltime;
        var randomSquare = setInterval(moveSquare, setInterval);

        var startButton = paper.circle(300, 200, 40);
        var startText = paper.text(300, 200, 'START');
        startButton.attr({
        	stroke: "black",
        	fill: "white"
        });

        //This is to generate a random number to change coordinates of the squares so we can change the direction of the square. 
        //We used -0.5 to shift the range into the negative number zone as we want the square to be able to move in different directions. 
        var randNumber = function() {
            return Math.random()-0.5;
        }

        //Making the X and Y directions (i.e. coordinates) of the square random 
        var xdirection = randNumber();
        var ydirection = randNumber();

        //Setting level of difficulty for the game. Defined in ready function.
        var difficulty; 
        //Setting the rate in which the square moves.
        var rate; 

        startButton.hide();
        startText.hide();

        //Intro prompt to select difficulty as well as linking the level of difficulty to a corresponding rate. 
        var ready = function(){
        	difficulty = prompt("Welcome to the game!\nIn this game, you have to click on as many moving white squares as you can within 10 seconds.\nChoose a difficulty from level 1 to 3 by entering either 1 (easy), 2 (medium) or 3 (hard) in the space below.");
        	if (difficulty==1){
        		rate=5
        	} else if (difficulty==2){
        		rate=10
        	} else if (difficulty==3){
        		rate=15
        	}  
        	startButton.show();
        	startText.show();
            backgroundSound.play();
        }

        var timer;

        var start = function (){
        	console.log("game is starting");
        	startButton.hide();
        	startText.hide();
        	timer = setTimeout( function(ev){ endGame=true; alert("Time's up!")}, 10000); //To set the game to run for a fixed amount of time.
        	counter = 0;
        	starttime = Date.now();
        	console.log("time = " + starttime);
            //anchoring the starting position of the square
            rect1.attr({
                    x: 250,
                    y: 150
                });
        	randomSquare = setInterval(moveSquare, 1);
        }

        startButton.node.addEventListener('click', start);

        //-----------------------------------------

        var rect1 = paper.rect(-100,-100,100, 100);
        rect1.attr({
            'fill': "#FFFFFF",
            'stroke': '#3b4449',
            'stroke-width': 3,
            'stroke-linejoin': 'round',
            'opacity': .75
        });


        //To tell whether the game has ended 
        var endGame = false; 


        var moveSquare = function(){

        	console.log("your square move count is now " + counter);

        	if (endGame){
                
                //Adding the Game Over audio when the time is up 
                backgroundSound.pause();
                gameoverSound.play();

                //The score displayed at the end is the number of clicks on the target the user made.
                confirm("You have made " + counter + " clicks in 10 seconds!");  
        		clearInterval(randomSquare);
        		clearInterval(timer);
                rect1.attr({
                    x: -100,
                    y: -100
                });
                //To reset the entire game 
                endGame = false; 
                ready();

        	} else {

                var xpos = rect1.attr("x")
                var ypos = rect1.attr("y")

                console.log("x=" + xpos + " , y=" + ypos)

                //Linked to the difficulty of the game. 
                xpos += rate*xdirection
                ypos += rate*ydirection

                rect1.attr({
                    x: xpos,
                    y: ypos
                })

                //When the edge is reached, it will change the square's direction to a random direction. 
                //The rect1.attr() is used to limit the area in which the square moves within. 
                if (xpos > 500) {xdirection = randNumber(); ydirection=randNumber(); rect1.attr("x", 500);}
                if (ypos > 300) {ydirection = randNumber(); xdirection=randNumber(); rect1.attr("y", 300)};
                if (xpos < 0) {xdirection = randNumber(); ydirection=randNumber(); rect1.attr("x", 0);}
                if (ypos < 0) {ydirection = randNumber(); xdirection=randNumber(); rect1.attr("y", 0)};
                };
            }

        //Increasing the counter by one whenever the user clicks the square.
        rect1.node.addEventListener('click', function(){counter++});  

  

        ready(); // Put the start button on the screen 
    
});