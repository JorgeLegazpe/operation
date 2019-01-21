window.onload = function() {
  var canvas;
  var ctx;
  var xBone = 200;
  var yBone = 300;
  var xBrain = 150;
  var yBrain = 250;
  var WIDTH = 1200;
  var HEIGHT = 600;
  var dragok = false;

  canvas = document.getElementById("canvas");
  ctx = canvas.getContext("2d");

  var background = new Image();
  var bone = new Image();
  var brain = new Image();

  function draw() {
    // clear();
    // ctx.fillStyle = "#FAF7F8";
    // rect(0, 0, WIDTH, HEIGHT);
    // ctx.fillStyle = "#444444";
    // rect(x - 15, y - 15, 30, 30);
    background.src = "images/escenario.png";
    ctx.drawImage(background, 0, 0, 1200, 600);
    ctx.drawImage(bone, xBone, yBone, 30, 30);
    bone.src = "images/bone.png";
    ctx.drawImage(brain, xBrain, yBrain, 30, 30);
    brain.src = "images/brain.png";
  }

  // function rect(x, y, w, h) {
  //   ctx.beginPath();
  //   ctx.rect(x, y, w, h);
  //   ctx.closePath();
  //   ctx.fill();
  // }
  // function clear() {
  //   ctx.clearRect(0, 0, WIDTH, HEIGHT);
  // }

  function init() {
    canvas = document.getElementById("canvas");
    ctx = canvas.getContext("2d");
    return setInterval(draw, 10);
  }

  function myMove(e) {
    if (dragok) {
      xBone = e.pageX - canvas.offsetLeft;
      yBone = e.pageY - canvas.offsetTop;
    }
    if (dragok) {
      xBrain = e.pageX - canvas.offsetLeft;
      yBrain = e.pageY - canvas.offsetTop;
    }
  }

  function myDown(e) {
    if (
      e.pageX < xBone + 15 + canvas.offsetLeft &&
      e.pageX > xBone - 15 + canvas.offsetLeft &&
      e.pageY < yBone + 15 + canvas.offsetTop &&
      e.pageY > yBone - 15 + canvas.offsetTop
    ) {
      xBone = e.pageX - canvas.offsetLeft;
      yBone = e.pageY - canvas.offsetTop;
      dragok = true;
      canvas.onmousemove = myMove;
    }
    if (
      e.pageX < xBrain + 15 + canvas.offsetLeft &&
      e.pageX > xBrain - 15 + canvas.offsetLeft &&
      e.pageY < yBrain + 15 + canvas.offsetTop &&
      e.pageY > yBrain - 15 + canvas.offsetTop
    ) {
      xBrain = e.pageX - canvas.offsetLeft;
      yBrain = e.pageY - canvas.offsetTop;
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
