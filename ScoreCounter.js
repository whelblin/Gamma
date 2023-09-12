class ScoreCounter {
    constructor(x, y) {
        this.score = 0;
        this.x = x;
        this.y = y;
        this.textColor = "white";
        this.fontSize = 24;
    }

    increaseScore(points) {
        this.score += points;
    }
}