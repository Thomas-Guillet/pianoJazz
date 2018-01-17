var intro = document.getElementById("video-intro");
var musicMenu = document.getElementById("musicMenu");
var jazzIsntDyingMusic = document.getElementById("jazzIsntDying");
const start = document.getElementById("play");
const neon = document.getElementById("neon-discover");
const touchesUp = document.querySelectorAll(".piano > .gamme > div");
const touchesDown = document.querySelectorAll(".piano.inverse > .gamme > div");
const plate = document.querySelectorAll("#plate");
const testPanel = document.getElementById('translate-title');
const titleParts = document.querySelectorAll(".title > span");
const accord = false;
var historyIndent = 0;
var arrowNext = document.getElementById("arrow-next");
var arrowPrec = document.getElementById("arrow-prec");
var openHistory = document.getElementById("menu-history");

var statutNote = new Array();
var historyInfo = new Array(
	['src/media/img/Louis_Armstrong.jpg', 'Jazz is a music genre that originated in the African-American communities of New Orleans, United States,<br/><br/> in the late 19th and early 20th centuries, and developed from roots in blues and ragtime.<br/><br/> Jazz is seen by many as America\'s classical music.<br/><br/> Since the 1920s Jazz Age, jazz has become recognized as a major form of musical expression. It then emerged in the form of independent traditional and popular musical styles, all linked by the common bonds of African-American and European-American musical parentage with a performance orientation.<br/><br/> Jazz is characterized by swing and blue notes, call and response vocals, polyrhythms and improvisation.'],
	['src/media/img/18-original.jpg', 'Jazz originated in the late 19th to early 20th century as interpretations of American and European classical music entwined with African and slave folk songs and the influences of West African culture. Its composition and style have changed many times throughout the years with each performer\'s personal interpretation and improvisation, which is also one of the greatest appeals of the genre.'],
);
var historyPicture = document.getElementById("history-picture");
var historyContent = document.getElementById("history-content");
var historyContain = document.getElementById("history");
var closeHistory = document.getElementById("close-history");


function displayNote(height){
	var newNote = document.createElement('span');
	newNote.className = "noteMeasure";
	newNote.style.top = height+"px";
	var measureAction = document.getElementById('measure-action');
	measureAction.appendChild(newNote);
	TweenLite.to(newNote, 7, { ease: Power0.easeNone, x: -728 });
}

closeHistory.onclick = function(){
	historyContain.style.zIndex = '-5';
}
openHistory.onclick = function(){
	historyIndent = 0;
	historyContain.style.zIndex = '20';
	historyPicture.style.backgroundImage = "url("+historyInfo[historyIndent][0]+")";
	historyContent.innerHTML = historyInfo[historyIndent][1];
	if(historyInfo.length > (historyIndent+1)){
		arrowNext.style.display = "block";
	}else{
		arrowNext.style.display = "none";
	}
	if(historyIndent == 0){
		arrowPrec.style.display = "none";
	}else{
		arrowPrec.style.display = "block";
	}
}

arrowNext.onclick = function(){
	historyIndent++;
	historyPicture.style.backgroundImage = "url("+historyInfo[historyIndent][0]+")";
	historyContent.innerHTML = historyInfo[historyIndent][1];
	if(historyInfo.length > (historyIndent+1)){
		arrowNext.style.display = "block";
	}else{
		arrowNext.style.display = "none";
	}
	if(historyIndent == 0){
		arrowPrec.style.display = "none";
	}else{
		arrowPrec.style.display = "block";
	}
}
arrowPrec.onclick = function(){
	historyIndent--;
	historyPicture.style.backgroundImage = "url("+historyInfo[historyIndent][0]+")";
	historyContent.innerHTML = historyInfo[historyIndent][1];
	if(historyInfo.length > (historyIndent+1)){
		arrowNext.style.display = "block";
	}else{
		arrowNext.style.display = "none";
	}
	if(historyIndent == 0){
		arrowPrec.style.display = "none";
	}else{
		arrowPrec.style.display = "block";
	}
}





// const audioc# = document.getElementById("audio-c#");

intro.volume = 0;
introStatus = 0;

function playAudioTransition(){
	setTimeout(function(){
		start.innerHTML = 'SKIP';
		start.setAttribute("id", "skip");
		const skip = document.getElementById("skip");
		delete start.onclick;
	}, 3000);

	volumeMusic = 1;
	volumeVideo = 0;
	var loopVolume = setInterval(updateStartVolume, 10);
    function updateStartVolume() {
        if (volumeVideo < 0.999) {
            volumeVideo += 0.01;
			intro.volume = volumeVideo;
        }
        if (volumeMusic > 0) {
            volumeMusic -= 0.01;
			musicMenu.volume = volumeMusic;
        }
        if(volumeVideo > 0.999 && volumeMusic < 0){
			intro.volume = 1;
			musicMenu.volume = 0;
			musicMenu.pause();
            clearInterval(loopVolume);
        }
    }
	intro.play();
	introStatus = 1;
}

intro.onclick = function(){
	if(introStatus == 1){
		intro.pause();
		introStatus = 0;
	}else{
		intro.play();
		introStatus = 1;
	}
}

start.onclick = function(){
	if(typeof(skip) !== 'undefined'){
		intro.pause();
		launchDiscover();
	}else{
		TweenMax.staggerTo(touchesUp, 1, {y:"-=200"}, 0.03);
		TweenMax.staggerTo(touchesDown, 1, {y:"-=200"}, 0.03);
		TweenLite.to(plate, 2, {rotation:0});
		TweenLite.to(plate, 1, {height:0}).delay(2);
		playAudioTransition();
	}
};

function play_note(note, click=null)
{
	if(accord == true){
		if(note == 'c'){
			const audio1 = document.getElementById("audio-c");
			const audio2 = document.getElementById("audio-e");
			const audio3 = document.getElementById("audio-g");
			audio1.pause();
			audio2.pause();
			audio3.pause();
		 	audio1.currentTime = 0;
		 	audio2.currentTime = 0;
		 	audio3.currentTime = 0;
			audio1.play();
			audio2.play();
			audio3.play();
		}
	}else{
		const audio = document.getElementById("audio-"+note);
		audio.pause();
		if(typeof noteVolume !== 'undefined'){
    		clearInterval(noteVolume);
		}
	 	audio.currentTime = 0;
	 	audio.volume = 1;
		audio.play();
		const pianoNote = document.getElementById(note);
		pianoNote.className += " selected";
		if(click == '1'){
			console.log(click+'remove');
			setTimeout(function(){ pianoNote.classList.remove("selected"); }, 500);
		}
	}
}

function animateNeon(){
	neon.className += " on";
	setTimeout(function(){ neon.classList.remove("on"); }, 1000);
}

function stop_note(note)
{
	const audio = document.getElementById("audio-"+note);
	audio.volume = 1
	var volume = audio.volume;
    clearInterval(noteVolume);
	var noteVolume = setInterval(stopNoteVolume, 0.5);
    function stopNoteVolume() {
    	if(statutNote[note] == false){
	        if (volume > 0.01) {
	            volume -= 0.01;
				audio.volume = volume;
	        }else{
				audio.volume = 0;
				audio.pause();
	            clearInterval(noteVolume);
	        }
    	}
    }
	const pianoNote = document.getElementById(note);
	pianoNote.classList.remove("selected");
}

document.onkeypress = function (e) {
    e = e || window.event;
    if(e.keyCode == 119){
    	const notePressed = 'c';
    	if(statutNote[notePressed] == false){
    		play_note(notePressed);
				displayNote('176');
			statutNote[notePressed] = true;
    	}
    }else if(e.keyCode == 115){
    	const notePressed = 'c-';
    	if(statutNote[notePressed] == false){
    		play_note(notePressed);
			statutNote[notePressed] = true;
    	}
    }else if(e.keyCode == 120){
    	const notePressed = 'd';
    	if(statutNote[notePressed] == false){
    		play_note(notePressed);
				displayNote('161');
			statutNote[notePressed] = true;
    	}
    }else if(e.keyCode == 100){
    	const notePressed = 'd-';
    	if(statutNote[notePressed] == false){
    		play_note(notePressed);
			statutNote[notePressed] = true;
    	}
    }else if(e.keyCode == 99){
    	const notePressed = 'e';
    	if(statutNote[notePressed] == false){
    		play_note(notePressed);
				displayNote('144');
			statutNote[notePressed] = true;
    	}
    }else if(e.keyCode == 118){
    	const notePressed = 'f';
    	if(statutNote[notePressed] == false){
    		play_note(notePressed);
				displayNote('129');
			statutNote[notePressed] = true;
    	}
    }else if(e.keyCode == 103){
    	const notePressed = 'f-';
    	if(statutNote[notePressed] == false){
    		play_note(notePressed);
			statutNote[notePressed] = true;
    	}
    }else if(e.keyCode == 98){
    	const notePressed = 'g';
    	if(statutNote[notePressed] == false){
    		play_note(notePressed);
				displayNote('112');
			statutNote[notePressed] = true;
    	}
    }else if(e.keyCode == 104){
    	const notePressed = 'g-';
    	if(statutNote[notePressed] == false){
    		play_note(notePressed);
			statutNote[notePressed] = true;
    	}
    }else if(e.keyCode == 110){
    	const notePressed = 'a';
    	if(statutNote[notePressed] == false){
    		play_note(notePressed);
				displayNote('97');
			statutNote[notePressed] = true;
    	}
    }else if(e.keyCode == 106){
    	const notePressed = 'a-';
    	if(statutNote[notePressed] == false){
    		play_note(notePressed);
			statutNote[notePressed] = true;
    	}
    }else if(e.keyCode == 44){
    	const notePressed = 'h';
    	if(statutNote[notePressed] == false){
    		play_note(notePressed);
				displayNote('80');
			statutNote[notePressed] = true;
    	}
    }

};

document.onkeyup = function (e) {
	console.log('up');
	e = e || window.event;
    if(e.keyCode == 87){
    	const notePressed = 'c';
    	stop_note(notePressed);
		statutNote[notePressed] = false;
    }else if(e.keyCode == 83){
    	const notePressed = 'c-';
    	stop_note(notePressed);
    	statutNote[notePressed] = false;
    }else if(e.keyCode == 88){
    	const notePressed = 'd';
    	stop_note(notePressed);
    	statutNote[notePressed] = false;
    }else if(e.keyCode == 68){
    	const notePressed = 'd-';
    	stop_note(notePressed);
    	statutNote[notePressed] = false;
    }else if(e.keyCode == 67){
    	const notePressed = 'e';
    	stop_note(notePressed);
    	statutNote[notePressed] = false;
    }else if(e.keyCode == 86){
    	const notePressed = 'f';
    	stop_note(notePressed);
    	statutNote[notePressed] = false;
    }else if(e.keyCode == 71){
    	const notePressed = 'f-';
    	stop_note(notePressed);
    	statutNote[notePressed] = false;
    }else if(e.keyCode == 66){
    	const notePressed = 'g';
    	stop_note(notePressed);
    	statutNote[notePressed] = false;
    }else if(e.keyCode == 72){
    	const notePressed = 'g-';
    	stop_note(notePressed);
    	statutNote[notePressed] = false;
    }else if(e.keyCode == 78){
    	const notePressed = 'a';
    	stop_note(notePressed);
    	statutNote[notePressed] = false;
    }else if(e.keyCode == 74){
    	const notePressed = 'a-';
    	stop_note(notePressed);
    	statutNote[notePressed] = false;
    }else if(e.keyCode == 188){
    	const notePressed = 'h';
    	stop_note(notePressed);
    	statutNote[notePressed] = false;
    }
};


intro.addEventListener('ended',launchDiscover,false);
function launchDiscover(e) {
	jazzIsntDyingMusic.play();
  TweenLite.to(testPanel, 1.5, {y:"-=100%"});
	setTimeout(function(){
		TweenMax.staggerTo(titleParts, 1.5, {display:'inline-block'}, 0.5);
		setTimeout(function(){
			TweenLite.to(neon, 1.5, {display:'block'});
			var neonDiscover = setInterval(animateNeon, 2000);
		}, 1500);
	}, 1000);
}

neon.onclick = function(){
	const bar = document.getElementById("bar");
	bar.style.zIndex = "11";
	bar.style.display = "block";
	TweenLite.to(bar, 0.5, {y:0});
// document.getElementById("bar").style.transform = "translateY(0%)";
}
