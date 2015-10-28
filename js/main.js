
Parse.initialize("JBRs0gj6XUAiNnVz44x7QK8GIURYwIDVU00yRYIG", "6Z8kHIuoh1KVyIt09DG8xFm4hkDPPhk8Bykl6PTm");
var Review = Parse.Object.extend('Review');


var starRating = -1;


window.onload = function(){
	$("#review-form").submit(submit);

	var stars = document.querySelectorAll(".rating span");

	for(var i = 0; i < stars.length; i++){
		stars[i].onclick = changeRating;
	}
    getData();

};

function changeRating(){
	starRating = parseInt(this.id);
    var stars = document.querySelectorAll(".rating span");
    for(var i = 1; i <= stars.length; i++){
        if(i <= starRating){
            $(stars[i]).addClass("rated");
        }
    }

}

function submit(){
    var title = $("#title").val();
    var review = $("#new-review").val();


    var currentReview = new Review;
    currentReview.set("review", review);

    currentReview.set("title", title);

    currentReview.set("stars", starRating);

    currentReview.save();
}

function getData(){
    // Set up a new query for our Music class
    var query = new Parse.Query(Review);


    // Set a parameter for your query -- where the website property isn't missing
    query.notEqualTo("title", "");


    /* Execute the query using ".find".  When successful:
        - Pass the returned data into your buildList function
    */
    query.find({
        success:function(results){
            buildList(results);
        }
    })
}

var buildList = function(data) {
    // Empty out your unordered list
    $('#review-area').empty();
    
    // Loop through your data, and pass each element to the addItem function
    for(var i = 0; i < data.length; i++){
        addItem(data[i]);
    }
}

var addItem = function(item) {
    // Get parameters (website, band, song) from the data item passed to the function
    var title = item.get("title");
    var stars = item.get("stars");
    var review = item.get("review");

    // Append li that includes text from the data item
    var div = document.createElement("div");

    var h2 = document.createElement("h3");
    $(h2).html(title);



    var rating = document.createElement("div");
    for (var i = 1; i <= 5; i++){
        var currentStar = document.createElement("span");
        if(i <= stars){
            $(currentStar).html("★");
        }else{
            $(currentStar).html("☆");
        }
        $(rating).append(currentStar);

    }

    $(div).html(title + " " + stars + " " + review);

    $("#review-area").append(h2);
    $("#review-area").append(rating);
    $("#review-area").append(div);

}

