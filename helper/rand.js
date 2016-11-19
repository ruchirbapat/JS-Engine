//For easy random number generation
var Random =
{
	//Random number between min and max
    Range : function(min, max) { return (Math.random() * (max - min)) + min; },
	
	//Generates a random number between 0 and 1
    Value : function() { return Math.random(); },

	//Generate a random integer 
    Int : function(min, max) { return Mathf.Round(Rand.Range(min, max)); },
    Binary : function() { return Rand.RandInt(0, 2); }
};