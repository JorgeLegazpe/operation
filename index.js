window.onload = function() {
  Game.start("canvas");
  $("#boton").on("click", function() {
    respuesta = $("input:radio[name=answer]:checked").val();
    Game.comprobacion(respuesta);
  });
  $("#reset").on("click", function() {
    document.getElementById("overlay").style.display = "none";
  });
};
