var searchString = "avengers";

function tplawesome(e, t) { res = e; for (var n = 0; n < t.length; n++) { res = res.replace(/\{\{(.*?)\}\}/g, function (e, r) { return t[n][r] }) } return res }

$(function () {
    $("#light").on("click", function (e) {
        searchString = "light workout";
        e.preventDefault();
        // prepare the request
        var request = gapi.client.youtube.search.list({
            part: "snippet",
            type: "video",
            // q: encodeURIComponent($("#search").val()).replace(/%20/g, "+"),
            q: encodeURIComponent(searchString).replace(/%20/g, "+"),
            maxResults: 6,
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
                        "videoid": item.id.videoId }]));
                });
            });
            resetVideoHeight();
        });
    });


    $(window).on("resize", resetVideoHeight);
});


$(function () {
    $("#moderate").on("click", function (e) {
        searchString = "moderate workout";
        e.preventDefault();
        // prepare the request
        var request = gapi.client.youtube.search.list({
            part: "snippet",
            type: "video",
            // q: encodeURIComponent($("#search").val()).replace(/%20/g, "+"),
            q: encodeURIComponent(searchString).replace(/%20/g, "+"),
            maxResults: 6,
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
                        "videoid": item.id.videoId }]));
                });
            });
            resetVideoHeight();
        });
    });


    $(window).on("resize", resetVideoHeight);
});


$(function () {
    $("#high-intensity").on("click", function (e) {
        searchString = "high intensity workout";
        e.preventDefault();
        // prepare the request
        var request = gapi.client.youtube.search.list({
            part: "snippet",
            type: "video",
            // q: encodeURIComponent($("#search").val()).replace(/%20/g, "+"),
            q: encodeURIComponent(searchString).replace(/%20/g, "+"),
            maxResults: 6,
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
                         "videoid": item.id.videoId }]));
                });
            });
            resetVideoHeight();
        });
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
