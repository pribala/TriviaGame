var questions = [{title: "question-1", choices: ["assets/images/Death-Valley.jpg", "assets/images/Yosemite.jpg", "assets/images/Acadia.jpg", "assets/images/Yellowstone.jpg"], 
altText: ["Death Valley National Park", "Yosemite National Park", "Acadia National Park", "Yellowstone National Park"], answer: "Yellowstone National Park", position: 3}];

$(document).ready(function() {
	
	questions.forEach(function(obj) {
		var newDiv = $("<div>");
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
		console.log($(this).text());
		if($(".trivia").data("answer") === $(this).text()){
			console.log("You got it!");
			$("#question").html('<h3>You got it!</h3></br><img src="'+$(".trivia").data("image")+'">');
		}else {
			$("#question").html('<h3>Sorry! The correct answer is ' + $(".trivia").data("answer")+'</h3>'+'</br><img src="'+$(".trivia").data("image")+'">');
		}
	});
	
});	