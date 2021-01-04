//random bot reponse generator
var randomOutput = function() {
  var intOutput = Math.floor(Math.random() * 3) + 1;  // returns a random integer from 1 to 3

  if (intOutput == 1) {
    return "rock";
  } else if (intOutput == 2) {
    return "paper";
  } else {
    return "scissors";
  }
}

function main(){
  //initialize variables
  var bot = "";
  var botwins = false;
  var multiround = false;
  var endofgame = true;
  var roundresults = [];
  var botwinsgame = true;

  //ask user for gamemode
  var gamemode = prompt("What mode do you want to play?", "Type 'single' for single round mode or 'three' for best out of three mode.").toLowerCase();

  //process response for gamemode
  if ( (gamemode == null || gamemode == "") || (gamemode != "single" && gamemode != "three") ) { //invalid response
    alert("Invalid response.");
    return;
  } else if (gamemode == "single") {
    multiround = false;
  } else {
    multiround = true;
    endofgame = false;
  };

  //loop until game is over. loop once regardless.
  do {
    //prompt user and turn to lower case
    var input = prompt("Type 'rock' 'paper' or 'scissors'. ", "rock / paper /scissors").toLowerCase();

    //process response
    if ( (input == null || input == "") || (input != "rock" && input != "scissors" && input != "paper") ) { //invalid response
      alert("Invalid response.");
    } else { //play game
      bot = randomOutput();

      //detwermine if bot wins
      if ( (input == "rock" && bot == "paper") ||
      (input == "paper" && bot == "scissors") ||
      (input == "scissors" && bot == "rock") ) {
        botwins = true;
      } else { //determine if bot loses
        botwins = false;
      };

      //create output based on game result
      if (input == bot) {
        alert("You played '" + input + "' and bot played '" + bot + "'. The round is a draw!");
      } else if (botwins) {
        alert("You played '" + input + "' and bot played '" + bot + "'. You lose the round!");
        roundresults.push(0);
      } else {
        alert("You played '" + input + "' and bot played '" + bot + "'. You win the round!");
        roundresults.push(1);
      };

      if (roundresults.length == 3) {
        endofgame = true;
        if (roundresults[0] + roundresults[1] + roundresults[2] > 1) {
          botwinsgame = false;
        };
      } else if (roundresults.length == 2) {
        endofgame = (roundresults[0] == roundresults[1]);
        if (roundresults[0] + roundresults[1] > 1) {
          botwinsgame = false;
        };
      };

    };//end of play game round
  } while (!endofgame);

  //process end of game alerts and prompts
  if (!multiround) {
    if (confirm("Game is over. Press 'OK' to play again.")) {
      //restart the game
      main();
    };
  } else {
    if (botwinsgame) {
      if (confirm("Bot won two rounds and won the game. Press 'OK' to play again.")) {
        //restart the game
        main();
      };
    } else {
      if (confirm("You won two rounds and won the game. Press 'OK' to play again.")) {
        //restart the game
        main();
      };
    };
  };

};//end of main

//run the main function on window open
var main = main();
window.onload = main;
