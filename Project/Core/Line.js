function Line(from, to, col) {
    this.start = new Vector2(from.x, from.x);
    this.end = new Vector2(to.x, to.y);
    this.colour = col;
    this.normal = new Vector2((this.start.x + this.end.x) / 2, (this.start.y + this.end.y) / 2)

    this.Draw = function() {
        Screen.DrawLine(this);
    }
}