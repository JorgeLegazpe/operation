function Organo(game, name, y, src) {
  (this.game = game),
    (this.name = name),
    (this.y = y),
    (this.src = src),
    (this.x = 200),
    (this.WIDTH = 30),
    (this.HEIGHT = 30);
}

Organo.prototype.draw = function() {
  // console.log(this.src);
  var image = new Image();
  image.onload = function() {
    // console.log(this.game);
    this.game.ctx.drawImage(image, this.x, this.y, this.WIDTH, this.HEIGHT);
  }.bind(this);
  image.src = this.src;
};
