function LineSight(canvasWidth, canvasHeight, shooter) {
  this.shooter = shooter;
  this.canvasWidth = canvasWidth;
  this.canvasHeight = canvasHeight;
  this.x = canvasWidth - (canvasWidth / 6);
  this.y = shooter.y + (shooter.frames[0].height / 3);
  this.targetX = 0;
  this.targetY = this.y;
}

LineSight.prototype.render = function(time) {
  // follow the mouse 
  this.x = this.canvasWidth - (this.canvasWidth / 6);
  this.y = this.shooter.y + (this.shooter.frames[0].height / 3);
};

LineSight.prototype.draw = function(context) {
  context.beginPath();
  context.moveTo(this.x, this.y);
  context.lineTo(this.targetX, this.targetY);
  context.lineWidth = 1;
  context.strokeStyle = 'rgba(255, 0, 0, 0.3)';
  context.stroke();
}

LineSight.prototype.mousemove = function(e) {
  var x = e.clientX;
  var y = e.clientY;
  var dx, dy;
  if (x < this.x) {
    while (x > 0 && y > 0) {
      dx = this.x - x;
      dy = this.y - y;
      x -= dx;
      y -= dy;
    }
    this.targetX = x;
    this.targetY = y;
  }
};

LineSight.prototype.doesIntersect = function(obj) {
  var x = this.targetX;
  var y = this.targetY;
  while (x < this.x) {
    if (y > obj.y && x > obj.x
        && y < obj.y + obj.height
        && x < obj.x + obj.width) {
      console.log('you just hit obj at %d, %d', obj.x, obj.y);
      return true;
    }
    dx = this.x - this.targetX;
    dy = this.y - this.targetY;
    x += dx / 20;
    y += dy / 20;
  }
  return false;
};

