var Game = {
  canvas: undefined,
  ctx: undefined,

  start: function() {
    // console.log(data);
    this.canvas = document.getElementById("canvas");
    this.ctx = this.canvas.getContext("2d");

    this.inilicializar();
    this.drawAll();
    this.addListener();
  },
  inilicializar: function() {
    this.organosArray = [];

    data.forEach(
      function(organo) {
        this.organosArray.push(
          new Organo(this, organo.name, organo.y, organo.src)
        );
      }.bind(this)
    );
    this.myBackground = new Background(this);
    this.movimient = new Organo(this);
  },

  addListener: function() {
    this.movimient.addListener();
  },

  drawAll: function() {
    this.organosArray.forEach(function(organo) {
      organo.draw();
    });
    this.myBackground.draw();
  }
};
