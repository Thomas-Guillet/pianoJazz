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
	console.log('lol');
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
	console.log(accord);
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
	 	audio.currentTime = 0;
		audio.play();
		const pianoNote = document.getElementById(note);
		pianoNote.className += " selected";
		setTimeout(function() { pianoNote.classList.remove("selected"); }, 500);
	}
}

document.onkeypress = function (e) {
    e = e || window.event;
    if(e.keyCode == 119){
    	const notePressed = 'c';
    	play_note(notePressed);
		statutNote[notePressed] = true;
    }else if(e.keyCode == 115){
    	const notePressed = 'c-';
    	play_note(notePressed);
		statutNote[notePressed] = true;
    }else if(e.keyCode == 120){
    	const notePressed = 'd';
    	play_note(notePressed);
		statutNote[notePressed] = true;
    }else if(e.keyCode == 100){
    	const notePressed = 'd-';
    	play_note(notePressed);
		statutNote[notePressed] = true;
    }else if(e.keyCode == 99){
    	const notePressed = 'e';
    	play_note(notePressed);
		statutNote[notePressed] = true;
    }else if(e.keyCode == 118){
    	const notePressed = 'f';
    	play_note(notePressed);
		statutNote[notePressed] = true;
    }else if(e.keyCode == 103){
    	const notePressed = 'f-';
    	play_note(notePressed);
		statutNote[notePressed] = true;
    }else if(e.keyCode == 98){
    	const notePressed = 'g';
    	play_note(notePressed);
		statutNote[notePressed] = true;
    }else if(e.keyCode == 104){
    	const notePressed = 'g-';
    	play_note(notePressed);
		statutNote[notePressed] = true;
    }else if(e.keyCode == 110){
    	const notePressed = 'a';
    	play_note(notePressed);
		statutNote[notePressed] = true;
    }else if(e.keyCode == 106){
    	const notePressed = 'a-';
    	play_note(notePressed);
		statutNote[notePressed] = true;
    }else if(e.keyCode == 44){
    	const notePressed = 'h';
    	play_note(notePressed);
		statutNote[notePressed] = true;
    }
	
};

document.onkeyup = function (e) {
console.log(e.keyCode);
};