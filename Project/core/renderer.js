/*
*   All code owned by Ruchir Bapat, Copyright 2016, All Rights Reserved
*   The code is licensed under: Apache 2.0
*/

//Utility class for drawing to the HTML5 Canvas
function Renderer() {
    //Get reference to Canvas
    this.Canvas = document.getElementById("canvas");
    //Get reference to Canvas' Context
    this.Context = this.Canvas.getContext("2d");
    //Holds the value of the Canvas width`
    this.Width = this.Canvas.width;
    //Holds the value of the Canvas height
    this.Height = this.Canvas.height;
    
    //Sets the background colour of the Canvas
    //@param bgCol - A Colour representing RGBA values to set the Canvas background colour as 
    this.SetBackgroundColour = function(bgCol) {
        this.Canvas.style.backgroundColor = bgCol.GetColour();
    }
    
    //Clears the Context
    this.Clear = function() {
        this.Context.clearRect(0, 0, this.Canvas.width, this.Canvas.height);
    }

    //Draws a line to the screen
    //@param line - The line to be drawn
    this.DrawLine = function(line) {
        this.Context.beginPath();
        this.Context.strokeStyle = line.colour.GetColour();
        this.Context.moveTo(line.start.x, line.start.y);
        this.Context.lineTo(line.end.x, line.end.y);
        this.Context.closePath();
        this.Context.stroke();
    }
    
    //Draws a rectangle to the screen
    //@param object - The object containing information on how and where to render it
    this.DrawRect = function(object) {
        object.transform.position.x = Clamp(object.transform.position.x, 0, this.Width - object.transform.scale.x);
        object.transform.position.y = Clamp(object.transform.position.y, 0, this.Height - object.transform.scale.y);
        
        this.Context.fillStyle = object.colour.GetColour();
        this.Context.fillRect(object.transform.position.x, object.transform.position.y, object.transform.scale.x, object.transform.scale.y); 
    }

    //Draws the outline of a rectangle at a specified position, with a specific scale and colour
    //@param object - The object containing information on how and where to render it
    this.StrokeRect = function(pos, size, col) {
        //Clamp the position within the bounds of the Canvas using a Helper method
        pos.x = Clamp(pos.x, 0, this.Width - size.x);
        pos.y = Clamp(pos.y, 0, this.Height - size.y);
        
        this.Context.strokeStyle = col.GetColour();
        this.Context.strokeRect(pos.x, pos.y, size.x, size.y);
    }
    
    //Draws a circle to the screen
    //@param object - The object containing information on how and where to render it
    this.DrawCircle = function(object) {
        this.Context.beginPath();
        this.Context.fillStyle = object.colour.GetColour();
        this.Context.arc(object.transform.position.x, object.transform.position.y, object.radius, 0, Mathf.Double_PI); 
        this.Context.fill();
    }

    //Draws the outline of a circle at a specified position, with a specific radius and colour
    //@param object - The object containing information on how and where to render it
    this.StrokeCircle = function(object) {
        this.Context.beginPath();
        this.Context.strokeStyle = object.colour.GetColour();
        this.Context.arc(object.transform.position.x, object.transform.position.y, object.radius, 0, Mathf.Double_PI);
        this.Context.stroke();
    }
    
    //Draws a continous sine wave
    //@param amplitude - The half vertical height of the sine wave
    //@param frequency - How far apart two waves are
    //@param counter - How fast to draw at
    //@param duration - How long to wait
    //@param offset - Vertical offset of the sine wave
    //@param w - The width of the rectangle at a point on the sine wave
    //@param h - The height of the rectabgle at a point on the sine wave
    //@param col - The colour of the sine wave
    this.DrawSineWave = function(amplitude, frequency, counter, duration, offset, w, h, col) {
        Screen.DrawRect(duration, (offset + Math.Sin(duration / frequency - counter / 5) * amplitude), w, h, col);   
    }
    
    //Returns the width of the Canvas
    this.GetWidth = function() {
        return this.Canvas.width;
    }
    
    //Returns the height of the Canvas
    this.GetHeight = function() {
        return this.Canvas.height;
    }
    
    //Returns a Vector2 with the dimensions of the Canvas
    this.GetDimensions = function() {
        return new Vector2(this.Canvas.width, this.Canvas.height);
    }
    
    //Resets the canvas rotation
    this.ResetRotation = function() {
        this.Context.restore();
    }
}

//Create Renderer
var Screen = new Renderer();

//Make sure the Renderer was created
Check(Screen);

//Set the canvas colour
Screen.SetBackgroundColour(new Colour(240, 240, 240, 1));
