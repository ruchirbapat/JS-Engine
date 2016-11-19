/*
*   All code owned by Ruchir Bapat, Copyright 2016, All Rights Reserved
*   The code is licensed under: Apache 2.0
*/

//Makes inheritance easier
Function.prototype.inheritsFrom = function( parentClassOrObject ){
	if (parentClassOrObject.constructor === Function )
	{
		//Normal Inheritance
		this.prototype = new parentClassOrObject;
		this.prototype.constructor = this;
		this.prototype.parent = parentClassOrObject.prototype;
	}
	else
	{
		//Pure Virtual Inheritance
		this.prototype = parentClassOrObject;
		this.prototype.constructor = this;
		this.prototype.parent = parentClassOrObject;
	}
	return this;
}

//Helper functions
function Clamp(value, min, max) {
    if(value > max)
        return max;
    else if(value < min)
        return min;

    return value;
}

//Template unrendered Rect
function Rect(pos, size) {
    this.transform = new Transform();
    this.transform.position.x = pos.x;
    this.transform.position.y = pos.y;
    this.transform.scale.x = size.x;
    this.transform.scale.y = size.y;
    
    this.Print = function() {
        console.log("Rect's Position: " + this.transform.position.ToString());
        console.log("Rect's Dimensions: " + this.transform.scale.ToString());
    }
}

//Checks if an object exists
function Check(object) {
    if((!object) || (object === null) || (object === undefined)) {
        console.error((object.constructor.name || object.name) + " was not created!");
        return true;
    } else {
        console.log((object.constructor.name || object.name) + " has been created.");
        return false;
    }
}

//For checking box-to-box collisions and returns the direction of the collision
var CollisionChecker = {
 QuickTest: function(boxA, boxB) {
     if(boxA.GetX() < boxB.GetX() + boxB.GetWidth() && boxA.GetX() + boxA.GetWidth() > boxB.GetX() && boxA.GetY() < boxB.GetY() + boxB.GetHeight() && boxA.GetHeight + boxA.GetY() > boxB.GetY()) {
         return true;
     }
     else
         return false;
 },

 //Credit to Obtuse Studios for this collision detection algorithm
 CollisionTest: function(aPos, aSize, bPos, bSize) {
	 //Find the collision vectors
     var vectorX = (aPos.x + (aSize.x / 2)) - (bPos.x + (bSize.x / 2));
     var vectorY = (aPos.y + (aSize.y / 2)) - (bPos.y + (bSize.y / 2));

     //Find the distance between the two objects
     var deltaWidth = (aSize.x / 2) + (bSize.x / 2);
     var deltaHeight = (aSize.y / 2) + (bSize.y / 2);

     //Stores the direction of collision
     var collisionDir = null;

     //Check if the two objects are intersecting on the x and y axis
     if(Math.abs(vectorX) < deltaWidth && Math.abs(vectorY) < deltaHeight) {
         //The direction of collision
         var directionX = deltaWidth - Math.abs(vectorX);
         var directionY = deltaHeight - Math.abs(vectorY);

         //Check for vertical collision
         if(directionX >= directionY) {
             //Check for collisions from the top
             if(vectorY > 0) {
                 aPos.y += directionY;
                 collisionDir = "t";
             }

             //Collisions form the botttom
             else {
                 aPos.y -= directionY;
                 collisionDir = "b";
             }
         }
         else {
             //Check for collisions from the left
             if(vectorX > 0) {
                 aPos.x += directionX;
                 collisionDir = "l";
             }

             //Collisions form the right side
             else {
                 aPos.x -= directionX;
                 collisionDir = "r";
             }
         }
     }

     //Return the direction.
     return collisionDir;
	}
}

//Returns a random value between min and max
function RandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

//Requests animation frame for the Canvas
function RequestAnimationFrame() {
 (function() {
     var lastTime = 0;
     var vendors = ['ms', 'moz', 'webkit', 'o'];
     for(var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
         window.requestAnimationFrame = window[vendors[x]+'RequestAnimationFrame'];
         window.cancelAnimationFrame = window[vendors[x]+'CancelAnimationFrame']
         || window[vendors[x]+'CancelRequestAnimationFrame'];
     }

     if (!window.requestAnimationFrame)
         window.requestAnimationFrame = function(callback, element) {
             var currTime = new Date().getTime();
             var timeToCall = Math.max(0, 16 - (currTime - lastTime));
             var id = window.setTimeout(function() { callback(currTime + timeToCall); },
                                        timeToCall);
             lastTime = currTime + timeToCall;
             return id;
         };

     if (!window.cancelAnimationFrame)
         window.cancelAnimationFrame = function(id) {
             clearTimeout(id);
         };
 }());
}
