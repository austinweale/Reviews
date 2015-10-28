
Parse.initialize("JBRs0gj6XUAiNnVz44x7QK8GIURYwIDVU00yRYIG", "6Z8kHIuoh1KVyIt09DG8xFm4hkDPPhk8Bykl6PTm");
var Review = Parse.Object.extend('Review');


var starRating = -1;


window.onload = function(){
	$("#review-form").submit(submit);

	var stars = document.querySelectorAll(".rating span");

	for(var i = 0; i < stars.length; i++){
		stars[i].onclick = changeRating;
	}

};

function changeRating(){
	starRating = parseInt(this.id);
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

