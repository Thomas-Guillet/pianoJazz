var intro = document.getElementById("video-intro");
var musicMenu = document.getElementById("musicMenu");
const start = document.getElementById("play");
const touchesUp = document.querySelectorAll(".piano > .gamme > div");
const touchesDown = document.querySelectorAll(".piano.inverse > .gamme > div");
const plate = document.querySelectorAll("#plate");
const accord = false;
var statutNote = new Array();

// const audioc# = document.getElementById("audio-c#");

intro.volume = 0;
introStatus = 0;

function playAudioTransition(){
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
	TweenMax.staggerTo(touchesUp, 1, {y:"-=200"}, 0.03);
	TweenMax.staggerTo(touchesDown, 1, {y:"-=200"}, 0.03);
	TweenLite.to(plate, 2, {rotation:0});
	TweenLite.to(plate, 1, {height:0}).delay(2);
	playAudioTransition();
};

function play_note(note)
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
	}
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
			statutNote[notePressed] = true;
    	}
    }else if(e.keyCode == 118){
    	const notePressed = 'f';
    	if(statutNote[notePressed] == false){
    		play_note(notePressed);
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