/*
*   All code owned by Ruchir Bapat, Copyright 2016, All Rights Reserved
*   The code is licensed under: Apache 2.0
*/

var Input = {
    Keys: [],
    GetKeyDown: function(key) {
        if(Input.Keys[key] === true)
            return true;
        else
            return false;
    },
    OnKeyDown: function(key) {
        if(key.target === document.body) {
            //key.preventDefault();
            Input.Keys[key.keyCode] = true;
        }
    },
    OnKeyUp: function(key) {
        Input.Keys[key.keyCode] = false;
    }
}

var KeyCode = {
    UpArrow: 38,
    DownArrow: 40,
    LeftArrow: 37,
    RightArrow: 39,

    W: 87,
    A: 65,
    S: 83,
    D: 68,

    Spacebar: 32
}

window.addEventListener("keydown", Input.OnKeyDown, false);
window.addEventListener("keyup", Input.OnKeyUp, false);
