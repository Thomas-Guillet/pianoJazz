var intro = document.getElementById("video-intro");
var musicMenu = document.getElementById("musicMenu");
musicMenu.volume = "0.1";
var jazzIsntDyingMusic = document.getElementById("jazzIsntDying");
var jukebox1930 = document.getElementById("1930");
const start = document.getElementById("play");
const neon = document.getElementById("neon-discover");
const touchesUp = document.querySelectorAll(".piano > .gamme > div");
const touchesDown = document.querySelectorAll(".piano.inverse > .gamme > div");
const plate = document.querySelectorAll("#plate");
const testPanel = document.getElementById('translate-title');
const titleParts = document.querySelectorAll(".title > span");
const bottomMenu = document.querySelectorAll("#bottom-menu > div");
const accord = false;
var historyIndent = 0;
var arrowNext = document.getElementById("arrow-next");
var arrowPrec = document.getElementById("arrow-prec");
var arrowJukeNext = document.getElementById("arrow-juke-next");
var arrowJukePrec = document.getElementById("arrow-juke-prec");
var openHistory = document.getElementById("menu-history");
var openPiano = document.getElementById("menu-piano");
var openJuke = document.getElementById("menu-jukebox");
var playJuke = document.getElementById("juke-play");
var pauseJuke = document.getElementById("juke-pause");


var statutNote = new Array();
var historyInfo = new Array(
	['src/media/img/Louis_Armstrong.jpg', '<br />Jazz is a music genre that originated in the African-American communities of New Orleans, United States,<br/><br/> in the late 19th and early 20th centuries, and developed from roots in blues and ragtime.<br/><br/> Jazz is seen by many as America\'s classical music.<br/><br/> Since the 1920s Jazz Age, jazz has become recognized as a major form of musical expression. It then emerged in the form of independent traditional and popular musical styles, all linked by the common bonds of African-American and European-American musical parentage with a performance orientation.<br/><br/> Jazz is characterized by swing and blue notes, call and response vocals, polyrhythms and improvisation.'],
	['src/media/img/18-original.jpg', '<br />Jazz originated in the late 19th to early 20th century as interpretations of American and European classical music entwined with African and slave folk songs and the influences of West African culture.<br/><br/> Its composition and style have changed many times throughout the years with each performer\'s personal interpretation and improvisation, which is also one of the greatest appeals of the genre.'],
);
var jukeInfo = new Array(
	['1930', 'In the Mood by the Glenn Miller Band', '<br />Swing music bubbled up from the still-simmering Depression in the 30s and skewed jazz closer than ever before to popular music.<br/> In The Mood is its enduring song. The Glen Miller Band had some modicum of success before Mood, but their breakthrough came in 1939 during a three-month stint at Glen Island Casino in New Rochelle, New York. Performances at the casino were broadcast to many via the radio, making Glen Island a springboard for numerous groups in the decade, though arguably none more than Miller. The most important thing for Glenn s success was that he recorded In the Mood while he was at the casino, biographer George T. Simon told The New York Times. That made him the Michael Jackson of his day.<br/><br/>The song is buoyed by its unmistakable opening sax riff, meant to beckon jitterbuggers to the dance floor, and highlighted by a mid-song decrescendo fake-out (think Shout by the Isley Brothers).<br/><br/><b>Bonus Fact</b>: Jazz saxophonist Joe Garland, not Glenn Miller, actually composed the song, and the iconic opening lick may have been lifted from Wingy Manone s 1930s tune Tar Paper Stomp. Musicians played fast and loose with copyright laws in those days.'],
	['1940', 'In the Mood by the Glenn Miller Band', '<br />Swing music bubbled up from the still-simmering Depression in the 30s and skewed jazz closer than ever before to popular music.<br/> In The Mood is its enduring song. The Glen Miller Band had some modicum of success before Mood, but their breakthrough came in 1939 during a three-month stint at Glen Island Casino in New Rochelle, New York. Performances at the casino were broadcast to many via the radio, making Glen Island a springboard for numerous groups in the decade, though arguably none more than Miller. The most important thing for Glenn s success was that he recorded In the Mood while he was at the casino, biographer George T. Simon told The New York Times. That made him the Michael Jackson of his day.<br/><br/>The song is buoyed by its unmistakable opening sax riff, meant to beckon jitterbuggers to the dance floor, and highlighted by a mid-song decrescendo fake-out (think Shout by the Isley Brothers).<br/><br/><b>Bonus Fact</b>: Jazz saxophonist Joe Garland, not Glenn Miller, actually composed the song, and the iconic opening lick may have been lifted from Wingy Manone s 1930s tune Tar Paper Stomp. Musicians played fast and loose with copyright laws in those days.'],
);
var historyPicture = document.getElementById("history-picture");
var historyContent = document.getElementById("history-content");
var historyContain = document.getElementById("history");
var pianoContain = document.getElementById("play-piano-contain");
var jukeContain = document.getElementById("jukebox");
var jukeYear = document.getElementById("juke-year");
var jukeTitle = document.getElementById("juke-title");
var jukeContent = document.getElementById("juke-content");

var closeHistory = document.getElementById("close-history");
var closePiano = document.getElementById("close-piano");
var closeJuke = document.getElementById("close-juke");


closeHistory.onclick = function(){
	historyContain.style.zIndex = '-5';
}
openHistory.onclick = function(){
	historyIndent = 0;
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

	historyContain.style.opacity = '0';
	TweenMax.to(historyContain, .5, {opacity:1});
	closeHistory.style.opacity = '0';
	closeHistory.style.bottom = '50px';
	TweenMax.to(closeHistory, 2, { bottom:100, ease:Power2.easeInOut, opacity:1 })
	historyContain.style.zIndex = '20';
}

closeJuke.onclick = function(){
	jukeContain.style.zIndex = '-5';
	var vol = 0;
	var interval = 200; // 200ms interval

	var fadeout = setInterval(
		function() {
			// Reduce volume by 0.05 as long as it is above 0
			// This works as long as you start with a multiple of 0.05!
			if (vol < 0.1) {
				vol += 0.01;
				jazzIsntDyingMusic.volume = vol;
			}
			else {
				// Stop the setInterval when 0 is reached
				clearInterval(fadeout);
			}
		}, interval);
}
openJuke.onclick = function(){
	jukeIndent = 0;
	jukeYear.innerHTML = jukeInfo[jukeIndent][0]+"s";
	jukeTitle.innerHTML = jukeInfo[jukeIndent][1];
	jukeContent.innerHTML = jukeInfo[jukeIndent][2];
	if(jukeInfo.length > (jukeIndent+1)){
		arrowJukeNext.style.display = "block";
	}else{
		arrowJukeNext.style.display = "none";
	}
	if(jukeIndent == 0){
		arrowJukePrec.style.display = "none";
	}else{
		arrowJukePrec.style.display = "block";
	}

	jukeContain.style.opacity = '0';
	TweenMax.to(jukeContain, .5, {opacity:1});
	closeJuke.style.opacity = '0';
	closeJuke.style.bottom = '50px';
	TweenMax.to(closeJuke, 2, { bottom:100, ease:Power2.easeInOut, opacity:1 })
	jukeContain.style.zIndex = '20';
	var vol = 0.1;
	var interval = 200; // 200ms interval

	var fadeout = setInterval(
		function() {
			// Reduce volume by 0.05 as long as it is above 0
			// This works as long as you start with a multiple of 0.05!
			if (vol > 0) {
				vol -= 0.01;
				jazzIsntDyingMusic.volume = vol;
			}
			else {
				// Stop the setInterval when 0 is reached
				clearInterval(fadeout);
			}
		}, interval);
}
playJuke.onclick = function(){
	playJuke.style.display = "none"
	pauseJuke.style.display = "block"
	playPauseJukebox('play', jukeInfo[jukeIndent][0]);
}
pauseJuke.onclick = function(){
	pauseJuke.style.display = "none"
	playJuke.style.display = "block"
	playPauseJukebox('pause', jukeInfo[jukeIndent][0]);
}

function playPauseJukebox(action, year){
	if(action == 'play'){
		if(year == '1930'){
			jukebox1930.volume = 0.5;
			jukebox1930.play();
		}
	}else{
		if(year == '1930'){
			jukebox1930.pause();
		}
	}
}


closePiano.onclick = function(){
	pianoContain.style.zIndex = '-5';
	var vol = 0;
	var interval = 200; // 200ms interval

	var fadeout = setInterval(
		function() {
			// Reduce volume by 0.05 as long as it is above 0
			// This works as long as you start with a multiple of 0.05!
			if (vol < 0.1) {
				vol += 0.01;
				jazzIsntDyingMusic.volume = vol;
			}
			else {
				// Stop the setInterval when 0 is reached
				clearInterval(fadeout);
			}
		}, interval);
}
openPiano.onclick = function(){
	pianoContain.style.opacity = '0';
	TweenMax.to(pianoContain, .5, {opacity:1});
	closePiano.style.opacity = '0';
	closePiano.style.bottom = '50px';
	TweenMax.to(closePiano, 2, { bottom:100, ease:Power2.easeInOut, opacity:1 })
	pianoContain.style.zIndex = '20';
	var vol = 0.1;
	var interval = 200; // 200ms interval

	var fadeout = setInterval(
		function() {
			// Reduce volume by 0.05 as long as it is above 0
			// This works as long as you start with a multiple of 0.05!
			if (vol > 0) {
				vol -= 0.01;
				jazzIsntDyingMusic.volume = vol;
			}
			else {
				// Stop the setInterval when 0 is reached
				clearInterval(fadeout);
			}
		}, interval);
}


arrowNext.onclick = function(){
	historyIndent++;
	TweenMax.to(historyPicture, 0.5, { opacity:0 })
	TweenMax.to(historyContent, 0.5, { opacity:0 })
	setTimeout(function(){
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
		TweenMax.to(historyPicture, 0.5, { opacity:1 })
		TweenMax.to(historyContent, 0.5, { opacity:1 })
	}, 500);
}
arrowPrec.onclick = function(){
	historyIndent--;

	TweenMax.to(historyPicture, 0.5, { opacity:0 })
	TweenMax.to(historyContent, 0.5, { opacity:0 })
	setTimeout(function(){

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

		TweenMax.to(historyPicture, 0.5, { opacity:1 })
		TweenMax.to(historyContent, 0.5, { opacity:1 })
	}, 500);
}
arrowJukeNext.onclick = function(){
	jukeIndent++;
	pauseJuke.style.display = "none"
	playJuke.style.display = "block"
	TweenMax.to(jukeYear, 0.5, { opacity:0 })
	TweenMax.to(jukeTitle, 0.5, { opacity:0 })
	TweenMax.to(pauseJuke, 0.5, { opacity:0 })
	TweenMax.to(playJuke, 0.5, { opacity:0 })
	TweenMax.to(jukeContent, 0.5, { opacity:0 })
	setTimeout(function(){
		jukeYear.innerHTML = jukeInfo[jukeIndent][0]+"s";
		jukeTitle.innerHTML = jukeInfo[jukeIndent][1];
		jukeContent.innerHTML = jukeInfo[jukeIndent][2];
		if(jukeInfo.length > (jukeIndent+1)){
			arrowJukeNext.style.display = "block";
		}else{
			arrowJukeNext.style.display = "none";
		}
		if(jukeIndent == 0){
			arrowJukePrec.style.display = "none";
		}else{
			arrowJukePrec.style.display = "block";
		}
		TweenMax.to(jukeYear, 0.5, { opacity:1 })
		TweenMax.to(jukeTitle, 0.5, { opacity:1 })
		TweenMax.to(pauseJuke, 0.5, { opacity:1 })
		TweenMax.to(playJuke, 0.5, { opacity:1 })
		TweenMax.to(jukeContent, 0.5, { opacity:1 })
	}, 500);
}
arrowJukePrec.onclick = function(){
	jukeIndent--;
	pauseJuke.style.display = "none"
	playJuke.style.display = "block"
	TweenMax.to(jukeYear, 0.5, { opacity:0 })
	TweenMax.to(jukeTitle, 0.5, { opacity:0 })
	TweenMax.to(pauseJuke, 0.5, { opacity:0 })
	TweenMax.to(playJuke, 0.5, { opacity:0 })
	TweenMax.to(jukeContent, 0.5, { opacity:0 })
	setTimeout(function(){
		jukeYear.innerHTML = jukeInfo[jukeIndent][0]+"s";
		jukeTitle.innerHTML = jukeInfo[jukeIndent][1];
		jukeContent.innerHTML = jukeInfo[jukeIndent][2];
		if(jukeInfo.length > (jukeIndent+1)){
			arrowJukeNext.style.display = "block";
		}else{
			arrowJukeNext.style.display = "none";
		}
		if(jukeIndent == 0){
			arrowJukePrec.style.display = "none";
		}else{
			arrowJukePrec.style.display = "block";
		}
		TweenMax.to(jukeYear, 0.5, { opacity:1 })
		TweenMax.to(jukeTitle, 0.5, { opacity:1 })
		TweenMax.to(pauseJuke, 0.5, { opacity:1 })
		TweenMax.to(playJuke, 0.5, { opacity:1 })
		TweenMax.to(jukeContent, 0.5, { opacity:1 })
	}, 500);
}

// const audioc# = document.getElementById("audio-c#");

intro.volume = 0;
introStatus = 0;

function displayNote(height, bar = false){
	var newNote = document.createElement('span');
	if(bar){
		newNote.className = "noteMeasure barMeasure";
	}else{
		newNote.className = "noteMeasure";
	}
	newNote.style.top = height+"px";
	var measureAction = document.getElementById('measure-action');
	measureAction.appendChild(newNote);
	TweenLite.to(newNote, 7.5, { ease: Power0.easeNone, x: -750 });
}

function playAudioTransition(){
	setTimeout(function(){
		start.innerHTML = 'SKIP';
		start.setAttribute("id", "skip");
		const skip = document.getElementById("skip");
		delete start.onclick;
	}, 3000);

	volumeMusic = 0.1;
	volumeVideo = 0;
	var loopVolume = setInterval(updateStartVolume, 10);
	function updateStartVolume() {
		if (volumeVideo < 0.999) {
			volumeVideo += 0.01;
			intro.volume = volumeVideo;
		}
		if (volumeMusic > 0) {
			volumeMusic -= 0.001;
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
			displayNote('176', true);
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
	jazzIsntDyingMusic.loop = true;
	jazzIsntDyingMusic.volume = 0.1;
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
	setTimeout(function(){
		TweenMax.staggerTo(bottomMenu, 1, {y:"-=50px"}, 0.05);
	}, 4000);

	// document.getElementById("bar").style.transform = "translateY(0%)";
}
