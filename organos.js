function Organo(game, name, y, src) {
  (this.game = game),
    (this.name = name),
    (this.y = y),
    (this.src = src),
    (this.x = 200),
    ((this.WIDTH = 30), (this.HEIGHT = 30));
  //this.addListener();
}

Organo.prototype.draw = function() {
  console.log(this.src);
  var image = new Image();
  image.onload = function() {
    console.log(this.game);
    this.game.ctx.drawImage(image, this.x, this.y, this.WIDTH, this.HEIGHT);
  }.bind(this);
  image.src = this.src;
};

Organo.prototype.addListener = function() {
  // handle mousedown events
  function myDown(e) {
    // tell the browser we're handling this mouse event
    e.preventDefault();
    e.stopPropagation();

    // get the current mouse position
    var mx = parseInt(e.clientX - offsetX);
    var my = parseInt(e.clientY - offsetY);

    // test each rect to see if mouse is inside
    dragok = false;
    for (var i = 0; i < data.length; i++) {
      var r = data[i];
      if (mx > r.x && mx < r.x + r.width && my > r.y && my < r.y + r.height) {
        // if yes, set that rects isDragging=true
        dragok = true;
        r.isDragging = true;
      }
    }
    // save the current mouse position
    startX = mx;
    startY = my;
  }

  // handle mouseup events
  function myUp(e) {
    // tell the browser we're handling this mouse event
    e.preventDefault();
    e.stopPropagation();

    // clear all the dragging flags
    dragok = false;
    for (var i = 0; i < data.length; i++) {
      data[i].isDragging = false;
    }
  }

  // handle mouse moves
  function myMove(e) {
    // if we're dragging anything...
    if (dragok) {
      // tell the browser we're handling this mouse event
      e.preventDefault();
      e.stopPropagation();

      // get the current mouse position
      var mx = parseInt(e.clientX - offsetX);
      var my = parseInt(e.clientY - offsetY);

      // calculate the distance the mouse has moved
      // since the last mousemove
      var dx = mx - startX;
      var dy = my - startY;

      // move each rect that isDragging
      // by the distance the mouse has moved
      // since the last mousemove
      for (var i = 0; i < data.length; i++) {
        var r = data[i];
        if (r.isDragging) {
          r.x += dx;
          r.y += dy;
        }
      }

      // redraw the scene with the new rect positions
      draw();

      // reset the starting mouse position for the next mousemove
      startX = mx;
      startY = my;
    }
  }
};
