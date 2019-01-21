var Game = {
  canvas: undefined,
  ctx: undefined,

  start: function() {
    console.log(data);
    this.canvas = document.getElementById("canvas");
    this.ctx = this.canvas.getContext("2d");

    this.inilicializar();
    this.draw();
  },
  inilicializar: function() {
    this.organosArray = [];

    data.forEach(
      function(organo) {
        console.log(organo);
        this.organosArray.push(
          new Organo(this, organo.name, organo.y, organo.src)
        );
      }.bind(this)
    );
  },
  draw: function() {
    console.log(this.organosArray);
    this.organosArray.forEach(function(organo) {
      organo.draw();
    });
  }
};

// function clear() {
//   ctx.clearRect(0, 0, WIDTH, HEIGHT);
// }

// function draw(organos) {
//   clear();

//   for (var i = 0; i < organos.length; i++) {
//     var r = organos[i];
//     var img = new Image();
//     img.scr = r.image;
//     //ctx.fillStyle = r.fill;
//     ctx.drawImage(img, r.x, r.y, r.width, r.height);
//   }
// }
