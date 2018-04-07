$(document).ready(function() {

// will take BMR input from local storage -- hard-coded meanwhile
var targetCalories = 2000;

$("#bmr").html("<b>" + targetCalories + "</b>");

var queryURL = "https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/mealplans/generate?targetCalories=" + targetCalories + "&timeFrame=day";

$.ajax({
    url: queryURL,
    method: 'GET',
    headers: {
        "X-Mashape-Key": "y1tll6WFTbmsh9kWYRNfHHKIIEjep1GFBA7jsnZvXrjPgY7Mqg",
        "X-Mashape-Host": "spoonacular-recipe-food-nutrition-v1.p.mashape.com",
        "Accept": "application/json"
    }
  }).then(function(response) {
    console.log(response);

    console.log(response.meals[1]);

    var meals = response.meals;
    console.log(meals);

    // loop through array to display each recipe's traits
    for (let i = 0; i < meals.length; i++) {
        console.log(meals[i].title);

        // determines which html card is selected
        let cardID = "recipe" + i;

        // displays recipe title from api
        $("#" + cardID + " .card-title").text(meals[i].title);

        // displays recipe image from api
        var recipeID = meals[i].id;
        $("#" + cardID + " .card-image > img").attr("src", "https://spoonacular.com/recipeImages/" + recipeID + "-312x231.jpg");

        // creates and displays url link to recipe
        var recipeString = meals[i].image.split(".", 1);
        var recipeURL = "https://spoonacular.com/recipes/" + recipeString;
        $("#" + cardID + " .card-action > a").attr("href", recipeURL).text("Get the recipe").attr("target", "_blank");

        // new ajax call for current recipe to grab and display summary
        var summaryURL = "https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/" + recipeID + "/summary";

        $.ajax({
            url: summaryURL,
            method: 'GET',
            headers: {
                "X-Mashape-Key": "y1tll6WFTbmsh9kWYRNfHHKIIEjep1GFBA7jsnZvXrjPgY7Mqg",
                "X-Mashape-Host": "spoonacular-recipe-food-nutrition-v1.p.mashape.com",
                "Accept": "application/json"
            }
          }).then(function(response2) {
            console.log(response2);
            var summary = response2.summary.split(".", 5) + ".";
            $("#" + cardID + " .card-content").html(summary);
          });
    };
  });

});