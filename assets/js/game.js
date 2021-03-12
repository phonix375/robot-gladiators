var playerName = window.prompt("What is your robot's name?");
var playerHealth = 100;
var playerAttack = 10;
var playerMoney = 10;

var enemyNames = ['Roborto', 'Amy Android', 'Robo Trumble'];
var enemyHealth = 50;
var enemyAttack = 12;

console.log(enemyNames);
console.log(enemyNames.length);
console.log(enemyNames[0]);
console.log(enemyNames[3]);

// fight function (now with parameter for enemy's name)
var fight = function(enemyName) {
  while (playerHealth > 0 && enemyHealth > 0) {
    // ask player if they'd like to fight or run
    var promptFight = window.prompt('Would you like to FIGHT or SKIP this battle? Enter "FIGHT" or "SKIP" to choose.');

    // if player picks "skip" confirm and then stop the loop
    if (promptFight === "skip" || promptFight === "SKIP") {
      // confirm player wants to skip
      var confirmSkip = window.confirm("Are you sure you'd like to quit?");

      // if yes (true), leave fight
      if (confirmSkip) {
        window.alert(playerName + ' has decided to skip this fight. Goodbye!');
        // subtract money from playerMoney for skipping
        playerMoney = playerMoney - 10;

        break;
      }
    }

    // remove enemy's health by subtracting the amount set in the playerAttack variable
    enemyHealth = enemyHealth - playerAttack;
    console.log(
      playerName + ' attacked ' + enemyName + '. ' + enemyName + ' now has ' + enemyHealth + ' health remaining.'
    );

    // check enemy's health
    if (enemyHealth <= 0) {
      window.alert(enemyName + ' has died!');

      // award player money for winning
      playerMoney = playerMoney + 20;

      // leave while() loop since enemy is dead
      break;
    } else {
      window.alert(enemyName + ' still has ' + enemyHealth + ' health left.');
    }

    // remove players's health by subtracting the amount set in the enemyAttack variable
    playerHealth = playerHealth - enemyAttack;
    console.log(
      enemyName + ' attacked ' + playerName + '. ' + playerName + ' now has ' + playerHealth + ' health remaining.'
    );

    // check player's health
    if (playerHealth <= 0) {
      window.alert(playerName + ' has died!');
      // leave while() loop if player is dead
      break;
    } else {
      window.alert(playerName + ' still has ' + playerHealth + ' health left.');
    }
  }
};

var endGame = function(){
  //if player is still alive, player wins! 
  if(playerHealth > 0 ){
    window.alert("Grate job, you've survived the game! You now have a score");
  }
  else{
    window.alert("You've lost your robot in battle.")
  }
  //ask the player if they'd like to play again
  var playAgainConfirm = window.confirm("Would you like to play again?");

  if(playAgainConfirm){
    //restart the game 
    startGame();
  }
  else{
    window.alert("Thank you for playing Robot Gladiators! Come back soon!")
  }
};
var startGame = function() {
    // reset player stats
    playerHealth = 100;
    playerAttack = 10;
    playerMoney = 10;
// fight each enemy-robot by looping over them and fighting them one at a time
for (var i = 0; i < enemyNames.length; i++) {
  // if player is still alive, keep fighting
  enemyHealth = 50;
  enemyAttack = 12;
  if (playerHealth > 0) {
    // let player know what round they are in, remember that arrays start at 0 so it needs to have 1 added to it
    window.alert('Welcome to Robot Gladiators! Round ' + (i + 1));

    // pick new enemy to fight based on the index of the enemyNames array
    var pickedEnemyName = enemyNames[i];

    // reset enemyHealth before starting new fight
    // enemyHealth = 50;

    // pass the pickedEnemyName variable's value into the fight function, where it will assume the value of the enemyName parameter
    fight(pickedEnemyName);

    //if we're not at the last enemy in the arry
    if(i < enemyNames.length - 1 && playerHealth > 0){
      //ask if player wants to use the shop before next round
      var storeConfirm = window.confirm("The fight is over, visit the store before the next round?");
      shop();
    };

  }
  // if player isn't alive, stop the game
  else {
    window.alert('You have lost your robot in battle! Game Over!');
  }
//start the gmame again
//startGame();

}
endGame();
};

var shop = function(){
//ask the player what they'd like to do
var shopOptionPrompt = window.prompt(
"Would you like to REFILL your health, UPGRADE your attack, or LEAVE the store? Please enter one: 'REFILL', 'UPGRADE', or 'LEAVE' to make a choice."
);
// use switch to carry out action
switch(shopOptionPrompt){
  case "REFILL":
  case "refill":
    if(playerMoney >= 7){
    window.alert("Refilling player's health by 20 for 7 dollars");

    //increate health and decrease mony
    playerHealth = playerHealth + 20;
    playerMoney = playerMoney - 7;
    }
    else{
      window.alert("You don't have enough money");
    }
    break;
  case "UPGRADE" :
  case "upgrade":
    if(playerMoney >= 7){
      window.alert("Upgrading player's attack by 6 for 7 dollars");

      //increase attack and decrease mony
      playerAttack = playerAttack + 6;
      playerMoney = playerMoney - 7;
    }
    else{
      window.alert("You Don't have enough money!");
    }
 
  break;

  case"leave":
    window.alert('Leaving the store.');
    break;
  default:
    window.alert('You did not pick a valid option. Try again');

    //call shop()again to force player to pick a valid option
    shop();
    break;
  
}
};
// start the game when the page loads 
startGame();

// function to end the entire game
