window.onload = function() {
  var canvas;
  var ctx;
  var x = 75;
  var y = 50;
  var WIDTH = 1200;
  var HEIGHT = 600;
  var dragok = false;
  var background = new Image();

  canvas = document.getElementById("canvas");
  ctx = canvas.getContext("2d");

  background.src = "images/escenario.png";
  ctx.drawImage(background, 0, 0, 1200, 600);

  var bone = new Image();

  function draw() {
    clear();
    ctx.fillStyle = "#FAF7F8";
    rect(0, 0, WIDTH, HEIGHT);
    ctx.fillStyle = "#444444";
    rect(x - 15, y - 15, 30, 30);
    // background.src = "images/escenario.png";
    // ctx.drawImage(background, 0, 0, 1200, 600);
    ctx.drawImage(bone, 10, 10, 50, 50);
    bone.src = "images/bone.png";
  }

  function rect(x, y, w, h) {
    ctx.beginPath();
    ctx.rect(x, y, w, h);
    ctx.closePath();
    ctx.fill();
  }
  function clear() {
    ctx.clearRect(0, 0, WIDTH, HEIGHT);
  }

  function init() {
    canvas = document.getElementById("canvas");
    ctx = canvas.getContext("2d");
    return setInterval(draw, 10);
  }

  function myMove(e) {
    if (dragok) {
      x = e.pageX - canvas.offsetLeft;
      y = e.pageY - canvas.offsetTop;
    }
  }

  function myDown(e) {
    if (
      e.pageX < x + 15 + canvas.offsetLeft &&
      e.pageX > x - 15 + canvas.offsetLeft &&
      e.pageY < y + 15 + canvas.offsetTop &&
      e.pageY > y - 15 + canvas.offsetTop
    ) {
      x = e.pageX - canvas.offsetLeft;
      y = e.pageY - canvas.offsetTop;
      dragok = true;
      canvas.onmousemove = myMove;
    }
  }

  function myUp() {
    dragok = false;
    canvas.onmousemove = null;
  }

  init();
  canvas.onmousedown = myDown;
  canvas.onmouseup = myUp;
};
