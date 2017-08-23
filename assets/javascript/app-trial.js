var model = {
	questions: [{	question: "Which was the first National Park in America?", 
	 			  	choices: ["assets/images/Death-Valley.jpg", "assets/images/Yosemite.jpg", "assets/images/Acadia.jpg", "assets/images/Yellowstone.jpg"], 
					altText: ["Death Valley National Park", "Yosemite National Park", "Acadia National Park", "Yellowstone National Park"], 
					answer: "Yellowstone National Park", 
					position: 3,
				//	time: 30 
				},
				{
					question: "What national park is home to the world's largest tree by volume?", 
	 			  	choices: ["assets/images/redwood.jpg", "assets/images/Sequoia.jpg", "assets/images/Everglades.jpg", "assets/images/Joshua-Tree.jpg"], 
					altText: ["Redwood National Park", "Sequoia National Park", "Everglades National Park", "Joshua Tree National Park"], 
					answer: "Sequoia National Park", 
					position: 1,
				}
				],
				time: 30,
				intervalId: 0,
				objIndex: 0,
				
				reset: function() {
	    			model.time = 30;
	    			intervalId = 0;
	    			// Change the "display" div to "00 seconds.
	    			$("#display").html("30 Seconds");
  				},
  				
  				start: function() {
      				// Use setInterval to start the count here and set the clock to running.
      				intervalId = setInterval(model.count, 1000);
      		    },
       		   
				count: function() {
    				//decrement time by 1.
    				if(model.time >= 0) {
    					var result = model.time-- +" Seconds";
    					// show the time in the "display" div.
    					$("#display").html(result);
					}else {
					 	model.stop();
					 	$("#question").html('<h3>The correct answer is ' + $(".trivia").data("answer")+'</h3>'+'</br><img src="'+$(".trivia").data("image")+'">');
					 }
				},
				
				stop: function() {
				    // Use clearInterval to stop the count here and set the clock to not be running.
				    clearInterval(intervalId);
 				},
 				
 				first: function() {
 					return this.questions[0];
 				},

 				next: function() {
 					console.log("inside next");
 					if(this.objIndex < model.questions.length){
 						console.log(this.objIndex);
	 					this.objIndex++;
	 					//return this.questions[this.objIndex];
	 					setTimeout(gameView, 5000, this.questions[this.objIndex]);
 				 	}	
 				},
	}


//prevents the clock from being sped up unnecessarily
var clockRunning = false;

// Variable for indicating game success
var success = false;

function gameView(obj) {
	model.start();
	if(model.time===0)  {
		$("#question").html('<h3>The correct answer is ' + $(".trivia").data("answer")+'</h3>'+'</br><img src="'+$(".trivia").data("image")+'">');
		//model.stop();
	 	//model.reset();
		model.next();
	}

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
	$("#question").html(newDiv);	
}

$(document).ready(function() {
	
	var obj = model.first();
	gameView(obj);	

		
	 $("body").on("click", ".btn", function() {
	 	model.stop();
	 	model.reset();
	  	if($(".trivia").data("answer") === $(this).text()){
	 		$("#question").html('<h3>You got it!</h3></br><img src="'+$(".trivia").data("image")+'">');
	 		//sucess = true;
	 		model.next();
	 	}else {
	 		$("#question").html('<h3>Sorry! The correct answer is ' + $(".trivia").data("answer")+'</h3>'+'</br><img src="'+$(".trivia").data("image")+'">');
	 		//sucess = true;
	 		model.next();
	 	}
	});
});	

// Options
//Refractor the object looping in a function and call it for on load and after sucess or failure of game. 