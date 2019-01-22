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

Organo.prototype.addListener = function() {
  console.log("entra");
  canvas.onmousedown = myDown;
  canvas.onmouseup = myUp;
  canvas.onmousemove = myMove;
  var dragok = false;
  var BB = canvas.getBoundingClientRect();
  var offsetX = BB.left;
  var offsetY = BB.top;
  var startX;
  var startY;

  // manejar eventos cuando clicamos el ratón
  function myDown(e) {
    console.log("boton del raton");
    // Le indicamos al navegador que estamos manejando eventos del ratón
    e.preventDefault();
    e.stopPropagation();

    // Obtenemos la posición actual del ratón
    var mx = parseInt(e.clientX - offsetX);
    var my = parseInt(e.clientY - offsetY);
    console.log(mx, my);

    // Probamos cada objeto para ver si el ratón está dentro
    dragok = false;
    for (var i = 0; i < data.length; i++) {
      var r = data[i];
      if (mx > r.x && mx < r.x + r.WIDTH && my > r.y && my < r.y + r.HEIGHT) {
        // Si es así, se establece dragok y isDragging en true
        dragok = true;
        r.isDragging = true;
      }
    }
    // Guardamos la posición actual
    startX = mx;
    startY = my;
  }

  // manejar eventos cuando soltamos el botón del ratón
  function myUp(e) {
    // Indicamos al navegador que manejamos eventos del ratón
    e.preventDefault();
    e.stopPropagation();

    // Falseamos las variable dragok y isDragging
    dragok = false;
    for (var i = 0; i < data.length; i++) {
      data[i].isDragging = false;
    }
  }

  // manejar eventos cuando movemos el ratón
  function myMove(e) {
    // Si estamos arrastrando algo...
    if (dragok) {
      // Indicamos al navegador que manejamos eventos del ratón
      e.preventDefault();
      e.stopPropagation();

      // Obtenemos la posición actual del ratón
      var mx = parseInt(e.clientX - offsetX);
      var my = parseInt(e.clientY - offsetY);

      // Calculamos la distancia que ha recorrido el ratón
      // desde el último movimiento
      var dx = mx - startX;
      var dy = my - startY;

      // Movemos cada objeto que tenga isDragging en true
      // la distancia que el ratón se ha movido
      // desde el último movimiento
      for (var i = 0; i < data.length; i++) {
        var r = data[i];
        if (r.isDragging) {
          r.x += dx;
          r.y += dy;
        }
      }

      // Redibujamos la nueva posición del objeto
      organo.draw();

      // REstablecemos la posición del ratón para el nuevo movimiento
      startX = mx;
      startY = my;
    }
  }
};
