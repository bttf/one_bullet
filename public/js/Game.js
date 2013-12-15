function Game() {
  this.background = {};
  this.jones = {};
  this.mother = {};
  this.lineSight = {};
  this.gun = {};
  this.jenkins = {};
  this.gameOver = {};
  this.winOrLose = "nothing_yet";
  this.gameIsOver = false;
}

Game.prototype.init = function(canvasWidth, canvasHeight) {
  this.background = new Background(canvasWidth, canvasHeight);
  this.jones = new Jones(canvasWidth, canvasHeight);
  this.mother = new Mother(canvasWidth, canvasHeight);
  this.lineSight = new LineSight(canvasWidth, canvasHeight, this.jones);
  this.gun = new Gun(this.jones);
  this.jenkins = new Jenkins(canvasWidth, canvasHeight, this.jones);
  this.gameOver = new GameOver(canvasWidth, canvasHeight);
};

Game.prototype.render = function(time) {
  this.mother.render(time);
  this.jenkins.render(time);
  this.lineSight.render(time);
  this.jones.render(time);
};

Game.prototype.draw = function(context) {
  this.background.draw(context);
  this.mother.draw(context);
  this.jenkins.draw(context);
  this.lineSight.draw(context);
  this.jones.draw(context);

  if (this.winOrLose !== "win" && this.winOrLose !== "lose") {
    if (this.jenkins.gunIsShot) {
      if (!this.jones.gunIsShot) {
        console.log('YOU LOSE');
        this.winOrLose = "lose";
      }
    }
    else {
      if (this.jones.gunIsShot) {
        console.log('YOU WIN');
        this.winOrLose = "win";
      }
    }
  }
  else {
    this.gameIsOver = true;
    if (this.winOrLose === "win") {
      this.gameOver.drawYouWin(context);
    }
    else if (this.winOrLose === "lose") {
      this.gameOver.drawYouLose(context);
    }
  }
};

Game.prototype.mousemove = function(e) {
  this.lineSight.mousemove(e);
};

Game.prototype.mousedown = function(e) {
  this.gun.mousedown(e);
};

Game.prototype.keydown = function(e) {
  this.gun.keydown(e);
};

