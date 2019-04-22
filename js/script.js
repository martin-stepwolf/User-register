// Initialize Firebase
var config = {
  apiKey: "AIzaSyCwfzmrTahppTl4EFwX1DywiqajR84P1JU",
  authDomain: "martin-aa100.firebaseapp.com",
  databaseURL: "https://martin-aa100.firebaseio.com",
  projectId: "martin-aa100",
  storageBucket: "martin-aa100.appspot.com",
  messagingSenderId: "937744268341"
};
console.log(firebase.initializeApp(config));
console.log(firebase.app().name);
