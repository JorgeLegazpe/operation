window.onload = function() {
  // get canvas related references
  var canvas = document.getElementById("canvas");
  var ctx = canvas.getContext("2d");
  var BB = canvas.getBoundingClientRect();
  var offsetX = BB.left;
  var offsetY = BB.top;
  var WIDTH = canvas.width;
  var HEIGHT = canvas.height;

  // drag related variables
  var dragok = false;
  var startX;
  var startY;

  // listen for mouse events
  canvas.onmousedown = myDown;
  canvas.onmouseup = myUp;
  canvas.onmousemove = myMove;

  // call to draw the scene
  draw();

  // draw a single rect
  function rect(x, y, w, h) {
    ctx.beginPath();
    ctx.rect(x, y, w, h);
    ctx.closePath();
    ctx.fill();
  }

  // clear the canvas
  function clear() {
    ctx.clearRect(0, 0, WIDTH, HEIGHT);
  }

  // redraw the scene
  function draw() {
    clear();
    var background = new Image();
    background.src = "images/escenario.png";
    ctx.drawImage(background, 0, 0, WIDTH, HEIGHT);
    // redraw each rect in the rects[] array
    //ctx.fillRect(0, 0, 120, 120);
    // redraw each rect in the rects[] array
    for (var i = 0; i < rects.length; i++) {
      var r = rects[i];
      var img = new Image();
      img.scr = r.image;
      //ctx.fillStyle = r.fill;
      ctx.drawImage(img, r.x, r.y, r.width, r.height);
    }
  }

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
    for (var i = 0; i < rects.length; i++) {
      var r = rects[i];
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
    for (var i = 0; i < rects.length; i++) {
      rects[i].isDragging = false;
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
      for (var i = 0; i < rects.length; i++) {
        var r = rects[i];
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
}; // end $(function(){});
