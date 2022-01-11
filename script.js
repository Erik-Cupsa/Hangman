// Bryan Lee and Erik Cupsa April 23rd 2019, Hangman game
var name, gamedifficulty, dash, userwins, userlosses, usererrors, display, word, wlength, gamecontainer, settingscontainer, winpercentage, hintbutton;
name = "no name";
gamedifficulty = "easy"; // No name and easy are the default controls 
userwins = 0;
userlosses = 0;
totalerrors = 0;

var backgroundMusic = document.createElement("audio");
var backgroundFile = document.createElement("source");
backgroundFile.setAttribute("src", "Music/background.mp3");
backgroundFile.setAttribute("type", "audio/mpeg");
backgroundFile.setAttribute("allow", "autoplay");
backgroundMusic.appendChild(backgroundFile);
document.body.appendChild(backgroundMusic);

window.onload = function initialAudioPlayback(){
    backgroundMusic.play();
    console.log("audio played");
}

//These are all of the possible words. e is for easy, m is for medium, h is for hard
var ewords = [
  "APPLE",
  "POKER",
  "FOXED",
  "STAFF",
  "LIVED",
  "ABYSS",
  "TREES",
  "TULIP",
  "ALOUD",
  "ZEBRA",
  "BLOAT",
  "STATE",
]

var mwords = [
  "QUIZZING",
  "MUZZLING",
  "JAMMIEST",
  "ANTERIOR",
  "MALPOSED",
  "MONARCHY",
  "SLIPPERY",
  "URINATED",
  "REACTION",
  "INTERAGE",
  "REQUIRED",
  "ANTERIOR",
]

var hwords = [
  "ZIGZAGGING",
  "GRUBBINESS",
  "OVERJOYIN",
  "PARALLAXES",
  "REVIVIFIED",
  "JAYWALKING",
  "CHUMMINESS",
  "EMBEZZLING",
  "BLACKJACKS",
  "WHIZZBANGS",
  "CONTINUITY",
  "INCREMENTS",
]

//This is the function that collects the difficulty that the user wants to play 
function startSettings() {
  settingscontainer = document.getElementById("divsettings");
  var settingsstart = document.createElement("p");
  settingsstart.id = "ss";
  settingscontainer.appendChild(settingsstart);
  document.getElementById("ss").innerHTML = "Click 'display' to display your current settings or click 'change' to change your current settings. The default settings are name is 'no name' and difficulty is 'easy'" + "<br>" + "<button onclick='displaySettings()'>Display</button>" + "<br>" + "<button id='change' onclick='changeSettings()'>Change</button>";
  var settingsdisplay = document.createElement("p");
  settingsdisplay.id = "sd";
  settingscontainer.appendChild(settingsdisplay);
  var settingschange = document.createElement("p");
  settingschange.id = "sc";
  settingscontainer.appendChild(settingschange);
}

//This function displays the name and difficulty of the user
function displaySettings() {
  document.getElementById("sd").innerHTML = "Your name is " + name + " and your game difficulty is " + gamedifficulty;
}

//This function  changes the difficulty of the game so that our code can chose the correct word correspondingly
function changeSettings() {
  document.getElementById("sc").innerHTML = "Enter your name here:";
  var nameinput = document.createElement("input");
  nameinput.type = "text";
  nameinput.id = "ni";
  settingscontainer.appendChild(nameinput);
  var settingschange2 = document.createElement("p");
  settingschange2.id = "sc2";
  settingscontainer.appendChild(settingschange2);
  document.getElementById("sc2").innerHTML = "Enter your difficulty here (easy/medium/hard):";
  var difficultyinput = document.createElement("input");
  difficultyinput.type = "text";
  difficultyinput.id = "di";
  settingscontainer.appendChild(difficultyinput);
  var submit = document.createElement("button");
  submit.id = "submit";
  settingscontainer.appendChild(submit);
  document.getElementById("submit").innerHTML = "Submit";
  submit.addEventListener("click", submitValues);
  document.getElementById("change").disabled = true;
}

// This function takes in the new difficulty you have selected and alerts you that the settings have been changed 
function submitValues() {
  name = document.getElementById("ni").value;
  if (document.getElementById("di").value == "easy") {
    gamedifficulty = "easy";
    alert("Your settings have been updated. Click display to see your current settings.");
  }
  else if (document.getElementById("di").value == "medium") {
    gamedifficulty = "medium";
    alert("Your settings have been updated. Click display to see your current settings.");
  }
  else if (document.getElementById("di").value == "hard") {
    gamedifficulty = "hard";
    alert("Your settings have been updated. Click display to see your current settings.");
  }
  else {
    alert("You have not entered a valid difficulty. Please enter either easy, medium, or hard.")
  }
}

// This function starts the game making the spots to ccreate the dashes, buttons, and the spot for the image to go as well as an introduction for the player 
function startgame() {

  document.getElementById("divgame").innerHTML = "";

  gamecontainer = document.getElementById("divgame");

  var startgame = document.createElement("button");
  startgame.id = "startgame";
  startgame.className = "playbutton";
  gamecontainer.appendChild(startgame);
  document.getElementById("startgame").innerHTML = "Play";
  startgame.addEventListener("click", playgame);

  var letterspicked = document.createElement("p");
  letterspicked.id = "lp";
  gamecontainer.appendChild(letterspicked);

  var dashes = document.createElement("p");
  dashes.id = "dashes";
  gamecontainer.appendChild(dashes);

  var image = document.createElement("p");
  image.id = "picBox";
  gamecontainer.appendChild(image);

  var buttons = document.createElement("p");
  buttons.id = "buttons";
  gamecontainer.appendChild(buttons);

  var end = document.createElement("p");
  end.id = "end";
  gamecontainer.appendChild(end);

  var settings = document.createElement("p");
  settings.id = "settings";
  gamecontainer.appendChild(settings);

  document.getElementById("settings").innerHTML = "<h3> Hello " + name + "! <br>Currently, your game is on " + gamedifficulty + " difficulty. If you would like to change your settings, click the settings icon. Once you are ready to play, click 'play'.</h3> <br> <button onclick='startSettings()'><img  width= '100px' height = '100px' src='Images/Settings-icon.png'></img></button>";

}

// This function creates the buttons for the user to make guesses, creates the dashes in the game, and finds the word that is trying to be guessed as well
function playgame() {
  usererrors = 0; //Resetting usererrors

  //This part of the function makes the play button disappear after it is clicked
  document.getElementById("startgame").style.display = 'block';
  this.style.display = 'none';

  document.getElementById("lp").innerHTML = "<h1>Hello " + name + "!</h1> <br> You have picked the " + gamedifficulty + " game difficulty. Below are your picked letters. Good luck guessing!<br> <h2> Letters Picked: </h2>";

  gamecontainer.removeChild(settings);
  document.getElementById("divsettings").innerHTML = "";

  var wordnum = Math.round(Math.random() * 11);
  if (gamedifficulty == "easy") {
    word = ewords[wordnum];
  }
  else if (gamedifficulty == "medium") {
    word = mwords[wordnum];
  }
  else if (gamedifficulty == "hard") {
    word = hwords[wordnum];
  }
  wlength = word.length;

  console.log(word);

  for (x = 1; x <= 26; x++) {

    var button = document.createElement("BUTTON");
    var myBr = document.createElement("br");

    var letter = String.fromCharCode(x + 64);
    var t = document.createTextNode(letter);

    button.appendChild(t);

    button.id = letter;

    button.addEventListener("mouseover", changeColor);
    button.addEventListener("mouseout", changeColor2);
    button.addEventListener("click", checkLetter);

    document.getElementById("buttons").appendChild(button);

    if (x % 26 == 0) {
      document.body.appendChild(myBr);
    }
  }

  dash = "";
  for (x = 1; x <= wlength; x++) {
    dash = dash + "_";
    display = dash.split('').join(' ');
  }
  document.getElementById("dashes").innerHTML = display;

  document.getElementById("picBox").innerHTML = "<img src=\'Images/1Hangman.png'>";

  hintbutton = document.createElement("button");
  hintbutton.id = "hintb";
  gamecontainer.appendChild(hintbutton);
  document.getElementById("hintb").innerHTML = "Hint";
  hintbutton.addEventListener("click", giveHint);

  document.getElementById("startgame").disabled = true;
}

//The following function displays each array of possible words for the user, giving them a hint if they are stuck
function giveHint(){
  gamecontainer.removeChild(hintbutton);
  var hint = document.createElement("p");
  hint.id = "hintdisplay";
  hint.innerHTML = "<p align='center'>The following are the possible answers:";
  hint.innerHTML += "<br><table><tr><td><h1>EASY</h1></td>"
  for (x=0; x<12; x++){
    hint.innerHTML += "<td> - " + ewords[x] + "</td>";
    }
  hint.innerHTML += "</tr><tr><td><h1>MEDIUM</h1></td>"
  for (x=0; x<12; x++){
    hint.innerHTML += "<td> - " + mwords[x] + "</td>";
    }
  hint.innerHTML += "</tr><tr><td><h1>HARD</h1></td>"
    for (x=0; x<12; x++){
      hint.innerHTML += "<td> - " + hwords[x] + "</td>";
    }
  hint.innerHTML += "</tr></table>"
  gamecontainer.appendChild(hint);
}
//This check the letter that the user guesses and check to see if it is in the word
function checkLetter() {
  //this refers to the object that called this function
  var userGuess = this.id;
  document.getElementById("lp").innerHTML += userGuess + ", ";

  if (word.includes(userGuess)) {
    for (x = 0; x <= wlength; x++) {
      if (word.substring(x, x + 1) == userGuess) {
        var replacement = userGuess;
        dash = dash.substring(0, x) + replacement + dash.substring(x + 1);
        display = dash.split('').join(' ');
      }
    }
  }
  else {
    usererrors++;
    totalerrors++; //This counts the errors the user has made
  }

  if (usererrors < 7 && dash == word) {
    userwins = userwins + 1;
    winpercentage = (userwins / (userwins + userlosses)) * 100; // winpercentage is equal to amount of wins divided by number of games times 100 to convert to percent
    document.getElementById("divgame").innerHTML = "<h1 class='endwin'> Congratulations you have won!</h1> <br>You correctly guessed the word, which was " + word + ". <br> You have made a total of " + totalerrors + " mistakes. <br> You have won the game " + userwins + " times and you have lost the game " + userlosses + " times. Currently, your win percentage is " + winpercentage + "% . <br> <button id='start' class = 'playbutton' onclick='startgame()'>Play Again</button> <button class = 'endbutton'><a href='index.html' class='acolor'>Exit</a></button>"; //This is an end game screen if the user has won the game
  }
  if (usererrors == 0) {
    document.getElementById("picBox").innerHTML = "<img src=\'Images/1Hangman.png'>";
  }
  else if (usererrors == 1) {
    document.getElementById("picBox").innerHTML = "<img src=\'Images/2Hangman.png'>";
  }
  else if (usererrors == 2) {
    document.getElementById("picBox").innerHTML = "<img src=\'Images/3Hangman.png'>";
  }
  else if (usererrors == 3) {
    document.getElementById("picBox").innerHTML = "<img src=\'Images/4Hangman.png'>";
  }
  else if (usererrors == 4) {
    document.getElementById("picBox").innerHTML = "<img src=\'Images/5Hangman.png'>";
  }
  else if (usererrors == 5) {
    document.getElementById("picBox").innerHTML = "<img src=\'Images/6Hangman.png'>";
  }
  else if (usererrors == 6) {
    document.getElementById("picBox").innerHTML = "<img src=\'Images/7Hangman.png'>";
  }
  else {
    userlosses = userlosses + 1;
    winpercentage = (userwins / (userwins + userlosses)) * 100; // winpercentage is equal to amount of wins divided by number of games times 100 to convert to percent
    document.getElementById("divgame").innerHTML = "<img class='end' src=\'Images/8Hangman.png'> <br><h1 class='endloss'> You have lost!</h1> <br>The word was  " + word + ". <br> You have made a total of " + totalerrors + " mistakes. <br> You have won the game " + userwins + " times and you have lost the game " + userlosses + " times. Currently, your win percentage is " + winpercentage + "% . <br> <button id='start' class = 'playbutton' onclick='startgame()'>Play Again</button> <button class = 'endbutton'><a href='index.html' class='acolor'>Exit</a></button>";
    //This is the endgame screen if the user has lost the game
  }
  document.getElementById("dashes").innerHTML = display;
  document.getElementById(userGuess).disabled = true;
}

function changeColor() {
  this.style.backgroundColor = "blue";
  //This changes the color of the button after they have been selected
}

// This changes the color of the buttons
function changeColor2() {
  this.style.backgroundColor = "white";
}