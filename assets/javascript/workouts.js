

var bmi = localStorage.getItem("bmi");
console.log(bmi);

var weightStatus = "";
if (bmi < 18.5) { weightStatus = "under"; }
else if ((bmi >= 18.5) && (bmi < 25)) { weightStatus = "normal"; }
else if ((bmi >= 25) && (bmi < 30)) { weightStatus = "over"; }
else if (bmi >= 30) { weightStatus = "obese"; };

console.log(weightStatus);

var exerciseList = {
    "under": ["Push ups", "Triceps Dip", "Ab Circuits", "Squat Jump", "Burpee", "Walking Lunges"],
    "normal": ["Mountain Climbers", "Squat Jumps", "Bicycle Crunches", "Oblique Crunches", "Battle Rope", "Sled Training"],
    "over": ["Walking briskly", "Jogging lightly", "Elliptical machine", "Water aerobics", "Swimming"],
    "obese": ["StairMaster", "Cycling", "Rowing", "Kayaking", "Tai Chi", "Water aerobics"]
};

if (weightStatus == "under") { var searchStrings = exerciseList.under }
else if (weightStatus == "normal") { var searchStrings = exerciseList.normal }
else if (weightStatus == "over") { var searchStrings = exerciseList.over }
else if (weightStatus == "obese") { var searchStrings = exerciseList.obese }
console.log(searchStrings);

// var searchString = "avengers";

function tplawesome(e, t) { res = e; for (var n = 0; n < t.length; n++) { res = res.replace(/\{\{(.*?)\}\}/g, function (e, r) { return t[n][r] }) } return res }

$(function () {
    $("#light").on("click", function (e) {
        e.preventDefault();
        console.log(bmi);
        console.log(weightStatus);
        for (var i = 0; i < searchStrings.length; i++) {

            console.log(i);
            // e.preventDefault();
            // prepare the request
            var request = gapi.client.youtube.search.list({
                part: "snippet",
                type: "video",
                // q: encodeURIComponent($("#search").val()).replace(/%20/g, "+"),
                q: encodeURIComponent(searchStrings[i] + " exercise").replace(/%20/g, "+"),
                maxResults: 2,
                order: "viewCount",
                publishedAfter: "2012-01-01T00:00:00Z"
            });
            // execute the request
            request.execute(function (response) {
                var results = response.result;
                $("#results").html("");
                $.each(results.items, function (index, item) {
                    $.get("./assets/tpl/item.html", function (data) {
                        $("#results").append(tplawesome(data, [{
                            // "title": item.snippet.title, 
                            "title": "",
                            "videoid": item.id.videoId
                        }]));
                    });
                });
                resetVideoHeight();
            });
        }
    });


    $(window).on("resize", resetVideoHeight);
});




function resetVideoHeight() {
    $(".video").css("height", $("#results").width() * 9 / 16);
}

function init() {
    gapi.client.setApiKey("AIzaSyCKIX9DB6nscIe9JZqm2f-_4pKRh0o7P6o");
    gapi.client.load("youtube", "v3", function () {
        // yt api is ready
    });
}


