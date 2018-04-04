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

    $(document).on('click', '#logout', function(){

        // event.preventDefault();

        firebase.auth().signOut();

        window.location = './index.html';

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