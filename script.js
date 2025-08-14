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
};
var bpmIntervals = {L: null, R: null};

function getSongL(songIdL) {
    document.getElementById("title").innerHTML = songIdL;
    $("#audioPlayerL").attr("src", songIdL)
    $(".listContainerL").hide();
    $(".container").show();

    let bpm = bpmData[songIdL];
    startBeatStrip('L', bpm);
}

function getSongR(songIdR) {
    document.getElementById("titleR").innerHTML = songIdR;
    $("#audioPlayerR").attr("src", songIdR)
    $(".listContainerR").hide();
    $(".container").show();

    let bpm = bpmData[songIdR];
    startBeatStrip('R', bpm);
}

function playL() {
    playSongL.play();
    $(".playL,.iconLeftShow").hide();
    $(".pauseL,.spinIconL").show();
}

function playR() {
    playSongR.play();
    $(".playR,.iconRightShow").hide();
    $(".pauseR,.spinIconR").show();
}

function pauseL() {
    playSongL.pause();
    $(".pauseL,.spinIconL").hide();
    $(".playL,.iconLeftShow").show();
}

function pauseR() {
    playSongR.pause();
    $(".pauseR,.spinIconR").hide();
    $(".playR,.iconRightShow").show();
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
    var strip = document.getElementById(side === 'L' ? 'beatStripL' : 'beatStripR');
    strip.innerHTML = '';
    if (!bpm) return;
    var beatTime = 60 / bpm * 1000;
    clearInterval(bpmIntervals[side]);
    bpmIntervals[side] = setInterval(() => {
        var marker = document.createElement('div');
        marker.classList.add('beatMarker');
        marker.style.animationDuration = (200/100) * beatTime + "ms";
        strip.appendChild(marker);
        setTimeout (() => {
            marker.remove();
        }, (beatTime * 4));
    }, beatTime);
}
