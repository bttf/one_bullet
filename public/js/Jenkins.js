function Jenkins(canvasWidth, canvasHeight, jones) {
  var assets = ['img/jenkins1.png',
                'img/jenkins2.png',
                'img/jenkins3.png',
                'img/jenkins4.png'];

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
  this.babyX = this.x - 20;
  this.babyY = this.y + 35;
  this.babyTick = 0;
  this.babyFPS = 1000/30;
  this.babyHasDropped = false;

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

  this.dropTheBaby = false;
}

Jenkins.prototype.render = function(time) {
  // If Jones has his Pistol out,
  // show exclamation, erase after 1 sec
  // Draw your gun after specified time
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

  // If my pistol isn't drawn,
  // show regular pose, with a steady
  // drink of the beer
  if (!this.pistolIsDrawn && !this.isDead) {
    if (time > (this.lastTick + this.fps)) {
      this.frame = (this.frame + 1) % 2;
      this.lastTick = time;
      if (this.frame == 0) {
        this.lastTick += this.fps * 3;
      }
    }
  }
  // If pistol is drawn, keep it on frame 2,
  // and if Jones has shot already and missed,
  // shoot that mother fucker
  else {
    this.frame = 2;
    if (!this.gunIsShot && this.jones.gunIsShot && !this.isDead
        && this.jonesShotTick != 0 && !this.jones.footShot) {
      console.log('Jenkins has an easy kill right now');
      if (time > this.jonesShotTick + this.shootTime) {
        console.log('Jenkins shot you!');
        this.gun.shot2.play();
        this.gunIsShot = true;
        this.jones.isShot = true;
      }
    }
  }

  // If Jones is dead,
  // he dead.
  if (this.isDead) {
    this.frame = 3;
    this.dropTheBaby = true;
  }

  if (this.dropTheBaby) {
    if (time > this.babyTick + this.babyFPS
        && this.babyY < (this.canvasHeight - (this.canvasHeight / 5))) {
      this.babyY += 15;
      this.babyTick = time;
    }
    if (this.babyY >= (this.canvasHeight - (this.canvasHeight / 5))) {
      this.babyHasDropped = true;
    }
  }

};

Jenkins.prototype.draw = function(context) {
  if(this.allImagesLoaded()) {
    context.drawImage(this.frames[this.frame], this.x, this.y);
    if (!this.babyHasDropped) {
      context.drawImage(this.baby, this.babyX, this.babyY);
    }
    else {
      context.save();
      context.translate(this.babyX + 35, this.babyY + 50);
      context.rotate(60*Math.PI/180);
      context.drawImage(this.baby, -(this.baby.width/2), -(this.baby.height/2));
      context.restore();
    }
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

