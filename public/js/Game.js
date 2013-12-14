function Game() {
  this.background = {};
  this.jones = {};
  this.mother = {};
  this.lineSight = {};
}

Game.prototype.init = function(canvasWidth, canvasHeight) {
  this.background = new Background(canvasWidth, canvasHeight);
  this.jones = new Jones(canvasWidth, canvasHeight);
  this.mother = new Mother(canvasWidth, canvasHeight);
  this.lineSight = new LineSight(canvasWidth, canvasHeight, this.jones);
};

Game.prototype.render = function(time) {
  this.mother.render(time);
  this.lineSight.render(time);
  this.jones.render(time);
};

Game.prototype.draw = function(context) {
  this.background.draw(context);
  this.mother.draw(context);
  this.lineSight.draw(context);
  this.jones.draw(context);
};

Game.prototype.mousemove = function(e) {
  this.lineSight.mousemove(e);
};
