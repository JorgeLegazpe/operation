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
    this.respuesta;
    this.numberQuestion;

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
  comprobacion: function(respuesta) {
    var correctAnswer =
      questions[this.selection.name][this.numberQuestion].correcta;
    if (respuesta == correctAnswer) {
      document.getElementById("tarjeta").style.display = "none";
      document.getElementById("correcta").style.display = "block";
      var that = this;
      document
        .getElementById("sigueJugando")
        .addEventListener("click", function() {
          for (var i = 0; i < that.organosArray.length; i++) {
            if (that.selection.name === that.organosArray[i].name) {
              var currentOrgano = that.organosArray[i];
              currentOrgano.x = that.selection.x;
              currentOrgano.y = that.selection.y;
            }
          }
          document.getElementById("correcta").style.display = "none";
          $("input:radio[name=answer]")[0].checked = false;
          $("input:radio[name=answer]")[1].checked = false;
          $("input:radio[name=answer]")[2].checked = false;
        });
    } else {
      document.getElementById("tarjeta").style.display = "none";
      document.getElementById("incorrecta").style.display = "block";
      var that = this;
      document.getElementById("vuelve").addEventListener("click", function() {
        for (var i = 0; i < that.organosArray.length; i++) {
          if (that.selection.name === that.organosArray[i].name) {
            var currentOrgano = that.organosArray[i];
            currentOrgano.x = data[i].x;
            currentOrgano.y = data[i].y;
            that.drawAll();
          }
        }
        document.getElementById("incorrecta").style.display = "none";
        $("input:radio[name=answer]")[0].checked = false;
        $("input:radio[name=answer]")[1].checked = false;
        $("input:radio[name=answer]")[2].checked = false;
      });
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
        this.numberQuestion = Math.floor(Math.random() * 3);

        document.getElementById("question").innerHTML =
          questions[this.selection.name][this.numberQuestion].question;

        document.getElementById("labelAns1").innerHTML =
          questions[this.selection.name][this.numberQuestion].answers[0];
        document.getElementById("labelAns2").innerHTML =
          questions[this.selection.name][this.numberQuestion].answers[1];
        document.getElementById("tarjeta").style.display = "block";
        document.getElementById("labelAns3").innerHTML =
          questions[this.selection.name][this.numberQuestion].answers[2];

        // Cuando el jugador pincha el botón de enviar respuesta:
        // *Comprobar si la respuesta es correcta o no
        var that = this;
        $(document).ready(function() {
          $("#boton").click(function() {
            respuesta = $("input:radio[name=answer]:checked").val();
            that.comprobacion(respuesta);
          });
        });
      }
    } else {
      document.getElementById("caida").style.display = "block";
      var that = this;
      document
        .getElementById("caidaOrgano")
        .addEventListener("click", function() {
          for (var i = 0; i < that.organosArray.length; i++) {
            if (that.selection.name === that.organosArray[i].name) {
              var currentOrgano = that.organosArray[i];
              currentOrgano.x = data[i].x;
              currentOrgano.y = data[i].y;
              that.drawAll();
            }
          }
          document.getElementById("caida").style.display = "none";
        });

      // Cuando pinchamos al botón:
      // * Devolver el órgano a su posición original
      // * Resetear una vida
    }
  }
};
