var gameOver = false;
var progressValue = 0;

function Initialize(particle, type){
	gameOver = false;
	values = ""
	if (type == "N"){
		values = "1234567890";
	}else if (type == "A"){
		values = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
	}else{
		values = "ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890";
	}

	removeParticles();

	for (i = 1; i <= particle; i++){
		createParticle(values.charAt(Math.floor(Math.random() * values.length), 1));
	}
}

function createParticle(value){
	$('body').append("<div class='particle'>" + value + "</div>");
}

function keyPress(keyCode){
	var numPadToKeyPadDelta = 48;

	// if a numeric key on the num pad was pressed.
	if (keyCode >= 96 && keyCode <= 105)
		keyCode = keyCode - numPadToKeyPadDelta;

	var keyPressed = String.fromCharCode(keyCode);
	$('.particle').each(function() {
		if (keyPressed == $(this).text()){
			playSound();
			$(this).remove();
			return false;
		}
	});

	if (($('.particle').length == 0) && (! gameOver)){
		gameOver = true;
		playApplause();
		$('body').append("<div class='won'>You Did It!!!</div>");
		$('.won').animate({"width": "80%"}, { queue: false, duration: 1000 }).animate({ fontSize: "85px" }, 1000 );
		$('body').append('<div id="container"><div id="progress_bar" class="ui-progress-bar ui-container"><div class="ui-progress" style="width: 79%;"><span class="ui-label" style="display:none;"><b class="value">79</b></span></div><!-- .ui-progress --></div><!-- #progress_bar --></div><!-- #container -->');
		showProgress();
	};
}

function removeParticles(){
	$('.particle').each(function() {
		$(this).remove();
	});
	$('.won').each(function() {
		$(this).remove();
	});
	$('#container').each(function() {
		$(this).remove();
	});
}

function playSound(){
	var x = Math.floor(Math.random() * 4);
	document.getElementById("button"+x).play();
}

function playApplause(){
	document.getElementById("applauseplayer").play();
}

//randomly moves all the particles around
function moveParticles() {
	$('.particle').each(function() {
		var x = Math.floor(Math.random() * 990);
		var y = Math.floor(Math.random() * 560);

		$(this).animate({"left": x + "px"}, 2000);
		$(this).animate({"top": y + "px"}, 2000);
	});
}
