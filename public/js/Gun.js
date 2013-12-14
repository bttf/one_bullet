function Gun(shooter) {
  var assets = ['audio/draw.ogg',
                'audio/cock.ogg',
                'audio/shot.ogg'];
  this.draw = new Audio(assets[0]);
  this.cock = new Audio(assets[1]);
  this.shot = new Audio(assets[2]);

  this.shooter = shooter;

  this.draw.preload = "auto";
  this.cock.preload = "auto";
  this.shot.preload = "auto";

  this.isDrawn = false;
  this.isCocked = false;

  this.bullets = 1;
}

Gun.prototype.keydown = function(e) {
  switch(e.keyCode) {
    case 32:
      if (this.isDrawn == false) {
        this.shooter.drawPistol();
        this.draw.play();
        this.isDrawn = true;
      }
      break;
    case 17:
      if (this.isDrawn && !this.isCocked) {
        this.cock.play();
        this.isCocked = true;
      }
      break;
  }
};

Gun.prototype.mousedown = function(e) {
  if (this.isDrawn && this.isCocked && this.bullets > 0) {
    this.shot.play();
    this.bullets--;
  }
};
