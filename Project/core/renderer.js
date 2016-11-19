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
    
    //Draws a rectangle at a specified position, with a specific scale and colour
    //@param pos - The position at which to draw the rectangle
    //@param size - The dimensions of the rectangle to be drawn
    //@param col - A Colour representing RGBA values to draw the rectangle at
    this.DrawRect = function(pos, size, col) {
        //Clamp the position of the rectagle within the bounds of the Canvas using a Helper method
        pos.x = Clamp(pos.x, 0, this.Width - size.x);
        pos.y = Clamp(pos.y, 0, this.Height - size.y);
        
        //Set the draw colour
        this.Context.fillStyle = col.GetColour();
        //Draw the rectangle given certain parameters
        this.Context.fillRect(pos.x, pos.y, size.x, size.y);
    }

    //Draws the outline of a rectangle at a specified position, with a specific scale and colour
    //@param pos - The position at which to draw the outline of the rectangle
    //@param size - The dimensions of the outline for the rectangle to be drawn
    //@param col - A Colour representing RGBA values to draw the rectagle outline at    
    this.StrokeRect = function(pos, size, col) {
        //Clamp the position within the bounds of the Canvas using a Helper method
        pos.x = Clamp(pos.x, 0, this.Width - size.x);
        pos.y = Clamp(pos.y, 0, this.Height - size.y);
        
        this.Context.strokeStyle = col.GetColour();
        this.Context.strokeRect(pos.x, pos.y, size.x, size.y);
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
        Screen.DrawRect(duration, (offset + Mathf.Sin(duration / frequency - counter / 5) * amplitude), w, h, col);   
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
}