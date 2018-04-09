
// var app = angular.module('bmiApp', []);

// //Text display
// app.controller('headerText', function ($scope){
//   $scope.mainHeader="BMI & BMR Calculator";
// });
 
// //Main results display
// app.controller('mainCtrl', function ($scope){
//   $scope.stats = {
//     weightUS: 0,
//     heightUS: 0,
//     BMI: 0};
   
// // BMI computation
//   var calculateBMI = function(){
//     $scope.stats.BMI = ($scope.stats.weightUS * 703) / ($scope.stats.heightUS * $scope.stats.heightUS) ;
//   }
   
//   $scope.$watch('stats.weightUS', calculateBMI);
//   $scope.$watch('stats.heightUS', calculateBMI);

//   localStorage.setItem("bmi", $scope.stats.BMI);
//   console.log(localStorage.getItem("bmi"));

// });


$('select').formSelect();

function calcBMI(){
  var height = $("#heightUS").val();
  var weight = $("#weightUS").val();
  var bmi = (703*weight/(height*height));

  bmi = Math.round(bmi * 100) / 100;
  $("#result").text(bmi);
  // console.log(bmi);

  localStorage.setItem("bmi", bmi);
  console.log(localStorage.getItem("bmi"));
}

var bmr;
        
function calc() {
  var age = document.getElementById("age").value;

  var heightUS = document.getElementById("heightUS").value;
  var weightUS = document.getElementById("weightUS").value;
  var activity = $('#activity option:selected').val();
  var gender = $('input[name=gender]:checked').val();

  if (gender == "male") {
    bmr = 66.5 + ( 13.75 * weightUS ) + ( 5.003 * heightUS ) - ( 6.755 * age );
  }
  else {
    bmr = 655.1 + ( 9.563 * weightUS ) + ( 1.850 * heightUS ) - ( 4.676 * age );
  }
  switch (activity) {
    case "1":
     bmr *= 1.2;
        break;
    case "2":
     bmr *= 1.375
        break;
    case "3":
     bmr *= 1.53;
        break;
    case "4":
     bmr *= 1.725;
        break;
    case "5":
     bmr *= 1.9;
        break;
  }

  bmr = Math.round(bmr * 100) / 100;
  localStorage.setItem("bmr", bmr);
  console.log(localStorage.getItem("bmr"));
}

document.getElementsByTagName("button")[0].addEventListener("click", function() {
  calc();
  document.getElementById('caloriesneeded').innerHTML = bmr;
  calcBMI();
})


$("#click-result").on('click', function(){  
  
  var x = document.getElementById("bmi-image");
  console.log(x.style.display);
  if (x.style.display == "block") {
      x.style.display = "none";
  } else {
      x.style.display = "block";
  }

  // console.log("toggle");

});

