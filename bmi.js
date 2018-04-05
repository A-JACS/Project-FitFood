
var app = angular.module('bmiApp', []);
 
//Text display
app.controller('headerText', function ($scope){
  $scope.mainHeader="BMI & BMR Calculator";
});
 
//Main results display
app.controller('mainCtrl', function ($scope){
  $scope.stats = {
    weightUS: 0,
    heightUS: 0,
    BMI: 0};
   
// BMI computation
  var calculateBMI = function(){
    $scope.stats.BMI = ($scope.stats.weightUS * 703) / ($scope.stats.heightUS * $scope.stats.heightUS) ;
  }
   
  $scope.$watch('stats.weightUS', calculateBMI);
  $scope.$watch('stats.heightUS', calculateBMI);

});

var bmr;
        
function calc() {
  var age = document.getElementById("age").value;
  var gender = document.getElementById("gender").value;
  var heightUS = document.getElementById("heightUS").value;
  var weightUS = document.getElementById("weightUS").value;
  if (gender == "masc") {
  bmr = 66.5 + ( 13.75 * weightUS ) + ( 5.003 * heightUS ) - ( 6.755 * age );
  }
  else {
  bmr = 655.1 + ( 9.563 * weightUS ) + ( 1.850 * heightUS ) - ( 4.676 * age );
  }
}

document.getElementsByTagName("button")[0].addEventListener("click", function() {
  calc();
  document.getElementById('lblResult').innerHTML = bmr;
})



document.getElementsByTagName("button")[0].addEventListener("click", function() {
  calc();
  document.getElementById('lblResult').innerHTML = bmr;

})















function toggle_visibility(id) {
   var e = document.getElementById(id);
   if(e.style.display == 'block')
      e.style.display = 'none';
   else
      e.style.display = 'block';
}