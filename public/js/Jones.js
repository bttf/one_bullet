function Jones(canvasWidth, canvasHeight) {
  var assets = ['img/jones1.png',
                'img/jones2.png',
                'img/jones3.png'];

  this.canvasWidth = canvasWidth;
  this.canvasHeight = canvasHeight;

  this.fps = 1000 / 1;
  this.lastTick = 0;

  this.x = canvasWidth - (canvasWidth / 5);
  this.y = (canvasHeight / 3);

  this.imagesLoaded = [];

  this.frame = 0;
  this.frames = [];
  for (var i = 0; i < assets.length; i++) {
    this.frames.push(new Image());
    this.frames[i].src = assets[i];
  }

  this.pistolIsDrawn = false;

  this.gunIsShot = false;
}

Jones.prototype.render = function(time) {
  if (!this.pistolIsDrawn){
    if (time > (this.lastTick + this.fps)) {
      this.frame = (this.frame + 1) % 2;
      this.lastTick = time;
    }
  }
  else {
    this.frame = 2;
  }
};

Jones.prototype.draw = function(context) {
  if (this.allImagesLoaded()) {
    context.drawImage(this.frames[this.frame], this.x, this.y);
  }
};

Jones.prototype.imgOnLoad = function() {
  this.imagesLoaded.push("SHIT_YEAH");
};

Jones.prototype.drawPistol = function() {
  console.log('DRAW!');
  this.pistolIsDrawn = true;
  this.x -= 60;
};

Jones.prototype.allImagesLoaded = function() {
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
