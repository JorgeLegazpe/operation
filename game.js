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
    this.credits = 5;
    this.score = 0;
    this.mySong = new Audio("Audios/caida2.mp3");
    this.mySong2 = new Audio("Audios/winner.mp3");
    this.mySong3 = new Audio("Audios/Error.mp3");
    this.mySong4 = new Audio("Audios/gameover.mp3");
    this.positionFinal = {
      brain: {
        x: 1100,
        y: 450
      },
      heart: {
        x: 1070,
        y: 510
      },
      lungs: {
        x: 1030,
        y: 490
      },
      liver: {
        x: 1020,
        y: 520
      },
      bone: {
        x: 950,
        y: 560
      }
    };

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
      this.mySong2.play();
      document.getElementById("tarjeta").style.display = "none";
      document.getElementById("correcta").style.display = "block";
      var that = this;
      this.score += 100;
      document.getElementById("puntuación").innerHTML = this.score;
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
      this.mySong3.play();
      document.getElementById("tarjeta").style.display = "none";
      document.getElementById("incorrecta").style.display = "block";
      this.score -= 50;
      document.getElementById("puntuación").innerHTML = this.score;
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
      this.removeLives();
    }
  },
  addLives: function() {
    $("#lives :i");
  },
  removeLives: function() {
    var that = this;
    if (this.credits > 1) {
      this.credits--;
      $("#lives :last-child").remove();
    } else {
      $("#lives :last-child").remove();
      this.mySong4.play();
      document.getElementById("gameOver").style.display = "block";
      document.getElementById("final").addEventListener("click", function() {
        document.getElementById("gameOver").style.display = "none";
        location.reload();
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
      }
    } else {
      document.getElementById("caida").style.display = "block";
      var that = this;
      this.removeLives();
      this.mySong.play();
      this.score -= 25;
      document.getElementById("puntuación").innerHTML = this.score;
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
    }
  },
  reset: function() {
    document.getElementById("reset").addEventListener("click", function() {
      document.getElementById("reset").style.display = "none";
    });
  }
};
