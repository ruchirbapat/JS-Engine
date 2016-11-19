/*
*   All code owned by Ruchir Bapat, Copyright 2016, All Rights Reserved
*   The code is licensed under: Apache 2.0
*/

//Platformer Game
//Called every frame
function Update() {
    //Clear screen
    Screen.Clear();
    
    //Draw floor
    //Screen.DrawRect(TestBox.transform.position, TestBox.transform.scale, TestBox.colour);
    
    for(var i = 0; i < collidable.length; i++) {
        Screen.DrawRect(collidable[i].transform.position, collidable[i].transform.scale, collidable[i].colour);
    }
    
    //Move Player
    Player.SelfMove();

    //Collide Player against floor
    //Player.CollideWith(TestBox);
    
    //Loop through every collidable object, then only perform a collision test against objects that are in the same Quad as the Player
    for(var i = 0; i < collidable.length; i++) {
        //Check if the object shares the same Quad as the Player
        if(Player.GetQuad() == collidable[i].GetQuad()) {
            //Perform a collision test
            Player.CollideWith(collidable[i]);
        }
    }
    
    //Draw Player
    Screen.DrawRect(Player.transform.position, Player.transform.scale, Player.colour);
}

/* //Neural Network Example
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