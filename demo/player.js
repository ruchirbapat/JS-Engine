/*
*   All code owned by Ruchir Bapat, Copyright 2016, All Rights Reserved
*   The code is licensed under: Apache 2.0
*/

//Constructor for a Player
//@param start - The starting position for the Player
//@param size - The dimensions of the Player
//@colour - The colour of the Player
function Player(start, size, colour) {
    //Add a Transform component to the Player
    this.transform = new Transform();
    //Set the Transform values
    //Set the position's x value
    this.transform.position.x = start.x;
    //Set the position's y value
    this.transform.position.y = start.y;
    //Set the scale's x value
    this.transform.scale.x = size.x;
    //Set the scale's y value
    this.transform.scale.y = size.y;
    //Calculate the center of the Player
    this.transform.CalculateCenter();
    //Vector2 holding the velocity of the Player per-frame`
    this.velocity = new Vector2(0, 0);
    //Whether the Player is jumping
    this.jumping = false;
    //Whether the Player is touching the ground
    this.grounded = true;
    //Holds a Colour, namely, the colour of the Player
    this.colour = colour;

    //Prints the values of the Player to the Console
    this.Print = function() {
        console.log("Player's Position: " + this.transform.position.ToString());
        console.log("Player's Velocity: " + this.velocity.ToString());
        console.log("Player's Rotation: " + this.transform.rotation.ToString());
        console.log("Player's Scale: " + this.transform.scale.ToString());
        console.log("Player's Center: " + this.transform.center.ToString());
    }
    
    //Handy method for calculating and applyin velocity and position changes based off Input values
    this.SelfMove = function() {
        //Calculate player's velocity per frame based off Input
        //Decrease velocity on the y-Axis (jump)
        //Check for jump button keypress
        if((Input.GetKeyDown(KeyCode.UpArrow)) || (Input.GetKeyDown(KeyCode.Spacebar)) || (Input.GetKeyDown(KeyCode.W))) {
            //Check that the Player is not currently jumping and that they are touching a surface beneath them
            if((this.jumping === false) && (this.grounded === true)) {
                //Set y-velocity
                this.velocity.y = Number(JUMP_VELOCITY);
                //Flip the grounded boolean because the Player is not on the ground anymore
                this.grounded = false;
                //Flip the jumping boolean as the Player is now in the air
                this.jumping = true;
            }
        }

        //Decrease x-velocity
        //Check for negative horizontal input
        if((Input.GetKeyDown(KeyCode.LeftArrow)) || (Input.GetKeyDown(KeyCode.A))) {
            //Set x-velocity
            this.velocity.x -= (ACCELERATION * SPEED);
        }
        
        //Increase x-velocity
        //Check for positive horizontal input
        if((Input.GetKeyDown(KeyCode.RightArrow)) || (Input.GetKeyDown(KeyCode.D))) {
            //Set x-velocity
            this.velocity.x += (ACCELERATION * SPEED);
        }

        //Apply friction and gravity
        this.velocity.x *= SMOOTHNESS;
        this.velocity.y += GRAVITY;

        //Move player to calculated position
        this.transform.position.x += this.velocity.x;
        this.transform.position.y += this.velocity.y;
    }
    
    //Handy method for resolving collision and updating velocity based off collision and environment interaction
    this.CollideWith = function(obj) {
        //Check the direction of the collision
        var dir = CollisionChecker.CollisionTest(this.transform.position, this.transform.scale, obj.transform.position, obj.transform.scale);

        //Update x-velocity if the direction was on the side, or if the Player hit the side Canvas bounds 
        if((dir === "r") || (dir === "l") || ((this.transform.position.x + this.transform.scale.x) === Screen.Width) || ((this.transform.position.x) === 0)) {
            this.velocity.x = 0;
            //console.log("Side");
        }

        //Update y-velocity and the jumping and grounded booleans if the direction was below, or if the Player hit the Canvas bottom bound
        if(dir === "b" || ((this.transform.position.y + this.transform.scale.y) === Screen.Height)) {
            this.velocity.y = 0;
            this.grounded = true;
            this.jumping = false;
            //console.log("Bottom");
        }
        
        //Update y-velocity if the direction was above, or if the Player hit the Canvas top bounds
        if(dir === "t" || ((this.transform.position.y) === 0)) {
            //this.jumping = false;
            this.velocity.y = 0;
            //console.log("Top");
        }
    }

    //Returns the Quad that the Player is in
    this.GetQuad = function() {
        if(this.transform.position.x + this.transform.scale.x <= (Screen.Width / 2) && this.transform.position.y + this.transform.scale.y <= (Screen.Height / 2)) {
            return "TL";
        } else if(this.transform.position.x + this.transform.scale.x > (Screen.Width / 2) && this.transform.position.y + this.transform.scale.y <= (Screen.Height / 2)) {
            return "TR";
        } else if(this.transform.position.x <= (Screen.Width / 2) && this.transform.position.y > (Screen.Height / 2)) {
            return "BL";
        } else if(this.transform.position.x + this.transform.scale.x > (Screen.Width / 2) && this.transform.position.y + this.transform.scale.y > (Screen.Height / 2)) {
            return "BR";
        } else {
            return "NONE";
        }
    }
}
