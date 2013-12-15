function Mother(canvasWidth, canvasHeight) {
  var assets = ['img/mother1.png',
                'img/mother2.png',
                'img/mother3.png'];

  this.canvasWidth = canvasWidth;
  this.canvasHeight = canvasHeight;

  this.fps = 1000 / 1;
  this.lastTick = 0;

  this.x = canvasWidth - (canvasWidth / 2);
  this.y = canvasHeight - (2 * (canvasHeight / 5));

  this.imagesLoaded = [];

  this.isDead = false;
  
  this.isLaughing = false;

  this.scream = new Audio('audio/mother_scream.ogg');
  this.scream.preload = "auto";

  this.frame = 0;
  this.frames = [];
  for (var i = 0; i < assets.length; i++) {
    this.frames.push(new Image());
    this.frames[i].src = assets[i];
  }
}

Mother.prototype.render = function(time) {
  if (!this.isDead && !this.isLaughing) {
    if (time > (this.lastTick + this.fps)) {
      this.frame = (this.frame + 1) % 1;
      this.lastTick = time;
    }
  }
  else if (this.isLaughing) {
    this.frame = 2;
  }
  else {
    this.frame = 1;
  }
};

Mother.prototype.draw = function(context) {
  if (this.allImagesLoaded()) {
    context.drawImage(this.frames[this.frame], this.x, this.y);
  }
};

Mother.prototype.allImagesLoaded = function() {
  var allComplete = true;
  for (var i = 0; i < this.frames.length; i++) {
    if (!this.frames[i].complete) {
      allComplete = false;
    }
  }
  this.height = this.frames[0].height;
  this.width = this.frames[0].width;
  return allComplete;
};

Mother.prototype.die = function() {
  this.isDead = true;
};

Mother.prototype.laugh = function() {
  this.isLaughing = true;
};

