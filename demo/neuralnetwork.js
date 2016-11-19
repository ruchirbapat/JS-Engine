//Constructor for a Neuron in the Neural Network
/*
*   @param inputCount - The number of inputs given to the Neuron
*/
function Neuron(inputCount) {
    
    //Holds multiplication weights
    this.Weights = new Array(inputCount);
    
    //Learning rate constant
    this.LearnRate = 100;
    
    //Generate random weights as the network should not have any prior knowledge
    for(var i = 0; i < this.Weights.length; i++)
        this.Weights[i] = Random.Range(-1, 1);
    
    
    //Multiplies inputs by weights, then calculates result
    this.Output = function(Inputs) {
        //Sign to return
        var Sign;
        //Multiply the inputs by the corresponding weights (Forward Propogation)
        for(var i = 0; i < this.Weights.length; i++) {
            Sign += Number((Inputs[i] * this.Weights[i]));
        }
                
        //Return output (Forward Propogation)
        if(Sign > 0)
            return 1;
        else 
            return -1;
    }
    
    //Trains the Neuron against known data and answers
    this.Train = function(Inputs, Answer) {
        //Compute an answer
        var Guess = this.Output(Inputs);
        
        //Compute error (Back Propogation)
        /*
        *   ERROR = DESIRED OUTPUT - GUESS OUTPUT
        */
        var Error = Answer - Guess;
        
        //Adjust Weights (Back Propogration)
        /*
        *   NEW WEIGHT = WEIGHT + ERROR * INPUT * LEARNING RATE
        */
        for(var i = 0; i < this.Weights.length; i++) {
            this.Weights[i] += this.LearnRate * Error * Inputs[i];
        }
    }
}

//Constructor for the Network's Trainer
function Trainer(x, y, answer) {
    this.Inputs = [3];
    this.Inputs[0] = x;
    this.Inputs[1] = y;
    this.Inputs[2] = answer;
}

function f(xVal) {
    return (2 * xVal) + 1;
}