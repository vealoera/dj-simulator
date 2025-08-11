var playSongL = document.querySelector("#audioPlayerL");
var playSongR = document.querySelector("#audioPlayerR");
var volumeL = document.querySelector(".rangeL");
var volumeR = document.querySelector(".rangeR");
var progressBarL = document.querySelector(".progress");
var progressBarR = document.querySelector(".progressR");

function getSongL(songIdL) {
    document.getElementById("title").innerHTML = songIdL;
    $("#audioPlayerL").attr("src", songIdL)
    $(".listContainerL").hide();
    $(".container").show();
}

function getSongR(songIdR) {
    document.getElementById("titleR").innerHTML = songIdR;
    $("#audioPlayerR").attr("src", songIdR)
    $(".listContainerR").hide();
    $(".container").show();
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

volumeL.addEventListener('change', function(e) {
    playSongL.volume = e.currentTarget.value / 100;
});

volumeR.addEventListener('change', function(e) {
    playSongR.volume = e.currentTarget.value / 100;
});

function pauseSpinL(){
    playSongL.volume = 1;
    playSongR.volume = 0;
}

function pauseSpinR(){
    playSongR.volume = 1;
    playSongL.volume = 0;
}

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