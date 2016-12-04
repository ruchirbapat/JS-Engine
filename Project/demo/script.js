/*
*   All code owned by Ruchir Bapat, Copyright 2016, All Rights Reserved
*   The code is licensed under: Apache 2.0
*/

/*//Platformer Game
//Called every frame
function Update() {
    //Clear screen
    Screen.Clear();
    
    //Draw floor
    //Screen.DrawRect(TestBox.transform.position, TestBox.transform.scale, TestBox.colour);
    Screen.DrawRect(TestBox);
    for(var i = 0; i < collidable.length; i++) {
        Screen.DrawRect(collidable[i]);
    }
    
    //Move Player
    Player.Update();

    //Collide Player against floor
    Player.CollideWith(TestBox);
    
    //Loop through every collidable object, then only perform a collision test against objects that are in the same Quad as the Player
    for(var i = 0; i < collidable.length; i++) {
        //Check if the object shares the same Quad as the Player
        //if(Player.GetQuad() == collidable[i].GetQuad()) {
            //Perform a collision test
            Player.CollideWith(collidable[i]);
        //}
    }
    
    Player.colour.r = Mathf.Bounce(Player.colour.r, 0, 255);
    Player.colour.g = Mathf.Bounce(Player.colour.g, 0, 255);
    Player.colour.b = Mathf.Bounce(Player.colour.b, 0, 255);
    
    //Draw Player
    Screen.DrawRect(Player);
}*/

/*//Neural Network Example
var neuron = new Neuron(3);
var training = new Array(2000);
var count = 0;

for(var i = 0; i < training.length; i++) {
    var x = RandomNumber(-(Screen.Width), (Screen.Width));
    var y = RandomNumber(-(Screen.Height), (Screen.Height));
    
    var answer = 1;
    if(y < (f(x)))
        answer = -1;
    
    training[i] = new Trainer(x, y, answer);
}

//Called every frame
function Update() {
    Screen.Clear();
    var input = training[count].Inputs;
    var answer = training[count].answer;
    neuron.Train(input, answer);
    count = (count + 1) % training.length;
    for(var i = 0; i < count; i++) {
        var guess = neuron.Output(training[i].Inputs);
        if(guess < 0) {
            Screen.Context.strokeStyle = "rgba(1, 255, 1, 1)"
            Screen.Context.strokeRect(training[i].Inputs[0], training[i].Inputs[1], NODE, NODE);
        } else {
            console.log("Guess is greater than 1");
            Screen.Context.fillStyle = "rgba(255, 1, 1, 1)";
            Screen.Context.fillRect(training[i].Inputs[0], training[i].Inputs[1], NODE, NODE);
        }   
    }
}*/

/*var c = new Circle(new Vector2(0, 300), 10, new Colour(RandomNumber(1, 255), RandomNumber(1, 255), RandomNumber(1, 255), 1));
console.log(c);
function Update() {
    c.transform.position.x += 12.25;
    c.transform.position.y += Mathf.Sin(c.transform.position.x) * 25;
    c.Draw();
}*/

var c = new Circle(new Vector2(300, 10), 10, Colour.Random());
var r = new Box(new Vector2(0, Screen.Height), new Vector2(Screen.Width, 40), new Colour(222, 118, 149, 1));
var l = new Line(Vector2.zero, new Vector2(Screen.Width, Screen.Height), Colour.Random());
var anotherLine = new Line(new Vector2(Screen.Width, 0), new Vector2(0, Screen.Height), Colour.Random());

var vecA = new Vector2(328, 311);
var vecB = new Vector2(169, 315);
var projected = Vector2.Project(vecA, vecB);
console.log("Projected: " + projected.ToString());

console.log(l);
console.log(anotherLine);
Check(anotherLine);
function Update() {
    Screen.Clear();
    c.transform.position.y += 10;
    
    if(CollisionChecker.CircleToLine(c, l)) {
        console.log("Collision!");
    }
    
    Screen.DrawRect(r);
    c.Draw()
    l.Draw();
    anotherLine.Draw();
}