
var app = angular.module('bmiApp', []);
 
//Text display
app.controller('headerText', function ($scope){
  $scope.mainHeader="BMI Calculator";
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

function toggle_visibility(id) {
   var e = document.getElementById(id);
   if(e.style.display == 'block')
      e.style.display = 'none';
   else
      e.style.display = 'block';
}