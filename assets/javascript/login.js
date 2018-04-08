$(document).ready(function () {

  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyDccrOZU8MzbhKL5sBObEDDxHI39Y8RfcM",
    authDomain: "fitfood-7f508.firebaseapp.com",
    databaseURL: "https://fitfood-7f508.firebaseio.com",
    projectId: "fitfood-7f508",
    storageBucket: "fitfood-7f508.appspot.com",
    messagingSenderId: "239052826076"
  };
  
  firebase.initializeApp(config);

    var database = firebase.database();

    $('#google-login').on('click', function () {

        event.preventDefault();
        var provider = new firebase.auth.GoogleAuthProvider();

        return firebase.auth().signInWithPopup(provider).then(function (result) {
            console.log("success");

            
            // This gives you a Google Access Token. You can use it to access the Google API.
            var token = result.credential.accessToken;
            // The signed-in user info.
            var user = result.user;

            localStorage.setItem("uid", user.uid);
            console.log(localStorage.uid);
            window.location = './bmibmr.html';
            // ...
        })
            .catch(function (error) {
                console.log('Google sign in error', error);
            });


    });

    $('#github-login').on('click', function () {
        event.preventDefault();
        var provider = new firebase.auth.GithubAuthProvider();

        return firebase.auth().signInWithPopup(provider).then(function (result) {
            window.location = './bmibmr.html';
            // This gives you a GitHub Access Token. You can use it to access the GitHub API.
            var token = result.credential.accessToken;
            // The signed-in user info.
            var user = result.user;
            // ...
        }).catch(function (error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            // The email of the user's account used.
            var email = error.email;
            // The firebase.auth.AuthCredential type that was used.
            var credential = error.credential;
            // ...
        });


    });


    firebase.auth().onAuthStateChanged(function (firebaseUser) {
        if (firebaseUser) {
            console.log(firebaseUser);
        }
        else {
            console.log("not logged in");
        }
    });


    // }, function (errorObject) {
    //     console.log("The read failed: " + errorObject.code);
});