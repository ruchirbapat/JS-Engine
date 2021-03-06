/*
*   All code owned by Ruchir Bapat, Copyright 2016, All Rights Reserved
*   The code is licensed under: Apache 2.0
*/

//Saves level to file
function SaveLevel(theLevel) {
    var levelString = "";
    for(var x = 0; x < theLevel.length; x++) {
        for(var y = 0; y < theLevel[0].length; y++) {
            if(theLevel[x][y] == true) {
                levelString += "1";
            } else { 
                levelString += "0";
            }
        }
    }
    
    return levelString;
}

function LevelToString(lev) {
    var col = lev.length;
    var row = lev[0].length;
    var levStr = "";
    console.log("LevelToString(): lev has " + col + " columns and " + row + " rows.");
    levStr = "c" + col + "r" + row;
    for(var x = 0; x < col; x++) {
        for(var y = 0; y < row; y++) {
            if(lev[x][y] === true) { 
                levStr += "1";
            } else if(lev[x][y] === false) {
                levStr += "0";
            } else {
                levStr += "n";
            }
        }
    }
    return levStr;
}

function ReadLevel(levelString) {
    //levelString.split("");
    var levelAsArray = levelString.split("");
    var levelArray = [];
    for(var i = 0; i < levelString.length; i++) {
        if(levelString[i] == 1) {
            levelString[i] = true;
        } else {
            levelString[i] = false;
        }
    }
    
    return levelString; 
}

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
 QuickBoxToBox: function(boxA, boxB) {
     if(boxA.GetX() < boxB.GetX() + boxB.GetWidth() && boxA.GetX() + boxA.GetWidth() > boxB.GetX() && boxA.GetY() < boxB.GetY() + boxB.GetHeight() && boxA.GetHeight + boxA.GetY() > boxB.GetY()) {
         return true;
     }
     else
         return false;
 },

 //Credit to Obtuse Studios for this collision detection algorithm
 BoxToBox: function(aPos, aSize, bPos, bSize) {
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
	},
    
    CircleToCircle: function(c1, c2) {
        if(Mathf.Sqrt(((Mathf.Pow((c1.transform.position.x - c2.transform.position.x) , 2)) + (Mathf.Pow((c1.transform.position.y - c2.transform.position.y) , 2)))) <= c1.radius + c2.radius) { 
            return true;
        } else { 
            return false;
        }
    },
    
    CircleToBox: function(c, b) {
        var testX = c.transform.position.x;
        var testY = c.transform.position.y;

        if (c.transform.position.x < r.transform.position.x)
            testX = r.transform.position.x;
        else if (c.transform.position.x > r.transform.position.x + r.transform.scale.x)
            testX = r.transform.position.x + r.transform.scale.x;

        if (c.transform.position.y < r.transform.position.y)
            testY = r.transform.position.y;
        else if (c.transform.position.y > r.transform.position.y + r.transform.scale.y)
            testY = r.transform.position.y + r.transform.scale.y;

        if (Mathf.Sqrt(((Mathf.Pow((c.transform.position.x - testX) , 2)) + (Mathf.Pow((c.transform.position.y - testY) , 2)))) <= c.radius) {
            return true;
        }
        return false;
    },

    BoxToCircle: function(b, c) {
        CollisionChecker.CircleToBox(c, b);
    },

    CircleToLine: function(c, l) {
        var projected = Vector2.Project(new Vector2((c.transform.position.x - l.start.x), (c.transform.position.y - l.start.y)), new Vector2((l.end.x - l.start.x), (l.end.y - l.start.y)));

        if(Mathf.Sqrt(((Mathf.Pow((projected.x - c.transform.position.x) , 2)) + (Mathf.Pow((projected.y - c.transform.position.y) , 2)))) <= c.radius) {
            return true;
        } else {
            return false;
        }
    },

    CircleToPoint: function(c, p) {
        if(Distance(c.transform.position, p) <= c.radius) {
            return true;
        } else {
            return false;
        }
    },

    PointToCircle: function(p, c) {
        CollisionChecker.CircleToPoint(c, p);
    },

    PointToRect: function(p, r) {
        if(p.x >= r.transform.position.x && p.x <= r.transform.position.x + r.transform.scale.y && p.y >= r.transform.position.y && p.y <= r.transform.positiony + r.transform.scale.y) {
            return true;
        } else {
            return false;
        }
    }, 

    RectToPoint: function(r, p) {
        CollisionChecker.PointToRect(p, r);
    },

    LineToLine: function(l1, l2) {
        var gradient1 = ((l1.start.y - l1.end.y) / (l1.start.x - l1.end.x));
        var gradient2 = ((l1.start.y - l1.end.y) / (l1.start.x - l1.end.x));

        var intersection;

        // calculate the distance to intersection point
        var uA = ((l2.end.x-l2.start.x)*(l1.start.y-l2.start.y) - (l2.end.y-l2.start.y)*(l1.start.x-l2.start.x)) / ((l2.end.y-l2.start.y)*(l1.end.x-l1.start.x) - (l2.end.x-l2.start.x)*(l1.end.y-l1.start.y));
        var uB = ((l1.end.x-l1.start.x)*(l1.start.y-l2.start.y) - (l1.end.y-l1.start.y)*(l1.start.x-l2.start.x)) / ((l2.end.y-l2.start.y)*(l1.end.x-l1.start.x) - (l2.end.x-l2.start.x)*(l1.end.y-l1.start.y));

        // if uA and uB are between 0-1, lines are colliding
        if (uA >= 0 && uA <= 1 && uB >= 0 && uB <= 1) {

        if(_collideDebug || calcIntersection){
                // calc the point where the lines meet
                var intersectionX = l1.start.x + (uA * (l1.end.x-l1.start.x));
                var intersectionY = l1.start.y + (uA * (l1.end.y-l1.start.y));
            }

            if(_collideDebug){
                ellipse(intersectionX,intersectionY,10,10);
            }

            if(calcIntersection){
                intersection = {
                "x":intersectionX,
                "y":intersectionY
                }
                return intersection;
            }else{
                return true;
            }
        }
        if(calcIntersection){
        intersection = {
            "x":false,
            "y":false
        }
        return intersection;
        }
        return false;
    }
}

//Returns a random value between min and max
function RandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

//Gets the distance between two points
function Distance(a, b) {
    return Mathf.Sqrt(((Mathf.Pow((a.x - b.x) , 2)) + (Mathf.Pow((a.y - b.y) , 2))))
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
