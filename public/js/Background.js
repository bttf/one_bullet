function Background(canvasWidth, canvasHeight) {
  var assets = ['img/bar.png',
                'img/floor.png',
                'img/ceiling.png',
                'img/wall1.png',
                'img/wall2.png'];

  this.canvasWidth = canvasWidth;
  this.canvasHeight = canvasHeight;

  this.bar = new Image();
  this.bar.src = assets[0];
  this.barLoaded = false;
  this.bar.onload = this.initBar.call(this);

  this.floor = new Image();
  this.floor.src = assets[1];
  this.floorLoaded = false;
  this.floor.onload = this.initFloor.call(this);

  this.ceiling = new Image();
  this.ceiling.src = assets[2];
  this.ceilingLoaded = false;
  this.ceiling.onload = this.initCeiling.call(this);

  this.wall1 = new Image();
  this.wall1.src = assets[3];
  this.wall1Loaded = false;
  this.wall1.onload = this.initWall1.call(this);

  this.wall2 = new Image();
  this.wall2.src = assets[4];
  this.wall2Loaded = false;
  this.wall2.onload = this.initWall2.call(this);
}

Background.prototype.draw = function(context) {
  if (this.allImagesAreLoaded()) {
    context.drawImage(this.ceiling, this.ceilingX, this.ceilingY);
    for (var i = this.wall1X; i > -(this.wall1.width); i -= this.wall1.width) {
      context.drawImage(this.wall1, i, this.wall1Y);
    }
    context.drawImage(this.wall2, this.wall2X, this.wall2Y);

    if ((this.floorY + this.floor.height) < this.canvasHeight) {
      context.drawImage(this.floor, this.floorX, this.floorY + this.floor.height - 15);
      if (this.floor.width < this.canvasWidth) {
        context.drawImage(this.floor, this.floorX + this.floor.width, this.floorY + this.floor.height - 5);
      }
    }
    context.drawImage(this.floor, this.floorX, this.floorY);
    if (this.floor.width < this.canvasWidth) {
      context.drawImage(this.floor, this.floorX + this.floor.width, this.floorY);
    }

    context.drawImage(this.bar, this.barX, this.barY);
  }
};

Background.prototype.initBar = function() {
  this.barX = 0;
  this.barY = this.canvasHeight - this.canvasHeight / 2;
  this.barLoaded = true;
  console.log('barloaded: %s', this.barLoaded);
};

Background.prototype.initFloor = function() {
  this.floorX = 0;
  this.floorY = (this.canvasHeight - this.floor.height);
  this.floorY = this.canvasHeight - (this.canvasHeight / 3);
  this.floorLoaded = true;
};

Background.prototype.initCeiling = function() {
  this.ceilingX = 0;
  this.ceilingY = 0;
  this.ceilingLoaded = true;
};

Background.prototype.initWall1 = function() {
  this.wall1X = this.canvasWidth - (this.wall1.width / 2);
  this.wall1Y = this.ceiling.height - (this.wall1.height / 6);
  this.wall1Loaded = true;
};

Background.prototype.initWall2 = function() {
  this.wall2X = 0;
  this.wall2Y = this.ceiling.height - (this.wall2.height / 4);
  this.wall2Loaded = true;
};

Background.prototype.allImagesAreLoaded = function() {
  var result = this.barLoaded && this.floorLoaded && this.ceilingLoaded && this.wall1Loaded && this.wall2Loaded;
  //console.log(result);
  return this.barLoaded && this.floorLoaded && this.ceilingLoaded && this.wall1Loaded && this.wall2Loaded;
}
