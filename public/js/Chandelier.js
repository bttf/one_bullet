function Chandelier(canvasWidth, canvasHeight, mother) {
  var assets = ['img/chandelier.png'];

  this.mother = mother;

  this.thud = new Audio('audio/thud2.ogg');
  this.thud.preload = "auto";

  this.x = mother.x;
  this.y = 0;

  this.isFalling = false;

  this.hasFallen = false;

  this.lastTick = 0;
  this.fps = 1000/30;

  this.speed = 45;

  this.frame = 0;
  this.frames = [];
  for (var i = 0; i < assets.length; i++) {
    this.frames.push(new Image());
    this.frames[i].src = assets[i];
  }
}

Chandelier.prototype.render = function(time) {
  if (this.isFalling) {
    if (time > this.lastTick + this.fps) {
      if (this.y < (this.mother.y)) {
        this.y += this.speed;
      }
      else {
        if (!this.mother.isDead) {
          this.mother.scream.play();
          this.mother.die();
          if (!this.hasFallen)
            this.thud.play();

          this.hasFallen = true;
        }
      }
      this.lastTick = time;
    }
  }
};

Chandelier.prototype.draw = function(context) {
  if (this.allImagesLoaded()) {
    context.drawImage(this.frames[0], this.x, this.y);
  }
};

Chandelier.prototype.allImagesLoaded = function() {
  var allComplete = true;
  for (var i = 0; i < this.frames.length; i++) {
    if (!this.frames[i].complete) {
      allComplete = false;
    }
  }
  this.width = this.frames[0].width;
  this.height = this.frames[0].height;
  return allComplete;
};

Chandelier.prototype.fall = function() {
  this.isFalling = true;
};
