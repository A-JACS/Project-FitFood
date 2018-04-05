$(document).ready(function () {

    var config = {
        apiKey: "AIzaSyDr59vCL72gV07FpEUyu61F8QZVdy4iEuY",
        authDomain: "fireauthen-1c11b.firebaseapp.com",
        databaseURL: "https://fireauthen-1c11b.firebaseio.com",
        projectId: "fireauthen-1c11b",
        storageBucket: "fireauthen-1c11b.appspot.com",
        messagingSenderId: "183413100827"
      };
    firebase.initializeApp(config);

    var database = firebase.database();

    

   $('#google-login').on('click', function(){        

        event.preventDefault();
        var provider = new firebase.auth.GoogleAuthProvider();
       
        return firebase.auth().signInWithPopup(provider).then(function(result) {
            console.log("success");

            window.location = './bmibmr.html';
            // This gives you a Google Access Token. You can use it to access the Google API.
            var token = result.credential.accessToken;
            // The signed-in user info.
            var user = result.user;
            // ...
          })
          .catch(function(error) {
            console.log('Google sign in error', error);
          });

      
    });

   
    firebase.auth().onAuthStateChanged(function(firebaseUser){
        if(firebaseUser){
            console.log(firebaseUser);
        }
        else {
            console.log("not logged in");
        }
    });


// }, function (errorObject) {
//     console.log("The read failed: " + errorObject.code);
});