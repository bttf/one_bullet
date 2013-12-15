function Jenkins(canvasWidth, canvasHeight, jones) {
  var assets = ['img/jenkins1.png',
                'img/jenkins2.png',
                'img/jenkins3.png'];

  this.canvasWidth = canvasWidth;
  this.canvasHeight = canvasHeight;

  this.jones = jones;

  this.gun = new Gun();

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

  this.baby = new Image();
  this.baby.src = 'img/baby1.png';

  this.exclamation = new Image();
  this.exclamation.src = 'img/exclamation.png';
  this.exclamationX = this.x + 50;
  this.exclamationY = this.y - 75;
  this.alerted = false;
  this.alertTime = 0;
  this.eraseExclamation = false;

  this.jonesDrawnTick = 0;
  this.jonesShotTick = 0;
  this.pistolIsDrawn = false;
  this.drawTime = 250;
  this.shootTime = 1000;

  this.gunIsShot = false;

  this.isDead = false;
}

Jenkins.prototype.render = function(time) {
  if (this.jones.pistolIsDrawn) {
    if (!this.alerted) {
      this.alertTime = time + 1000;
    }
    else if (time > this.alertTime) {
      this.eraseExclamation = true;
    }
    this.alerted = true;

    if (this.jonesDrawnTick == 0) {
      this.jonesDrawnTick = time + this.drawTime;
    }
    else {
      if (time > this.jonesDrawnTick) {
        if (!this.pistolIsDrawn) {
          this.gun.draw.play();
          this.gun.cock.play();
        }
        this.pistolIsDrawn = true;
      }
    }
  }

  if (!this.pistolIsDrawn) {
    if (time > (this.lastTick + this.fps)) {
      this.frame = (this.frame + 1) % 2;
      this.lastTick = time;
      if (this.frame == 0) {
        this.lastTick += this.fps * 4;
      }
    }
  }
  else {
    this.frame = 2;
    if (!this.gunIsShot && this.jones.gunIsShot && !this.isDead
        && this.jonesShotTick != 0) {
      console.log('Jenkins has an easy kill right now');
      if (time > this.jonesShotTick + this.shootTime) {
        console.log('Jenkins shot you!');
        this.gun.shot2.play();
        this.gunIsShot = true;
      }
    }
  }
};

Jenkins.prototype.draw = function(context) {
  if(this.allImagesLoaded()) {
    context.drawImage(this.frames[this.frame], this.x, this.y);
    context.drawImage(this.baby, this.x - 20, this.y + 35);
  }
  if (this.jones.pistolIsDrawn && this.alerted && !this.eraseExclamation) {
    context.drawImage(this.exclamation, this.exclamationX, this.exclamationY);
  }
};

Jenkins.prototype.allImagesLoaded = function() {
  var allComplete = true;
  for (var i = 0; i < this.frames.length; i++) {
    if (!this.frames[i].complete) {
      allComplete = false;
    }
  }
  if (!this.baby.complete) {
    allComplete = false;
  }
  this.width = this.frames[0].width;
  this.height = this.frames[0].height;
  return allComplete;
};
