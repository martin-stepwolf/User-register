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
      var data = Object.values(data2.val());
      $("#data").text("");
      for (a in data)
        $("#data").append(
          "<div class='alert alert-dark col-4'>Name: " +
            data[a].username +
            "<br>ID:" +
            data[a].id +
            " </div>"
        );
    }); //lectura de los datos
}

function Delete_database() {
  firebase
    .database()
    .ref("users/")
    .set({}); //resetea los datos
  $("#data").text("");
}

$("form").on("submit", function(e) {
  e.preventDefault();
  writeUserData(
    $(this)
      .find("[name=name]")
      .val()
  );
  Show_data();
});

$(document).ready(function() {
  Show_data();
});
