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
// writeUserData("raul");

firebase
  .database()
  .ref("/users")
  .once("value")
  .then(function(data2) {
    var data = Object.values(data2.val());
    console.log(data);
    for (a in data)
      $("#data").append(
        "<div class='alert alert-dark col-6'>Nombre: " +
          data[a].username +
          "<br>ID:" +
          data[a].id +
          " </div>"
      );
  }); //lectura de los datos

$("form").on("submit", function() {
  writeUserData(
    $(this)
      .find("[name=name]")
      .val()
  );
});
