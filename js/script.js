// Initialize Firebase
var config = {
    apiKey: "AIzaSyCuByRyaMPAsZRCgeaGPKxD0Kmc0H8sVj4",
    authDomain: "user-register-c98f9.firebaseapp.com",
    databaseURL: "https://user-register-c98f9.firebaseio.com",
    projectId: "user-register-c98f9",
    storageBucket: "user-register-c98f9.appspot.com",
    messagingSenderId: "293708881653",
    appId: "1:293708881653:web:bab170a7d29ab4e54bafbc",
    measurementId: "G-GVKH5PNSZB"
};

var defaultApp = firebase.initializeApp(config);
var defaultDatabase = defaultApp.database();

function writeUserData(name) {
  id_next = firebase
    .database()
    .ref()
    .child("users")
    .push().key;
  firebase
    .database()
    .ref("users/" + name + "/") //agrega la ruta y una id unica
    .set({
      id: id_next,
      username: name
    });
}

function Show_data() {
  firebase
    .database()
    .ref("/users")
    .once("value")
    .then(function(data2) {
      $("#data").text("");
      if (data2.val() != undefined) {
        var data = Object.values(data2.val());
        for (a in data)
          $("#data").append(
            "<div class='alert alert-dark col-12 col-sm-6 col-md-6 col-lg-4 col-xl-3'>Name: " +
              data[a].username +
              "<br>ID:" +
              data[a].id +
              " </div>"
          );
      } else $("#data").append("<div class='alert alert-dark col-12 '>Empty</div>");
    }); //lectura de los datos
}

function Delete_database() {
  firebase
    .database()
    .ref("users/")
    .set({}); //resetea los datos
  $("#data").text("");
  $("#data").append("<div class='alert alert-dark col-12'>Empty</div>");
}

$("form").on("submit", function(e) {
  e.preventDefault();
  writeUserData(
    $(this)
      .find("[name=name]")
      .val()
  );
});

function Download_database() {
  //creamos un FileReader para leer el Blob
  var reader = new FileReader();
  //Definimos la función que manejará el archivo
  //una vez haya terminado de leerlo
  reader.onload = function(event) {
    //Usaremos un link para iniciar la descarga
    var save = document.createElement("a");
    save.href = event.target.result;
    save.target = "_blank";
    //determinacion de fecha para el archivo
    var d = new Date();
    var date_today =
      d.getDate() + "-" + (d.getMonth() + 1) + "-" + d.getFullYear();
    //Truco: así le damos el nombre al archivo
    save.download = "users " + date_today + ".json" || "users.dat";
    var clicEvent = new MouseEvent("click", {
      view: window,
      bubbles: true,
      cancelable: true
    });
    //Simulamos un clic del usuario
    //no es necesario agregar el link al DOM.
    save.dispatchEvent(clicEvent);
    //Y liberamos recursos...
    (window.URL || window.webkitURL).revokeObjectURL(save.href);
  };
  //Genera un objeto Blob con los datos en un archivo TXT
  var texto = [];
  //Lectura desde firebase y llenado de informacion para imprimir
  firebase
    .database()
    .ref("/users")
    .once("value")
    .then(function(data2) {
      if (data2.val() != undefined) {
        var data = Object.values(data2.val());
        texto.push('{\n  "users": {\n');

        for (a in data) {
          texto.push('    "' + data[a].username + '": {\n');
          texto.push('      "id": "' + data[a].id + '",\n');
          texto.push('      "username": "' + data[a].username + '"\n');
          if (a == data.length - 1) texto.push("    }\n");
          else texto.push("    },\n");
        }
        texto.push("  }\n}");
      } else texto = ["no data"];
      //Creacion del Blob
      var print = new Blob(texto, {
        type: "text/plain"
      });
      //Leemos el blob y esperamos a que dispare el evento "load"
      reader.readAsDataURL(print);
    }); //lectura de los datos
}

document.getElementById("file").addEventListener("change", leerArchivo, false);

function leerArchivo(e) {
  var archivo = e.target.files[0];
  // console.log($('#file').val());//imprime una ruta y el nombre del archivo
  var allowedExtensions = /users .*(.json|.JSON)$/i; //formato  y las rutas permitidas
  if (
    allowedExtensions.exec(archivo.name) &&
    archivo.type == "application/json"
  ) {
    // console.log(archivo);// obtenemos de esta variable mucha informacion sobre el archivo
    var lector = new FileReader();
    lector.onload = function(e) {
      var users = JSON.parse(e.target.result).users;
      // console.log(users);//ver los datos
      firebase
        .database()
        .ref("/") //agrega la ruta y una id unica
        .set({ users });
    };
    lector.readAsText(archivo);
  } else
    alert(
      "File invalid, it has to be similar like the files you can download here."
    );
  $("#file").val("");
}

$(document).ready(function() {
  firebase
    .database()
    .ref("users/")
    .on("value", function() {
      Show_data();
    });
});

function check(e) {
  tecla = document.all ? e.keyCode : e.which;
  //Tecla de retroceso para borrar, siempre la permite
  if (tecla == 8) {
    return true;
  }
  // Patron de entrada, en este caso solo acepta numeros y letras
  patron = /[A-Za-z]/;
  tecla_final = String.fromCharCode(tecla);
  return patron.test(tecla_final);
}
