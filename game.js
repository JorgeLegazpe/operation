var Game = {
  canvas: undefined,
  ctx: undefined,

  start: function(id) {
    this.canvas = document.getElementById(id);
    this.ctx = this.canvas.getContext("2d");
    this.dragok = false;
    this.BB = canvas.getBoundingClientRect();
    this.offsetX = this.BB.left;
    this.offsetY = this.BB.top;
    this.startX;
    this.startY;
    this.currentValueX = 0;
    this.currentValueY = 0;
    this.camilla = {
      x: 950,
      y: 420,
      width: 250,
      height: 200
    };
    this.selection = {};

    this.inilicializar();
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
          new Organo(this, organo.name, organo.x, organo.y, organo.src)
        );
      }.bind(this)
    );
    this.myBackground = new Background(this);
  },

  drawAll: function() {
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

    for (var i = 0; i < this.organosArray.length; i++) {
      var r = this.organosArray[i];

      if (mx > r.x && mx < r.x + r.WIDTH && my > r.y && my < r.y + r.HEIGHT) {
        // Si es así, se establece dragok y isDragging en true
        this.dragok = true;
        r.isDragging = true;
        this.selection = r;
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

    this.currentValueX = e.screenX;
    this.currentValueY = e.screenY;

    e.stopPropagation();

    // Falseamos las variable dragok y isDragging
    this.dragok = false;
    for (var i = 0; i < this.organosArray.length; i++) {
      this.organosArray[i].isDragging = false;
    }

    this.check(this.selection);
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
      var r;
      for (var i = 0; i < this.organosArray.length; i++) {
        r = this.organosArray[i];
        if (r.isDragging) {
          r.x += dx;
          r.y += dy;
        }
      }

      // Redibujamos la nueva posición del objeto

      this.myBackground.draw();
      this.organosArray.forEach(function(organo) {
        organo.draw();
      });

      // Restablecemos la posición del ratón para el nuevo movimiento
      this.startX = mx;
      this.startY = my;
    }
  },
  check: function() {
    if (
      this.currentValueX > this.camilla.x &&
      this.currentValueX + 30 < this.camilla.x + this.camilla.width &&
      this.currentValueY > this.camilla.y &&
      this.currentValueY + 30 < this.camilla.y + this.camilla.height
    ) {
      if (questions[this.selection.name]) {
        var numberQuestion = Math.floor(Math.random() * 3);

        document.getElementById("question").innerHTML =
          questions[this.selection.name][numberQuestion].question;

        document.getElementById("labelAns1").innerHTML =
          questions[this.selection.name][numberQuestion].answers[0];
        document.getElementById("labelAns2").innerHTML =
          questions[this.selection.name][numberQuestion].answers[1];
        document.getElementById("tarjeta").style.display = "block";
        document.getElementById("labelAns3").innerHTML =
          questions[this.selection.name][numberQuestion].answers[2];

        // Cuando el jugador pincha el botón de enviar respuesta:
        // *Comprobar si la respuesta es correcta o no

        // $("#respuestas input[name='answer']").c(function() {
        //   debugger;
        //   var valorestrella = $(this).val();
        //   console.log(valorestrella);
        // });

        // $(document).ready(function() {
        //   $("#enviar").click(function() {
        //     alert($("input:radio[name=edad]:checked").val());
        //   });
        // });
        // document.querySelector('#enviar')
      }
    } else {
      document.getElementById("caida").style.display = "block";

      // Cuando pinchamos al botón:
      // * Devolver el órgano a su posición original
      // * Resetear una vida
    }
  }
};
