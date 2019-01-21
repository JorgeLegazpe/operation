var Game = {
  canvas: undefined,
  ctx: undefined,

  start: function() {
    // console.log(data);
    this.canvas = document.getElementById("canvas");
    this.ctx = this.canvas.getContext("2d");

    this.inilicializar();
    this.draw();
    //this.background();
    //this.addListener();
  },
  inilicializar: function() {
    this.organosArray = [];

    data.forEach(
      function(organo) {
        // console.log(organo);
        this.organosArray.push(
          new Organo(this, organo.name, organo.y, organo.src)
        );
      }.bind(this)
    );
  },

  // background: function() {
  //   background.draw();
  // },

  // addListener: function() {
  //   organo.addListener();
  // },

  draw: function() {
    // console.log(this.organosArray);
    this.organosArray.forEach(function(organo) {
      organo.draw();
    });
  }
};
