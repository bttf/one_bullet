function Game() {
  var assets = ['img/start_menu.png'];

  this.menus = [];
  for (var i = 0; i < assets.length; i++) {
    this.menus.push(new Image());
    this.menus[i].src = assets[i];
  }

  this.background = {};
  this.jones = {};
  this.mother = {};
  this.lineSight = {};
  this.gun = {};
  this.jenkins = {};
  this.gameOver = {};
  this.chandelier = {};
  this.winOrLose = "nothing_yet";
  this.gameIsOver = false;

  this.gameHasStarted = false;
}

Game.prototype.init = function(canvasWidth, canvasHeight) {
  this.canvasWidth = canvasWidth;
  this.canvasHeight = canvasHeight;

  this.background = new Background(canvasWidth, canvasHeight);
  this.jones = new Jones(canvasWidth, canvasHeight);
  this.mother = new Mother(canvasWidth, canvasHeight);
  this.lineSight = new LineSight(canvasWidth, canvasHeight, this.jones);
  this.gun = new Gun(this.lineSight, this.jones);
  this.jenkins = new Jenkins(canvasWidth, canvasHeight, this.jones);
  this.gameOver = new GameOver(canvasWidth, canvasHeight);
  this.chandelier = new Chandelier(canvasWidth, canvasHeight, this.mother);
};

Game.prototype.render = function(time) {
  if (!this.gameHasStarted) {
    if (this.allMenusLoaded()) {
      this.menusX = (this.canvasWidth / 2) - (this.menus[0].width / 2);
      this.menusY = (this.canvasHeight / 2) - (this.menus[0].height / 2);
    }
  }
  this.mother.render(time);
  this.jenkins.render(time);
  this.chandelier.render(time);
  this.lineSight.render(time);
  this.jones.render(time);

  if (this.jones.gunIsShot && !this.gameIsOver) {
    this.jenkins.jonesShotTick = time;
    this.gameIsOver = true;

    if (this.lineSight.doesIntersect(this.mother)) {
      console.log('WTF YOU JUST SHOT THE MOTHER');
      this.mother.scream.play();
      this.mother.die();
    }
    else if (this.lineSight.doesIntersect(this.chandelier)) {
      console.log('You hit the chandelier! Dumbass!');
      this.chandelier.fall();
    }
    else if (this.lineSight.doesIntersect(this.jenkins)) {
      console.log('You just shot Jenkins!');
      this.jenkins.isDead = true;
    }
    else if (this.lineSight.doesIntersect(this.jones.feet)) {
      this.jones.footShot = true;
      this.mother.laugh();
      this.jenkins.laugh();
    }
  }
};

Game.prototype.draw = function(context) {
  this.background.draw(context);
  this.mother.draw(context);
  this.jenkins.draw(context);
  this.chandelier.draw(context);
  this.lineSight.draw(context);
  this.jones.draw(context);
  if (!this.gameHasStarted && this.allMenusLoaded()) {
    context.drawImage(this.menus[0], this.menusX, this.menusY);
  }

  //if (this.winOrLose !== "win" && this.winOrLose !== "lose") {
  //if (this.jenkins.gunIsShot) {
  //if (!this.jones.gunIsShot) {
  //console.log('YOU LOSE');
  //this.winOrLose = "lose";
  //}
  //else {
  //if (this.jenkins.isDead) {
  //console.log('YOU WIN');
  //this.winOrLose = "win";
  //}
  //}
  //}
  //else {
  //if (this.jones.gunIsShot) {
  //console.log('YOU WIN');
  //this.winOrLose = "win";
  //}
  //}
  //}
  //else {
  //this.gameIsOver = true;
  //if (this.winOrLose === "win") {
  //this.gameOver.drawYouWin(context);
  //}
  //else if (this.winOrLose === "lose") {
  //this.gameOver.drawYouLose(context);
  //}
  //}
};

Game.prototype.mousemove = function(e) {
  if (this.gameHasStarted) {
    this.lineSight.mousemove(e);
  }
};

Game.prototype.mousedown = function(e) {
  if (this.gameHasStarted) {
    this.gun.mousedown(e);
  }
  else {
    this.gameHasStarted = true;
  }
};

Game.prototype.keydown = function(e) {
  if (this.gameHasStarted) {
    this.gun.keydown(e);
  }
};

Game.prototype.allMenusLoaded = function() {
  var allComplete = true;
  for (var i = 0; i < this.menus.length; i++) {
    if (!this.menus[i].complete) {
      allComplete = false;
    }
  }
  return allComplete;
};
