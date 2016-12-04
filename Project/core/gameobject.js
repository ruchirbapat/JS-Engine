/*
*   All code owned by Ruchir Bapat, Copyright 2016, All Rights Reserved
*   The code is licensed under: Apache 2.0
*/

//Constructor for a GameObject
function GameObject() {
    
    this.Components = [];
    this.Name = ("Untitled GameObject");
    this.transform = new Transform();
    
    this.GetComponent = function(component) {
        return this.Components[component];
    }
    
    this.AddComponent = function(component) {
    
    }
}