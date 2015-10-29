
Parse.initialize("JBRs0gj6XUAiNnVz44x7QK8GIURYwIDVU00yRYIG", "6Z8kHIuoh1KVyIt09DG8xFm4hkDPPhk8Bykl6PTm");
var Review = Parse.Object.extend('Review');


var itemCount;
var totalStars;


window.onload = function(){
	$("#form").submit(submit);

	$("#rating").raty({path: "raty/lib/images/"});
    $("#rating").onclick = changeRating;
    getData();

};

function changeRating(){
	var score = $("rating").raty('score');
    alert(score);

}

function submit(){

    var title = $("#title").val();
    var review = $("#new-review").val();


    var currentReview = new Review;
    currentReview.set("review", review);

    currentReview.set("title", title);

    currentReview.set("stars", $("#rating").raty('score'));

    currentReview.set("votes", 0);

    currentReview.save();

    //getData();
}

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

var buildList = function(data) {
    $('#review-area').html("");
    
    for(var i = 0; i < data.length; i++){
        addItem(data[i], i);
    }
    var average = createStarRating(Math.round(totalStars / itemCount));
    $("#average").append(average);
}

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
    $(div).append(h2);
    $(div).append(p);
    $(div).append(createUpvote(votes, objectID, num));
    $("#review-area").append(div);
}

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

function createUpvote(currentCount, objectID, num){
    var div = document.createElement("div");
    $(div).addClass("upvote");
    


    var count = document.createElement("span");
    $(count).addClass("count");
    $(count).html(currentCount);
    count.id = num + "";

    var up = document.createElement("a");
    $(up).addClass("upvote");
    up.onclick = function(){
        $(this).addClass("upvote-on")
        incrementVote(1, objectID, num);
    };
    

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





