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
    console.log(meals);

    // loop through array to display each recipe's traits
    for (var i = 0; i < meals.length; i++) {
        console.log(meals[i].title);

        var recipeDiv = $("<div>");

        // store values
        var title = $("<h3>").text(meals[i].title);
        var recipeID = meals[i].id;
        var image = $("<img>").attr("src", "https://spoonacular.com/recipeImages/" + recipeID + "-312x231.jpg");
        console.log(title);

        // trim image url to grab string  and ID for recipe url
        var recipeString = meals[i].image.split(".", 1);
        // alt method: .slice(0, meals[i].image.indexOf("."));

        // console.log(recipeString);

        // grab recipe url on spoonacular site
        var recipeURL = "https://spoonacular.com/recipes/" + recipeString;

        // console.log(recipeURL);

        recipeDiv.append(title, image, recipeURL);
    
        $("#display").append(recipeDiv);
    };
  });




// $("#display").append