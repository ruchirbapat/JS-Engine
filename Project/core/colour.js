/*
*   All code owned by Ruchir Bapat, Copyright 2016, All Rights Reserved
*   The code is licensed under: Apache 2.0
*/

function Colour(_r, _g, _b, _a) {
    this.r = new Number(_r);
    this.g = new Number(_g);
    this.b = new Number(_b);
    this.a = new Number(_a);
    
    this.print = function() {
        console.log(this.GetColour());
    }

    this.SetColour = function(rVal, gVal, bVal, aVal) {
        this.r = Number(Mathf.Bounce(rVal, 0, 255));
        this.g = Number(Mathf.Bounce(gVal, 0, 255));
        this.b = Number(Mathf.Bounce(bVal, 0, 255));
        this.a = Number(Mathf.Bounce(aVal, 0, 255));
    }
    
    this.GetColour = function() {
        return String("rgba(" + (Mathf.Bounce(this.r, 0, 255)).toString() + ", " + (Mathf.Bounce(this.g, 0, 255)).toString() + ", " + (Mathf.Bounce(this.b, 0, 255)).toString() + ", " + (Mathf.Bounce(this.a, 0, 255)).toString() + ")");  
    }
}

Colour.Random = function() {
    return new Colour(RandomNumber(0, 256), RandomNumber(0, 256), RandomNumber(0, 256), 1);
}