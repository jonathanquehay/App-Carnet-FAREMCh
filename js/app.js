$("document").ready(function () {

  //Para el input
  var n, a;//Variables para capturar nombres y apellidos para generar archivo png
  var inputFile = document.getElementById('dato_img');
  inputFile.addEventListener('change', mostrarImagen, false);//Llamada a la función
  var aimprimir = $("#imagen-carnet");
  var vista_imagen;
  document.getElementById("formulario").addEventListener('submit', guardar, false);
  document.getElementById("limpiar").addEventListener('click', limpia);

  // Función muestra la imagen en el div
  function mostrarImagen(event) {
    var file = event.target.files[0];
    var reader = new FileReader();
    reader.onload = function (event) {
      $('#cargas').css('background-image', 'url(' + event.target.result + ')');

    }
    reader.readAsDataURL(file);
  }


  //Funciones propias de materializecss 

  $(".button-collapse").sideNav();
  $('.scrollspy').scrollSpy({
    scrollOffset: 80,
  });
  $('.slider').slider({ indicators: false, height: 320 });


  //Previsualizar la imagen antes de imprimir
  $("#preview").on('click', function () {
    /*html2canvas(document.querySelector("#imagen-carnet")).then(canvas => {
      allowTaint = true;
      $("#vista").append(canvas);
      vista_imagen = canvas;
    });*/

    html2canvas(document.querySelector("#imagen-carnet"), { allowTaint: true, logging: true }).then(function (canvas) {
      $("#vista").append(canvas);
      vista_imagen = canvas;
    });
  });

  //Descarga la imagen para imprimir
  $("#descargar-carnet").on('click', function () {
    var imgageData = vista_imagen.toDataURL("image/jpg");
    var newData = imgageData.replace(/^data:image\/jpg/, "data:application/octet-stream");
    $("#descargar-carnet").attr("download", n + " " + a).attr("href", newData);
    $("#d_nombres").empty();
    $("#d_apellidos").empty();
    $("#d_cargo").empty();
    $("#d_inss").empty();
    $("#d_cedula").empty();
    $("#d_direccion").empty();
    location.reload();
  });

  //*************************************************
  //Enviar los datos
  //**************************************************
  function guardar(e) {
    e.preventDefault();
    n = e.target.nombres.value;
    a = e.target.apellidos.value;
    $("#d_nombres").html(e.target.nombres.value);
    $("#d_apellidos").append(e.target.apellidos.value);
    $("#d_cargo").append(e.target.cargo.value);
    $("#d_inss").append(e.target.inss.value);
    $("#d_cedula").append(e.target.cedula.value);
    $("#d_direccion").append(e.target.direccion.value);
    this.reset();

  }
  function limpia() {
    // document.getElementById("d_nombres").innerHTML = "";
    $("#d_nombres").empty();
    $("#d_apellidos").empty();
    $("#d_cargo").empty();
    $("#d_inss").empty();
    $("#d_cedula").empty();
    $("#d_direccion").empty();
  }
});
