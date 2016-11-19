/*
*   All code owned by Ruchir Bapat, Copyright 2016, All Rights Reserved
*   The code is licensed under: Apache 2.0
*/

//Create Renderer
var Screen = new Renderer();

//Make sure the Renderer was created
Check(Screen);

//Set the canvas colour
Screen.SetBackgroundColour(new Colour(240, 240, 240, 1));

//Create a new Player
var Player = new Player(new Vector2(Screen.Width / 2, Screen.Height / 2), new Vector2(40, 40), new Colour(108, 218, 218, 1));

//Make sure the Player was created
Check(Player);

//Create a new Box
var TestBox = new Box(new Vector2(0, Screen.Height), new Vector2(Screen.Width, 40), new Colour(222, 118, 149, 1));

//Make sure the Box was created
Check(TestBox);

//Variables
var collidable = []; //Holds all collidable objects
const FPS = 90; //Framerate to run at
const GRAVITY = 0.984; //Strength of gravitational on each object
const JUMP_VELOCITY = -15.5; //Strength of Player's jump
const SPEED = 1.25; //Speed the Player moves at
const ACCELERATION = 1; //Acceleration acting as a scalar
const SMOOTHNESS = 0.95; //For gliding effect
const BOUNCE = 0; //Not used yet
const NODE = 20; //The size of the nodes
const columns = Math.floor(Screen.Width / NODE); //The number of columns in the level
const rows = Math.floor(Screen.Height / NODE); //The number of rows in the level
const fillPercent = 20; //What percent of the level should be filled
var level = new Array(columns); //Holds the level data

for(var i = 0; i < level.length; i++)
    level[i] = new Array(rows); //Create 2D array for node positions in the level

//Fill a percentage of the level with a 'true' value, meaning a node shall be placed there
//Loop through level
for(var x = 0; x < columns; x++) {
    for(var y = 0; y < rows; y++) {
        //Generate a random number and set value to true if is greater than the fill percentage
        if(RandomNumber(0, 101) < fillPercent) {
            level[x][y] = true;
        } else {
            level[x][y] = false;
        }
    }
}

//Print the values at every node in the level
//Loop through level
for(var x = 0; x < columns; x++) {
    for(var y = 0; y < rows; y++) {
        //Print value
        console.log("Value at: (" + x + ", " + y + ") is: " + level[x][y]);
    }
}

//Delete objects that are not on the Canvas
for(var i = 0; i < collidable.length; i++) {
    if((collidable[i].transform.position.x > Screen.Width) || (collidable[i].transform.position.y > Screen.Height) || (collidable[i].transform.position.x < 0) || (collidable[i].transform.position.y < 0)) {
        collidable[i] = null;
        delete collidable[i];
    }
}

//Create a Box for every 'true' node, find it' Quad and add it to the collidable ArrayList
for(var x = 0; x < columns; x++) {
    for(var y = 0; y < rows; y++) {
        if(level[x][y] === true) {
            var tempBox = new Box(new Vector2((x * columns), (y * rows)), new Vector2(NODE, NODE), new Colour(222, 118, 149, 1));
            tempBox.quad = tempBox.GetQuad();
            collidable.push(tempBox);
        }
    }
}
//Message informing that the variables are all set
console.log("Variables set.");


//Request animation frame
RequestAnimationFrame();
console.log("Animation frame requested, game has begun.");

function Awake() {
    //Update Time values
    Time.Update();
    //Call the game loop
    Update();
    //Wait before calling again
    setTimeout(function() { requestAnimationFrame(Awake); }, (1000 / FPS))
} window.addEventListener("load", Awake);