var buttonColours = ["red", "blue", "green", "yellow"]

var gamePattern = [];
var userClickedPattern = [];

var level = 0
var started = false;


$(document).keydown(function() {
  if (!started) {
    nextSequence();
    $("#level-title").text("level " + level);
    started = true;
  }
});

$(".btn").click(function() {
  var userChosenColour = this.id;
  userClickedPattern.push(userChosenColour);

  playSound(userChosenColour);
  animatePress(userChosenColour);
  checkAnswer(userClickedPattern.length - 1);
});


function checkAnswer(currentLevel) {
  if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
    if (userClickedPattern.length === gamePattern.length) {
      setTimeout(function() {
        nextSequence();
      }, 1000)
    }
  } else {

    playSound("wrong");
    $("body").addClass("game-over")
    $("#level-title").text("Game Over, Press Any Key to Restart");
    setTimeout(function() {
      $("body").removeClass("game-over")
    }, 200)

    startOver();
  }
}

function nextSequence() {
  userClickedPattern = [];

  var randomNumber = Math.floor(Math.random() * 3) + 1;
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);
  $("#" + randomChosenColour).fadeOut(100).fadeIn(100);
  playSound(randomChosenColour);
  animatePress(randomChosenColour);

  level++
  $("#level-title").text("level " + level);
}


function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3")
  audio.play();
}


function animatePress(currentColour) {
  $("#" + currentColour).addClass("pressed");
  setTimeout(function() {
    $("#" + currentColour).removeClass("pressed")
  }, 100);
};


function startOver() {
  level = 0;
  gamePattern = [];
  started = false;
}
