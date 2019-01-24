function Organo(game, name, x, y, src) {
  this.game = game;
  this.name = name;
  this.x = x;
  this.y = y;
  this.src = src;
  this.WIDTH = 30;
  this.HEIGHT = 30;
}

Organo.prototype.draw = function() {
  var image = new Image();
  image.onload = function() {
    this.game.ctx.drawImage(image, this.x, this.y, this.WIDTH, this.HEIGHT);
  }.bind(this);
  image.src = this.src;
};
