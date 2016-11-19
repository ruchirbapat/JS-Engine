//Rudimentary, incomplete, unused QuadTree
function QuadTree() {
    this.TopLeft = new Rect(new Vector2(0, 0), new Vector2(Screen.Width / 2, Screen.Height / 2));
    
    this.BottomLeft = new Rect(new Vector2(0, Screen.Height / 2), new Vector2(Screen.Width / 2, Screen.Height / 2));
    
    this.TopRight = new Rect(new Vector2(Screen.Width / 2, 0), new Vector2(Screen.Width / 2, Screen.Height / 2));
    
    this.BottomRight = new Rect(new Vector2(Screen.Width / 2, Screen.Height / 2), new Vector2(Screen.Width / 2, Screen.Height / 2));
}

var QuadTreeSolver = new QuadTree();