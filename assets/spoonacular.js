var targetCalories = 2000;

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

    // loop through array to display each recipe's traits
    for (var i = 0; i < meals.length; i++) {
        console.log(meals[i].title);

        var recipeDiv = $("<div>");

        // store values
        var title = $("<h3>").text(meals[i].title);
        var recipeID = meals[i].id;
        var image = $("<img>").attr("src", "https://spoonacular.com/recipeImages/" + recipeID + "-312x231.jpg");
        console.log(title);

        recipeDiv.append(title, image);
    
        $("#display").append(recipeDiv);
    };
  });




// $("#display").append