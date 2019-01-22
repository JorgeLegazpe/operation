var Game = {
  canvas: undefined,
  ctx: undefined,

  start: function() {
    this.canvas = document.getElementById("canvas");
    this.ctx = this.canvas.getContext("2d");
    this.dragok = false;
    this.BB = canvas.getBoundingClientRect();
    this.offsetX = this.BB.left;
    this.offsetY = this.BB.top;
    this.startX;
    this.startY;
    this.longitud = data.length;

    this.inilicializar();
    //this.clear();
    this.drawAll();
    this.addListener();
  },

  clear: function() {
    this.ctx.clearRect(0, 0, 1200, 600);
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
  },

  drawAll: function() {
    //this.clear();
    this.organosArray.forEach(function(organo) {
      organo.draw();
    });
    this.myBackground.draw();
  },

  addListener: function() {
    console.log("entra");

    this.canvas.addEventListener(
      "mousedown",
      function(e) {
        this.myDown(e);
      }.bind(this),
      false
    );
    this.canvas.addEventListener(
      "mouseup",
      function(e) {
        this.myUp(e);
      }.bind(this),
      false
    );
    this.canvas.addEventListener(
      "mousemove",
      function(e) {
        this.myMove(e);
      }.bind(this),
      false
    );
  },

  // manejar eventos cuando clicamos el ratón

  myDown: function(e) {
    console.log("boton del raton");
    // Le indicamos al navegador que estamos manejando eventos del ratón
    e.preventDefault();
    e.stopPropagation();

    // Obtenemos la posición actual del ratón
    var mx = parseInt(e.clientX - this.offsetX);
    var my = parseInt(e.clientY - this.offsetY);
    console.log("pincho en " + "x: " + mx + " y: " + my);

    // Probamos cada objeto para ver si el ratón está dentro

    this.dragok = false;

    for (var i = 0; i < this.longitud; i++) {
      var r = this.organosArray[i];

      if (mx > r.x && mx < r.x + r.WIDTH && my > r.y && my < r.y + r.HEIGHT) {
        // Si es así, se establece dragok y isDragging en true
        this.dragok = true;
        r.isDragging = true;
      }
    }
    // Guardamos la posición actual
    this.startX = mx;
    this.startY = my;
  },

  // manejar eventos cuando soltamos el botón del ratón

  myUp: function(e) {
    // Indicamos al navegador que manejamos eventos del ratón
    e.preventDefault();
    e.stopPropagation();
    // Falseamos las variable dragok y isDragging
    this.dragok = false;
    for (var i = 0; i < this.organosArray.length; i++) {
      this.organosArray[i].isDragging = false;
    }
  },

  // manejar eventos cuando movemos el ratón

  myMove: function(e) {
    // Si estamos arrastrando algo...
    if (this.dragok) {
      // Indicamos al navegador que manejamos eventos del ratón
      e.preventDefault();
      e.stopPropagation();

      // Obtenemos la posición actual del ratón
      var mx = parseInt(e.clientX - this.offsetX);
      var my = parseInt(e.clientY - this.offsetY);

      // Calculamos la distancia que ha recorrido el ratón
      // desde el último movimiento
      var dx = mx - this.startX;
      var dy = my - this.startY;

      // Movemos cada objeto que tenga isDragging en true
      // la distancia que el ratón se ha movido
      // desde el último movimiento
      for (var i = 0; i < this.organosArray.length; i++) {
        var r = this.organosArray[i];
        if (r.isDragging) {
          r.x += dx;
          r.y += dy;
        }
      }

      // Redibujamos la nueva posición del objeto
      console.log(this);
      this.clear();
      this.organosArray.forEach(function(organo) {
        organo.draw();
      });

      // REstablecemos la posición del ratón para el nuevo movimiento
      this.startX = mx;
      this.startY = my;
    }
  }
};
