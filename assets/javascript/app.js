// model variable with an array of question objects
var model = {
	questions: [{	question: "Which was the first National Park in America?", 
	 			  	choices: ["assets/images/Death-Valley.jpg", "assets/images/Yosemite.jpg", "assets/images/Acadia.jpg", "assets/images/Yellowstone.jpg"], 
					altText: ["Death Valley National Park", "Yosemite National Park", "Acadia National Park", "Yellowstone National Park"], 
					answer: "Yellowstone National Park", 
					position: 3,
				},
				{
					question: "What national park is home to the world's largest tree by volume?", 
	 			  	choices: ["assets/images/redwood.jpg", "assets/images/Sequoia.jpg", "assets/images/Everglades.jpg", "assets/images/Joshua-Tree.jpg"], 
					altText: ["Redwood National Park", "Sequoia National Park", "Everglades National Park", "Joshua Tree National Park"], 
					answer: "Sequoia National Park", 
					position: 1,
				},
				{	question: "What national park is home to the longest cave system in the world?", 
	 			  	choices: ["assets/images/Mammoth-Cave.jpg", "assets/images/Canyonlands.jpg", "assets/images/Carlsbad-Caverns.jpg", "assets/images/Great-Basin.jpg"], 
					altText: ["Mammoth Cave National Park", "Canyonlands National Park", "Carlsbad Caverns National Park", "Great Basin National Park"], 
					answer: "Mammoth Cave National Park", 
					position: 0,
				},
				{	question: "What state contains the most national parks?", 
	 		 	  	choices: ["assets/images/Colorado.jpg", "assets/images/Utah.jpg", "assets/images/Alaska.jpg", "assets/images/California.jpg"], 
				 	altText: ["Colorado", "Utah", "Alaska", "California"], 
				 	answer: "California", 
				 	position: 3,
				 },
				 {	question: "Through how many states does the Appalachian National Scenic Trail pass?", 
	 		 	  	choices: ["assets/images/number-10.jpg", "assets/images/number-14.jpg", "assets/images/number-9.jpg", "assets/images/number-twelve.jpg"], 
				 	altText: ["10", "14", "9", "12"], 
				 	answer: "14", 
				 	position: 1,
				 },
				 {
				 	question: "What is the most visited national park?",
				 	choices: ["assets/images/Yosemite-1.jpg", "assets/images/grand-canyon.jpg", "assets/images/Great-Smoky-Mountains.jpg", "assets/images/Rocky-Mountain.jpg"], 
				 	altText: ["Yosemite National Park", "Grand Canyon National Park", "Smoky Mountains National Park", "Rocky Mountain National Park"], 
				 	answer: "Smoky Mountains National Park", 
				 	position: 2,
				 },
				 {
				 	question: "Which of the following is not one of Utah's 'Mighty 5' National Parks?",
				 	choices: ["assets/images/arches.jpg", "assets/images/capitol-reef.jpg", "assets/images/bryce-canyon.jpg", "assets/images/badlands.jpg"], 
				 	altText: ["Arches National Park", "Capitol Reef National Park", "Bryce Canyon National Park", "Badlands National Park"], 
				 	answer: "Badlands National Park", 
				 	position: 3,
				 },
				 {	question: "This man is considered 'The Father of the National Parks.'",
				 	choices: ["assets/images/John-Muir.jpg", "assets/images/Teddy-Roosevelt.jpg", "assets/images/Joseph-LeConte.jpg", "assets/images/Ralph-Waldo-Emerson.jpg"], 
				 	altText: ["John Muir", "Teddy Roosevelt", "Joseph LeConte", "Ralph Waldo Emerson"], 
				 	answer: "John Muir", 
				 	position: 0,
				 },
				 {	question: "Who was the only U.S. President to work as a park ranger?",
				 	choices: ["assets/images/Jimmy-Carter.jpg", "assets/images/Teddy-Roosevelt-1.jpg", "assets/images/Gerald-Ford.jpg", "assets/images/harry-truman.jpg"], 
				 	altText: ["Gerald Ford", "Teddy Roosevelt", "Jimmy Carter", "Harry S. Truman"], 
				 	answer: "Gerald Ford", 
				 	position: 2,
				 },
				 {	question: "What National Park contains the highest peak in North America?",
				 	choices: ["assets/images/mount-rainier.jpg", "assets/images/Grand-Teton.jpg", "assets/images/Denali.jpg", "assets/images/hawaii-volcanoes.jpg"], 
				 	altText: ["Mount Rainier National Park", "Grand Teton National Park", "Denali National Park", "Hawaii Volcanoes National Park"], 
				 	answer: "Denali National Park", 
				 	position: 2,
				 }
				],
				time: 30,
				intervalId: 0,
				objIndex: 0,
				wins: 0,
				losses: 0,
				
				reset: function() {
					model.time = 30;
	    			model.intervalId = 0;
	    			// Change the "display" div to "30 seconds.
	    			$("#display").html("30 seconds");
  				},
  				
  				start: function() {
      				// Use setInterval to start the count here and set the clock to running.
      				intervalId = setInterval(model.count, 1000);
      		    },
       		   
				count: function() {
    				//decrement time by 1.
    				if(model.time >= 0) {
    					var result = model.time-- +" seconds";
    					// show the time in the "display" div.
    					$("#display").html(result);
					}else {
					 	model.stop();
					 	model.reset();
					 	$("#display").html("0 seconds");
					 	$("#question").html('<h3>The correct answer is ' + $(".trivia").data("answer")+'</h3>'+'</br><img src="'+$(".trivia").data("image")+'">');
						model.next();
					 }
				},
				
				stop: function() {
				    // Use clearInterval to stop the count here and set the clock to not be running.
				    clearInterval(intervalId);
 				},
 				
 				first: function() {
 					this.objIndex = 0;
 					return this.questions[0];
 				},

 				next: function() {
 					if(this.objIndex < model.questions.length -1){
 						this.objIndex++;
	 					setTimeout(gameView, 5000, this.questions[this.objIndex]);
 				 	}else {
 				 		setTimeout(showResult, 5000);
 				 	}	
 				},
	}

// Display the number of correct and wrong answers.
function showResult() {
	$("#display").html("0 seconds");
	$("#question").html("<h3>You have " + model.wins + " correct answers and "+ model.losses+" wrong answers.</h3>"); 
 	$("#question").append("<button id='restart' class='btn-success'>Restart Game</button>");
}

// Render the questions, answer choices and iterate through the choices
function gameView(obj) {
	model.start();
	var newDiv = $("<div>");
	newDiv.append("<p>"+obj.question+"</p>");
	newDiv.addClass("row trivia");
	newDiv.data("answer", obj.answer);
	newDiv.data("image", obj.choices[obj.position]);
	
	for(var i=0; i<obj.choices.length;i++) {
		var newCol = $("<div>");
		newCol.addClass("col col-md-3 col-xs-6");

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
	// Restart game 
	$("body").on("click", "#restart",function(){
		model.wins = 0;
	 	model.losses = 0;
	 	var obj = model.first();
		gameView(obj);	
	});
	// Button click event to capture user selection and display content based on correct and wrong answer
	$("body").on("click", ".btn", function() {
	 	model.stop();
	 	model.reset();

	  	if($(".trivia").data("answer") === $(this).text()){
	  		$("#display").html("0 seconds");
	 		$("#question").html('<h3>You got it! '+$(".trivia").data("answer")+' is correct.</h3></br><img src="'+$(".trivia").data("image")+'">');
	 		model.wins++;
	 		model.next();
	 	}else {
	 		$("#display").html("0 seconds");
	 		$("#question").html('<h3>Sorry! The correct answer is ' + $(".trivia").data("answer")+'</h3>'+'</br><img src="'+$(".trivia").data("image")+'">');
	 		model.losses++;
	 		model.next();
	 	}
	});
});	

