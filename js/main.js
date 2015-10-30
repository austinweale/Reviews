
Parse.initialize("JBRs0gj6XUAiNnVz44x7QK8GIURYwIDVU00yRYIG", "6Z8kHIuoh1KVyIt09DG8xFm4hkDPPhk8Bykl6PTm");
var Review = Parse.Object.extend('Review');


var itemCount; 
var totalStars; //these are for getting the average star rating


//setting up the submission, star rating, and populating the data
window.onload = function(){
	$("#form").submit(submit);

	$("#rating").raty({path: "raty/lib/images/"});
    
    getData();

};

//submits a review to the database
function submit(){
    var title = $("#title").val();
    var review = $("#new-review").val();
    var score = $("#rating").raty('score');
    if(score == null){
        alert("please  input a star rating");
    }else if(title == ""){
        alert("please enter a title for your review");
    }else if(review == ""){
        alert("please enter a review");
    }else{
        var currentReview = new Review;
        currentReview.set("review", review);

        currentReview.set("title", title);

        currentReview.set("stars", score);

        currentReview.set("votes", 0);

        currentReview.save();
    }

}

//loads the review list
function getData(){
    itemCount = 0;
    totalStars = 0;
    
    var query = new Parse.Query(Review);
    query.notEqualTo("title", "");

    query.find({
        success:function(results){
            buildList(results);
        }
    })
}

//builds the review area
var buildList = function(data) {
    $('#review-area').html("");
    
    for(var i = 0; i < data.length; i++){
        addItem(data[i], i);
    }
    var average = createStarRating(Math.round(totalStars / itemCount));
    $("#average").append(average);
}

//appends a review to the page
var addItem = function(item, num) {
    
    var title = item.get("title");
    var stars = item.get("stars");
    var review = item.get("review");
    var votes = item.get("votes");
    var objectID = item.id;

    itemCount++;
    totalStars += stars;
    
    var div = document.createElement("div");
    $(div).addClass("col-xs-12");

    var rating = createStarRating(stars);
    var h2 = document.createElement("h3");
    $(h2).append(rating);
    $(h2).append(title);

    var p = document.createElement("p");
    $(p).html(review);


    $(div).addClass("line");
    $(div).append(createUpvote(votes, objectID, num));
    $(div).append(h2);
    $(div).append(p);
    
    $("#review-area").append(div);
}

//creates a star rating based on the passed-in star amount
function createStarRating(stars){
    var rating = document.createElement("span");
    $(rating).addClass("star");
    for (var i = 1; i <= 5; i++){
        var currentStar = document.createElement("span");
        if(i <= stars){
            $(currentStar).html("★");
        }else{
            $(currentStar).html("☆");
        }
        $(rating).append(currentStar);
    }

    return rating;

}

//creates the upvote/downvote buttons and returns it in a div
function createUpvote(currentCount, objectID, num){
    var div = document.createElement("div");
    $(div).addClass("upvote");
    

    //holds the upvote number
    var count = document.createElement("span");
    $(count).addClass("count");
    $(count).html(currentCount);
    count.id = num + "";

    //makes upvote arrow
    var up = document.createElement("a");
    $(up).addClass("upvote");
    up.onclick = function(){
        $(this).addClass("upvote-on")
        incrementVote(1, objectID, num);
    };
    
    //downvote arrow
    var down = document.createElement("a");
    $(down).addClass("downvote");
    down.onclick = function(){
        $(this).addClass("downvote-on")
        incrementVote(-1, objectID, num);
    };

    $(div).append(up);
    $(div).append(count);
    $(div).append(down);
    return div;
}

//increments the upvote count depending on the user's selection
function incrementVote(vote, objectID, num){
    var query = new Parse.Query(Review);

    query.notEqualTo("title", "");

    query.find({
        success:function(results){
            current = results[num];
            var change = current.get("votes") + vote;
            current.set("votes", change);
            $("#" + num).html(change);
            current.save();
        }
    })
}





