// jshint esversion:6
let buttonColors = ["red", "blue", "green", "yellow"];
let userClickedPattern = [];
let gamePattern = [];
var isGameStarted = false;
var level = 0;

$(document).keypress(function (event) {                //checking keypress for whole webpage
    event.key;
    if (!isGameStarted) {
        $("#level-title").text("Level " + level);
        nextSequence();
        isGameStarted = true;
    }

});


function nextSequence() {
    userClickedPattern = [];

    level++;
    $("#level-title").text("Level " + level);

    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColour = buttonColors[randomNumber];
    gamePattern.push(randomChosenColour);

    $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);
}


$(".btn").click((e) => {
    var userChosenColour = e.target.id;
    userClickedPattern.push(userChosenColour);

    playSound(userChosenColour);
    animatePress(userChosenColour);

    checkAnswer(userClickedPattern.length - 1);
});


function playSound(name) {
    new Audio('sounds/' + name + '.mp3').play();
}


function animatePress(currentColor) {
    $('#' + currentColor).addClass('pressed');
    setTimeout(() => {
        $('#' + currentColor).removeClass('pressed');
    }, 100);
}


function checkAnswer(currentLevel) {
    if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
        console.log("success");
        if (userClickedPattern.length === gamePattern.length) {
            setTimeout(() => { nextSequence() }, 1000);
        }
    } else {
        console.log("wrong");
        playSound("wrong");
        $("body").addClass('game-over');
        setTimeout(() => {
            $("body").removeClass('game-over');
        }, 200);
        $("#level-title").text("Game Over, Press Any Key to Restart");
        startOver();
    }
}

function startOver() {
    isGameStarted = false;
    level = 0;
    gamePattern = [];
}
