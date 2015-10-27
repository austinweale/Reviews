
Parse.initialize("JBRs0gj6XUAiNnVz44x7QK8GIURYwIDVU00yRYIG", "6Z8kHIuoh1KVyIt09DG8xFm4hkDPPhk8Bykl6PTm");
var Review = Parse.Object.extend('Review');


window.onload = function(){
	$("#review-form").submit(submit);
};

function submit(){
    var title = $("#title").val();
    var review = $("#new-review").val();

    var current = new Review;
    
    current.set("review", review);
    current.save();
}