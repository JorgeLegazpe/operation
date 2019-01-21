window.onload = function() {
  var bone = new Image();

  function draw() {
    clear();
    // ctx.fillStyle = "#FAF7F8";
    // rect(0, 0, WIDTH, HEIGHT);
    // ctx.fillStyle = "#444444";
    // rect(x - 15, y - 15, 30, 30);
    background.src = "images/escenario.png";
    ctx.drawImage(background, 0, 0, 1200, 600);
    ctx.drawImage(bone, xBone, yBone, 30, 30);
    bone.src = "images/bone.png";
  }
};
