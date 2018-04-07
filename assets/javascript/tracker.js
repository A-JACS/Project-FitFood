$(document).ready(function () {
    var elemListDuration = document.querySelector('.duration');
    var instanceDuration = M.FormSelect.init(elemListDuration);

    var elemListSets = document.querySelector('.sets');
    var instanceSets = M.FormSelect.init(elemListSets);


    var elemDate = document.querySelector('.datepicker');
  var instanceDate = M.Datepicker.init(elemDate, autoClose);

    // $('select').formSelect();
    // $('#date').pickadate({
    //     selectMonths: true, 
    //     selectYears: 15 ,
    //     autoClose: true
    //   });

});