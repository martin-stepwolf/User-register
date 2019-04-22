// Initialize Firebase
var config = {
  apiKey: "AIzaSyDWWR59uAGPhw7bWVWS3K6iqTa2am4m0LE",
  authDomain: "prueba-234220.firebaseapp.com",
  databaseURL: "https://prueba-234220.firebaseio.com",
  projectId: "prueba-234220",
  storageBucket: "prueba-234220.appspot.com",
  messagingSenderId: "857418068542"
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
            "<div class='alert alert-dark col-4'>Name: " +
              data[a].username +
              "<br>ID:" +
              data[a].id +
              " </div>"
          );
      } else $("#data").append("<div class='alert alert-dark col-12'>Empty</div>");
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

$(document).ready(function() {
  firebase
    .database()
    .ref("users/")
    .on("value", function() {
      Show_data();
    });
});
