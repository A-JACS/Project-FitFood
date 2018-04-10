var uid = localStorage.getItem("uid");
var bmi = localStorage.getItem("bmi");
var bmr = localStorage.getItem("bmr");

$("#date-input").removeClass("white-text");
$("#date-input").addClass("black-text");

var updateKey = "";

$(document).ready(function () {
  var elemListDuration = document.querySelector('.duration');
  var instanceDuration = M.FormSelect.init(elemListDuration);

  var elemListSets = document.querySelector('.sets');
  var instanceSets = M.FormSelect.init(elemListSets);

  var elemListDurationUpd = document.querySelector('.duration-update');
  var instanceDurationUpd = M.FormSelect.init(elemListDurationUpd);

  var elemListSetsUpd = document.querySelector('.sets-update');
  var instanceSetsUpd = M.FormSelect.init(elemListSetsUpd);

  var elemModal = document.querySelector('.modal');
  var instanceModal = M.Modal.init(elemModal);
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

    if (($("#exercise-input").val() == "") || ($("#date-input").val() == "Select Date")) {
      $("#valid-input").html("<p>Invalid Input(s)</p>");
    }
    else {
      $("#valid-input").empty();

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

    }

  });


  database.ref().on("child_added", function (snapshot) {

    // Print the initial data to the console.
    console.log(snapshot.val().userID);
    console.log(uid);

    if ((snapshot.val().userID == uid) && (snapshot.val().dataType == "log")) {
      $("#log-table > tbody").append(
        "<tr class='table-row' id=" + "'" + snapshot.key + "'" + ">" +
        "<td data-exercise=" + "'" + snapshot.val().exercise + "'" + ">" + snapshot.val().exercise +
        "</td><td data-duration=" + "'" + snapshot.val().duration + "'" + ">" + snapshot.val().duration +
        "</td><td data-sets=" + "'" + snapshot.val().sets + "'" + ">" + snapshot.val().sets +
        "</td><td>" + snapshot.val().bmi +
        "</td><td>" + snapshot.val().bmr +
        "</td><td data-date=" + "'" + snapshot.val().date + "'" + ">" + snapshot.val().date +
        "<td class='col-xs-1 right'>" +
        "<button type='submit' value='' class='remove-log btn waves-effect waves-light'><i class='material-icons'>delete_forever</i></button>" +
        "<button type='submit' value='' class='update-log btn waves-effect waves-light modal-trigger' href='#modal1'><i class='material-icons'>edit</i></button>" +
        // "<button data-target='modal1' class='btn modal-trigger'>Modal</button>"+
        "</td></tr>");
    }

  });


 
  $(function () {
    $("#date-input").datepicker();
    $("#date-input-update").datepicker();
  });

  $("body").on("click", ".remove-log", function () {
    $(this).closest('tr').remove();
    getKey = $(this).parent().parent().attr('id');
    database.ref().child(getKey).remove();
  });




  $(document).on("click", ".update-log", function () {
    // $(this).closest ('tr').remove();
    updateKey = $(this).parent().parent().attr('id');
    
    // console.log($(this).parent().parent().attr('id'));
    // console.log($(this).attr('data-excercise'));

    // $("#exercise-input-update").val($(this).parent().parent().attr('data-excercise'));
    // $("#duration-input-update").val($(this).parent().parent().attr('data-duration'));
    // $("#sets-input-update").val($(this).parent().parent().attr('data-sets'));
    // $("#date-input-update").val($(this).parent().parent().attr('data-date'));
    // database.ref().child(getKey).remove();
  });




  $(document).on("click", "#update-log-item", function () {

    // Don't refresh the page!
    event.preventDefault();

    if (($("#exercise-input-update").val() == "") || ($("#date-input-update").val() == "Select Date")) {
      $("#valid-input-update").html("<p>Invalid Input(s)</p>");
    }
    else {
      $("#valid-input-update").empty();

      database.ref().child(updateKey).update({
        "exercise": $("#exercise-input-update").val(),
        "duration": $("#duration-input-update").val(),
        "sets": $("#sets-input-update").val(),
        "bmi": bmi,
        "bmr": bmr,
        "date": $("#date-input-update").datepicker({ dateFormat: 'dd-mm-yy' }).val()
      });

      instanceModal.close();
      // $("#log-table > tbody")
      // $(updateKey).closest('tr').remove();       
    }    

  });

  

  database.ref().on("child_changed", function (snapshot) {

    // Print the initial data to the console.
    console.log(snapshot.val().userID);
    console.log(snapshot.key);
    $("table#log-table tr#"+updateKey).remove();

    if ((snapshot.val().userID == uid) && (snapshot.val().dataType == "log")) {
      $("#log-table > tbody").append(
        "<tr class='table-row' id=" + "'" + snapshot.key + "'" + ">" +
        "<td data-exercise=" + "'" + snapshot.val().exercise + "'" + ">" + snapshot.val().exercise +
        "</td><td data-duration=" + "'" + snapshot.val().duration + "'" + ">" + snapshot.val().duration +
        "</td><td data-sets=" + "'" + snapshot.val().sets + "'" + ">" + snapshot.val().sets +
        "</td><td>" + snapshot.val().bmi +
        "</td><td>" + snapshot.val().bmr +
        "</td><td data-date=" + "'" + snapshot.val().date + "'" + ">" + snapshot.val().date +
        "<td class='col-xs-1 right'>" +
        "<button type='submit' value='' class='remove-log btn waves-effect waves-light'><i class='material-icons'>delete_forever</i></button>" +
        "<button type='submit' value='' class='update-log btn waves-effect waves-light modal-trigger' href='#modal1'><i class='material-icons'>edit</i></button>" +
        // "<button data-target='modal1' class='btn modal-trigger'>Modal</button>"+
        "</td></tr>");
    }

  });


}, function (errorObject) {
  console.log("The read failed: " + errorObject.code);


});
