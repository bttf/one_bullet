function GameOver(canvasWidth, canvasHeight) {
  var assets = ['img/youWin.png',
                'img/youLose.png'];
  this.youWin = new Image();
  this.youWin.src = assets[0];

  this.canvasWidth = canvasWidth;
  this.canvasHeight = canvasHeight;

  this.youLose = new Image();
  this.youLose.src = assets[1];
}

GameOver.prototype.drawYouWin = function(context) {
  if (this.youWin.complete) {
    context.drawImage(this.youWin, (this.canvasWidth / 4), (this.canvasHeight / 4));
  }
};

GameOver.prototype.drawYouLose = function(context) {
  if (this.youLose.complete) {
    context.drawImage(this.youLose, (this.canvasWidth / 4), (this.canvasHeight / 4));
  }
};
