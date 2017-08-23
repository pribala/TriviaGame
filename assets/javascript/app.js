var questions = [{question: "Which was the first National Park in America?", choices: ["assets/images/Death-Valley.jpg", "assets/images/Yosemite.jpg", "assets/images/Acadia.jpg", "assets/images/Yellowstone.jpg"], 
altText: ["Death Valley National Park", "Yosemite National Park", "Acadia National Park", "Yellowstone National Park"], answer: "Yellowstone National Park", position: 3}];

var intervalId;
//prevents the clock from being sped up unnecessarily
var clockRunning = false;

// Variable for indicating game success
var success = false;

//  Our stopwatch object.
var stopwatch = {

	time: 30,
  
	reset: function() {
	    stopwatch.time = 0;
	    // Change the "display" div to "00 seconds."
	    $("#display").html("00 Seconds");
  	},

	start: function() {
      // Use setInterval to start the count here and set the clock to running.
      if (!clockRunning) {
        clockRunning = true;
        intervalId = setInterval(stopwatch.count, 1000);
      }  
    },
	
	count: function() {
    	//decrement time by 1.
    	if(stopwatch.time >= 0) {
    		var result = stopwatch.time-- +" Seconds";
    		// show the time in the "display" div.
    		$("#display").html(result);
		}else {
			stopwatch.stop();
			$("#question").html('<h3>The correct answer is ' + $(".trivia").data("answer")+'</h3>'+'</br><img src="'+$(".trivia").data("image")+'">');
		}
	},

	stop: function() {
	    // Use clearInterval to stop the count here and set the clock to not be running.
	    clockRunning = false;
	    clearInterval(intervalId);
 	},
  }


$(document).ready(function() {
	
	questions.forEach(function(obj) {
		stopwatch.start();
		// if(stopwatch.time<=0) {
		// 	$("#question").html('<h3>The correct answer is ' + $(".trivia").data("answer")+'</h3>'+'</br><img src="'+$(".trivia").data("image")+'">');
		// }

		$("#display").html(intervalId);
		var newDiv = $("<div>");
		newDiv.append("<p>"+obj.question+"</p>");
		newDiv.addClass("row trivia");
		newDiv.data("answer", obj.answer);
		newDiv.data("image", obj.choices[obj.position]);
		for(var i=0; i<obj.choices.length;i++) {
			var newCol = $("<div>");
			newCol.addClass("col col-md-2 text-center");

			var newImg = $("<img>");
			newImg.attr({"src": obj.choices[i], "alt": obj.altText[i]});
			newImg.addClass("img-responsive");
			newCol.append(newImg);
						
			var newBtn = $("<button>");
			newBtn.addClass("btn btn-success")
			newBtn.text(obj.altText[i]); 
			newCol.append(newBtn);
			newDiv.append(newCol);
		}
		
		$("#question").append(newDiv);	
	});

	$("button").click(function() {
		stopwatch.stop();
		if($(".trivia").data("answer") === $(this).text()){
			$("#question").html('<h3>You got it!</h3></br><img src="'+$(".trivia").data("image")+'">');
		}else {
			$("#question").html('<h3>Sorry! The correct answer is ' + $(".trivia").data("answer")+'</h3>'+'</br><img src="'+$(".trivia").data("image")+'">');
		}
	});


	
});	

// Options
//Refractor the object looping in a function and call it for on load and after sucess or failure of game. 