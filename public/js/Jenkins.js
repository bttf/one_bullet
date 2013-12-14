function Jenkins(canvasWidth, canvasHeight) {
  var assets = ['img/jenkins1.png',
                'img/jenkins2.png'];

  this.canvasWidth = canvasWidth;
  this.canvasHeight = canvasHeight;

  this.fps = 1000 / 1;
  this.lastTick = 0;

  this.x = canvasWidth / 5;
  this.y = (canvasHeight / 3);

  this.frame = 0;
  this.frames = [];
  for (var i = 0; i < assets.length; i++) {
    this.frames.push(new Image());
    this.frames[i].src = assets[i];
  }
}
Jenkins.prototype.render = function(time) {
    if (time > (this.lastTick + this.fps)) {
      this.frame = (this.frame + 1) % 2;
      this.lastTick = time;
    }
};

Jenkins.prototype.draw = function() {
  if(this.allImagesLoaded()) {
    context.drawImage(this.frames[this.frame], this.x, this.y);
  }
};

Jenkins.prototype.allImagesLoaded = function() {
  var allComplete = true;
  for (var i = 0; i < this.frames.length; i++) {
    if (!this.frames[i].complete) {
      allComplete = false;
    }
  }
  return allComplete;
};
