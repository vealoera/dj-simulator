var playSongL = document.querySelector("#audioPlayerL");
var playSongR = document.querySelector("#audioPlayerR");
var volumeL = document.querySelector(".rangeL");
var volumeR = document.querySelector(".rangeR");
var progressBarL = document.querySelector(".progress");
var progressBarR = document.querySelector(".progressR");
var crossfader = document.getElementById("crossfader");
var bpmData = {
    "songs/closer.mp3": 95,
    "songs/hotlinebling.mp3": 135,
    "songs/unforgettable.mp3": 98,
    "songs/delicate.mp3": 95,
};
var bpmIntervals = {};

let currentSongL = null;
let currentSongR = null;

function getSongL(songIdL) {
    currentSongL = songIdL;
    document.getElementById("title").innerHTML = songIdL;
    $("#audioPlayerL").attr("src", songIdL)
    $(".listContainerL").hide();
    $(".container").show();
}

function getSongR(songIdR) {
    currentSongR = songIdR;
    document.getElementById("titleR").innerHTML = songIdR;
    $("#audioPlayerR").attr("src", songIdR)
    $(".listContainerR").hide();
    $(".container").show();
}

function playL() {
    playSongL.play();
    $(".playL,.iconLeftShow").hide();
    $(".pauseL,.spinIconL").show();

    let bpm = bpmData[currentSongL];
    startBeatStrip('L', bpm);
}

function playR() {
    playSongR.play();
    $(".playR,.iconRightShow").hide();
    $(".pauseR,.spinIconR").show();

    let bpm = bpmData[currentSongR];
    startBeatStrip('R', bpm);
}

function pauseL() {
    playSongL.pause();
    $(".pauseL,.spinIconL").hide();
    $(".playL,.iconLeftShow").show();
    clearInterval(bpmIntervals['L']);
}

function pauseR() {
    playSongR.pause();
    $(".pauseR,.spinIconR").hide();
    $(".playR,.iconRightShow").show();
    clearInterval(bpmIntervals['R']);
}


function pickMusicL() {
    $(".listContainerL").show();
    $(".container").hide();
}

function pickMusicR() {
    $(".listContainerR").show();
    $(".container").hide();
}

volumeL.addEventListener('input', function(e) {
    playSongL.volume = e.currentTarget.value / 100;
});

volumeR.addEventListener('input', function(e) {
    playSongR.volume = e.currentTarget.value / 100;
});

function formatTime(seconds) {
    var time = Math.round(seconds);
    var minutes = Math.floor(time / 60);
    var setSeconds = time - minutes * 60;

    var extZero = (setSeconds < 10) ? "0" : "";

    return minutes + ":" + extZero + setSeconds;
}

playSongL.addEventListener('canplay', function() {
    var duration = formatTime(this.duration);
    $(".timeL").text(duration);
});

playSongL.addEventListener("timeupdate", function() {
    progressBarL.value = playSongL.currentTime / playSongL.duration;
    if(this.duration) {
        currentTimeProgL(this);
    }
});

function currentTimeProgL(playSongL){
    $(".currentTime").text(formatTime(playSongL.currentTime));
}

playSongR.addEventListener('canplay', function() {
    var duration = formatTime(this.duration);
    $(".timeR").text(duration);
});

playSongR.addEventListener("timeupdate", function() {
    progressBarR.value = playSongR.currentTime / playSongR.duration;
    if(this.duration) {
        currentTimeProgR(this);
    }
});

function currentTimeProgR(playSongR){
    $(".currentTimeR").text(formatTime(playSongR.currentTime));
}

crossfader.addEventListener("input", function(e) {
    var value = e.target.value / 100;
    playSongL.volume = 1 - value;
    playSongR.volume = value;
})

function startBeatStrip(side, bpm) {
    var strip = document.getElementById(side === 'L' ? 'beatstripL' : 'beatstripR');
    strip.innerHTML = '';
    if (!bpm) return;

    let audioEl = side === 'L' ? playSongL : playSongR;
    let beatTime = 60 / bpm;
    clearInterval(bpmIntervals[side]);

    let songTime = audioEl.currentTime;
    let offset = (songTime % beatTime) * 1000;

    function createMarker() {
        let marker = document.createElement('div');
        marker.classList.add('beatMarker');
        marker.style.animationDuration = beatTime * 1000 + "ms";
        strip.appendChild(marker);
        setTimeout(() => marker.remove(), beatTime * 2000);
    }

    setTimeout(() => {
        createMarker();
        bpmIntervals[side] = setInterval(createMarker, beatTime * 1000);
    }, beatTime * 1000 - offset);
}

const JOG_SENSITIVITY = 0.05;  

let lastX = null;

function enableJogwheel(audioEl, jogwheelEl) {
    jogwheelEl.addEventListener("mousedown", startDrag);
    jogwheelEl.addEventListener("touchstart", startDrag);

    function startDrag(e) {
        e.preventDefault();
        lastX = e.clientX || e.touches[0].clientX;
        document.addEventListener("mousemove", onDrag);
        document.addEventListener("mouseup", stopDrag);
        document.addEventListener("touchmove", onDrag);
        document.addEventListener("touchend", stopDrag);
    }

    function onDrag(e) {
        let x = e.clientX || e.touches[0].clientX;
        let delta = x - lastX;
        lastX = x;

        audioEl.currentTime = Math.max(0, Math.min(audioEl.duration, audioEl.currentTime + delta * JOG_SENSITIVITY));

        jogwheelEl.style.transform = `rotate(${audioEl.currentTime * 20}deg)`; 

        let bpm = bpmData[side === 'L' ? currentSongL : currentSongR];
        startBeatStrip(side, bpm);
    }

    function stopDrag() {
        document.removeEventListener("mousemove", onDrag);
        document.removeEventListener("mouseup", stopDrag);
        document.removeEventListener("touchmove", onDrag);
        document.removeEventListener("touchend", stopDrag);
    }
}

enableJogwheel(playSongL, document.querySelector(".spinIconL"), 'L');
enableJogwheel(playSongR, document.querySelector(".spinIconR"), 'R');
