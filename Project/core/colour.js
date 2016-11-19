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
        this.r = Number(Mathf.Bounce(rVal, 0, 255).toString());
        this.g = Number(Mathf.Bounce(gVal, 0, 255).toString());
        this.b = Number(Mathf.Bounce(brVal, 0, 255).toString());
        this.a = Number(Mathf.Bounce(aVal, 0, 255).toString());
    }
    
    this.GetColour = function() {
        return String("rgba(" + (Mathf.Bounce(_r, 0, 255)).toString() + ", " + (Mathf.Bounce(_g, 0, 255)).toString() + ", " + (Mathf.Bounce(_b, 0, 255)).toString() + ", " + (Mathf.Bounce(_a, 0, 255)).toString() + ")");  
    }
}