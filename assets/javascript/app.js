	var movies = ["Harry Potter", "Star Wars", "American Psycho", "The Shining", "Grease"];

	function createButtons() {
	  $("#movie-buttons").empty();
	  for (i = 0; i < movies.length; i++) {
	    $("#movie-buttons").append("<button class='btn btn-success' data-movie='" + movies[i] + "'>" + movies[i] + "</button>");
	  }
	}

	createButtons();
	$("#add-movie").on("click", function () {
	  event.preventDefault();
	  var movie = $("#movie-input").val().trim();
	  movies.push(movie);
	  createButtons();
	  return;
	});

	$("#movie-buttons").on("click", "button", function () {
	  var movie = $(this).attr("data-movie");
	  var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
	    movie + "&api_key=fY2pMUNzMNJQIdF1fpl0DWLZTERVk3tj&limit=10"
	  console.log($(this).attr("data-movie"));

	  $.ajax({
	    url: queryURL,
	    method: "GET"
	  }).done(function (response) {
	    var results = response.data;
	    $("#movies").empty();
	    for (var i = 0; i < results.length; i++) {
	      var movieDiv = $("<div>");
	      var p = $("<p>").text("Rating: " + results[i].rating);
	      var movieImg = $("<img>");

	      movieImg.attr("src", results[i].images.original_still.url);
	      movieImg.attr("data-still", results[i].images.original_still.url);
	      movieImg.attr("data-animate", results[i].images.original.url);
	      movieImg.attr("data-state", "still");
	      movieImg.attr("class", "gif");
	      movieDiv.append(p);
	      movieDiv.append(movieImg);
	      $("#movies").append(movieDiv);
	    }
	  });
	});

	function changeState() {
	  var state = $(this).attr("data-state");
	  var playImage = $(this).attr("data-animate");
	  var pauseImage = $(this).attr("data-still");

	  if (state == "still") {
	    $(this).attr("src", playImage);
	    $(this).attr("data-state", "animate");
	  } else if (state == "animate") {
	    $(this).attr("src", pauseImage);
	    $(this).attr("data-state", "still");
	  }
	}

	$(document).on("click", ".gif", changeState);

