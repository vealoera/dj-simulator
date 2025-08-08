var playSongL = document.querySelector("#audioPlayerL");
var playSongR = document.querySelector("#audioPlayerR");
var volumeL = document.querySelector(".rangeL");
var volumeR = document.querySelector(".rangeR");

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