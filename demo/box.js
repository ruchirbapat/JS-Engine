/*
*   All code owned by Ruchir Bapat, Copyright 2016, All Rights Reserved
*   The code is licensed under: Apache 2.0
*/

//Constructor for a Box
//@param start - The position for the Box
//@param size - The dimensions of the Box
//@colour - The colour of the Box
function Box(start, size, colour) {
    //Add a Transform component to the Box
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
    //Calculate the center of the Box
    this.transform.CalculateCenter();
    //Holds a Colour, namely, the colour of the Box
    this.colour = colour;

    //Prints the values of the Box to the Console
    this.Print = function() {
        console.log("Box's Position: " + this.transform.position.ToString());
        console.log("Box's Velocity: " + this.velocity.ToString());
        console.log("Box's Rotation: " + this.transform.rotation.ToString());
        console.log("Box's Scale: " + this.transform.scale.ToString());
        console.log("Box's Center: " + this.transform.center.ToString());
    }

    //Returns the Quad that the Box is in
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