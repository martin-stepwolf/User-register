var defaultApp = firebase.initializeApp(config);
var defaultDatabase = defaultApp.database();
function writeUserData(name) {
  firebase
    .database()
    .ref("usuarios/")
    .set({
      username: name
    });
}

