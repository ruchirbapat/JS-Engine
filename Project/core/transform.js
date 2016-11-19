/*
*   All code owned by Ruchir Bapat, Copyright 2016, All Rights Reserved
*   The code is licensed under: Apache 2.0
*/

function Transform() { 
    this.position = new Vector2(Number(0), Number(0));
    this.rotation = new Vector2(Number(0), Number(0));
    this.scale = new Vector2(Number(1), Number(1));
    this.center = new Vector2(((this.position.x + this.scale.x) / 2) , ((this.position.y + this.scale.y) / 2));
    
    this.toString = function() {
        console.log("Position: (" + this.position.x + ", " + this.position.y + ")");
        console.log("Rotation: (" + this.rotation.x + ", " + this.rotation.y + ")");
        console.log("Scale: (" + this.scale.x + ", " + this.scale.y + ")");
        console.log("Center: (" + this.center.x + ", " + this.center.y + ")");
    }

    this.CalculateCenter = function() {
        this.center = new Vector2(this.position.x + (this.scale.x / 2), this.position.y + (this.scale.y / 2));
    }
}