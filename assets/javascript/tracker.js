var uid = localStorage.getItem("uid");
var bmi = localStorage.getItem("bmi");
var bmr = localStorage.getItem("bmr");

$(document).ready(function () {
    var elemListDuration = document.querySelector('.duration');
    var instanceDuration = M.FormSelect.init(elemListDuration);

    var elemListSets = document.querySelector('.sets');
    var instanceSets = M.FormSelect.init(elemListSets);


    // var elemDate = document.querySelector('.datepicker');
    // var instanceDate = M.Datepicker.init(elemDate, autoClose);

    // $('select').formSelect();
    // $('#date').pickadate({
    //     selectMonths: true, 
    //     selectYears: 15 ,
    //     autoClose: true
    //   });


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

    $(document).on("click", "#add-log", function () {

      console.log("button");
      // Don't refresh the page!
      event.preventDefault();
  
      console.log($("#exercise-input").val());
      console.log($("#duration-input  option:selected").val());
      console.log($("#sets-input  option:selected").val());
      // console.log($("#date-input  option:selected").val());
      console.log($("#date-input").datepicker({ dateFormat: 'dd-mm-yy' }).val());
  
  
      database.ref().push({
        "userID": uid,
        "dataType": "log",
        "exercise": $("#exercise-input").val(),
        "duration": $("#duration-input").val(),
        "sets": $("#sets-input").val(),
        "bmi": bmi,
        "bmr": bmr,
        "date": $("#date-input").datepicker({ dateFormat: 'dd-mm-yy' }).val()
      });
  
      $("#exercise-input").val("");
      $("#duration-input").val("");
      $("#sets-input").val("");
      $("#date-input").val("");
  
    });


    database.ref().on("child_added", function (snapshot) {

      // Print the initial data to the console.
      console.log(snapshot.val().userID);  
      console.log(uid);      
      
      if ((snapshot.val().userID==uid) && (snapshot.val().dataType=="log"))
      {
      $("#log-table > tbody").append("<tr><td>" + snapshot.val().exercise + "</td><td>" + snapshot.val().duration + "</td><td>" +
                                          snapshot.val().sets + "</td><td>" + snapshot.val().bmi+ "</td><td>" + 
                                          snapshot.val().bmr + "</td><td>" + snapshot.val().date +
                                          "</td></tr>");
      }
  
    });

    $( function() {
      $( "#date-input" ).datepicker();
    } );

  }, function (errorObject) {
    console.log("The read failed: " + errorObject.code);
  });
  