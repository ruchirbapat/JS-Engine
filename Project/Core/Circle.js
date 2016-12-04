//Constructor for a circle
//@param pos - The initial position for the cirlce
//@param r  - The initial radius for the circle
//@param col - The initial colour for the cirlce
function Circle(pos, r, col) {
    //Transform component
    this.transform = new Transform();
    
    this.transform.scale.x = r;
    this.transform.scale.y = r;
    this.radius = r;
    this.transform.position.x = pos.x;
    this.transform.position.y = pos.y;
    
    //The diameter of the circle
    this.diameter = r + r;
    //The circumference of the circle
    this.circumference = Mathf.Double_PI * this.radius;
    //The area of the circle
    this.area = Mathf.PI * this.radius * this.radius; //Faster than using Mathf.Pow();
    //The colour of the circle
    this.colour = col;
    //Helper function to draw the circle
    this.Draw = function() {
        Screen.DrawCircle(this);
    }
}