function drawScore()
{
    var score = 0; // temp
 //   textSize(80);
 //   textAlign(RIGHT);
 //   textFont(mainFont);
    fill(255);
 //   text("Best Score: "+ score,width - 10, 70)
 //   textAlign(CENTER)
}

class ScoreCounter {
    constructor(x, y) {
        this.score = 0;
   //     this.bestSore = 0;
        this.x = x;
        this.y = y;
        this.textColor = "white";
        this.fontSize = 24;
    }

    increaseScore(points) {
        this.score += points;
   //     this.bestScore += points;
    }

    /*
    draw(context) {
        context.font = `${this.fontSize}px Arial`;
        context.fillStyle = this.textColor;
        context.fillText(`Score: ${this.score}`, this.x, this.y);
    } */

    printScore(x,y){
        textSize(60);
        textAlign(RIGHT);
        text("SCORE: " + this.score , x,y);
    }
/*
    printBestScore(x,y){
        textSize(90);
        textStyle(BOLD);
        textAlign(CENTER);
      //  textFont("comic sans");
        text("BEST SCORE: " + this.bestScore , x,y);
    } */

    finalScore(timer){
        this.score = this.score * timer;
      //  this.bestSore = this.bestSore * timer;
    }
}