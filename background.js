function Background(game) {
  (this.game = game),
    (this.image = new Image()),
    (this.src = "images/escenario.png"),
    (this.x = 0),
    (this.y = 0),
    (this.WIDTH = 1200),
    (this.HEIGHT = 600);
}

Background.prototype.draw = function() {
  this.image.onload = function() {
    this.game.ctx.drawImage(
      this.image,
      this.x,
      this.y,
      this.WIDTH,
      this.HEIGHT
    );
  }.bind(this);
  console.log(this.image.src);
  this.image.src = this.src;
};