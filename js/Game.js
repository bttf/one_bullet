function Game() {
  this.background = {};
}

Game.prototype.init = function(canvasWidth, canvasHeight) {
  this.background = new Background(canvasWidth, canvasHeight);
};

Game.prototype.render = function() {
};

Game.prototype.draw = function(context) {
  this.background.draw(context);
};
