// function to generate random numeric value
var randomNumber = function(min, max) {
  var value = Math.floor(Math.random() * (max - min + 1) + min);

  return value;
};

var getPlayerName = function() {
  var name = '';
  while(name == ''|| name == null){
    name = prompt("What is your robot's name?");
  };

  console.log("Yout tobot's name is " + name);
  return name;

};

var playerInfo = {
  name: getPlayerName(),
  health: 100,
  attack:10,
  money:10,
  reset: function(){
    this.health = 100;
    this.money = 100;
    this.attack = 10;
  },
  refillHealth: function() {
    if (this.money >= 7) {
      window.alert("Refilling player's health by 20 for 7 dollars.");
      this.health += 20;
      this.money -= 7;
    } 
    else {
      window.alert("You don't have enough money!");
    }
  },
  upgradeAttack: function() {
    if (this.money >= 7) {
      window.alert("Upgrading player's attack by 6 for 7 dollars.");
      this.attack += 6;
      this.money -= 7;
    } 
    else {
      window.alert("You don't have enough money!");
    }
  }
};
var enemyInfo = [
  {
    name: "Roborto",
    attack: randomNumber(10, 14)
  },
  {
    name: "Amy Android",
    attack: randomNumber(10, 14)
  },
  {
    name: "Robo Trumble",
    attack: randomNumber(10, 14)
  }
];


// function to start a new game
var startGame = function() {
  // reset player stats
  playerInfo.reset();

  // fight each enemy robot by looping over them and fighting them one at a time
  for (var i = 0; i < enemyInfo.length ; i++) {
    // if player is still alive, keep fighting
    if (playerInfo.health > 0) {
      // let player know what round they are in, remember that arrays start at 0 so it needs to have 1 added to it
      window.alert('Welcome to Robot Gladiators! Round ' + (i + 1));

      // pick new enemy to fight based on the index of the enemyNames array
      var pickedEnemyObj = enemyInfo[i];

      // reset enemyHealth before starting new fight
      pickedEnemyObj.health = randomNumber(40, 60);

      // pass the pickedEnemyName variable's value into the fight function, where it will assume the value of the enemyName parameter
      fight(pickedEnemyObj);
    }
    // if player is not alive, break out of the loop and let endGame function run
    else {
      break;
    }
  }

  // after loop ends, we are either out of playerHealth or enemies to fight, so run the endGame function
  endGame();
};

// function to end the entire game
var endGame = function() {
  window.alert("The game has now ended. Let's see how you did!");

  // if player is still alive, player wins!
  if (playerInfo.health > 0) {
    window.alert("Great job, you've survived the game! You now have a score of" + playerInfo.money + '.');
  } else {
    window.alert("You've lost your robot in battle!");
  }

  // ask player if they'd like to play again
  var playAgainConfirm = window.confirm('Would you like to play again?');

  if (playAgainConfirm) {
    startGame();
  } else {
    window.alert('Thank you for playing Battlebots! Come back soon!');
  }
};

var fightOrSkip = function() {
  // ask player if they'd like to fight or skip using fightOrSkip function
  var promptFight = window.prompt('Would you like FIGHT or SKIP this battle? Enter "FIGHT" or "SKIP" to choose.');

  // Enter the conditional recursive function call here!
  // Conditional Recursive Function Call
  if (!promptFight) {
    window.alert("You need to provide a valid answer! Please try again.");
    return fightOrSkip();
  }
  // if player picks "skip" confirm and then stop the loop
  if (promptFight === "skip" || promptFight === "SKIP") {
    // confirm player wants to skip
    var confirmSkip = window.confirm("Are you sure you'd like to quit?");

    // if yes (true), leave fight
    if (confirmSkip) {
      window.alert(playerInfo.name + " has decided to skip this fight. Goodbye!");
      // subtract money from playerMoney for skipping
      playerInfo.playerMoney = playerInfo.money - 10;
      shop();
    }
  }
}

// fight function (now with parameter for enemy's name)
var fight = function(enemey) {
  while (playerInfo.health > 0 && enemey.health > 0) {
    // ask player if they'd like to fight or run
    fightOrSkip();
    //generate random damage value on playe's attack power
    var damage = randomNumber(playerInfo.attack - 3, playerInfo.attack);

    // remove enemy's health by subtracting the amount set in the playerAttack variable
    enemey.health = Math.max(0, enemey.health - damage);

    console.log(
      playerInfo.name + ' attacked ' + enemey.name + '. ' + enemey.name + ' now has ' + enemey.health + ' health remaining.'
    );

    // check enemy's health
    if (enemey.health <= 0) {
      window.alert(enemey.name + ' has died!');

      // award player money for winning
      playerInfo.money = playerInfo.money + 20;

      // ask if player wants to use the store before next round
      var storeConfirm = window.confirm('The fight is over, visit the store before the next round?');

      // if yes, take them to the store() function
      if (storeConfirm) {
        shop();
      }

      // leave while() loop since enemy is dead
      break;
    } else {
      window.alert(enemey.name + ' still has ' + enemey.health + ' health left.');
    }
    // generate random number for the damage

    var damage = randomNumber(enemey.attack - 3, enemey.attack);
    // remove players's health by subtracting the amount set in the enemyAttack variable
    playerInfo.health = Math.max(0, playerInfo.health - damage);
    console.log(
      enemey.name + ' attacked ' + playerInfo.name + '. ' + playerInfo.name + ' now has ' + playerInfo.health + ' health remaining.'
    );

    // check player's health
    if (playerInfo.health <= 0) {
      window.alert(playerInfo.name + ' has died!');
      // leave while() loop if player is dead
      break;
    } else {
      window.alert(playerInfo.name + ' still has ' + playerInfo.health + ' health left.');
    }
  };
};

// go to shop between battles function
var shop = function() {
  // ask player what they'd like to do
  var shopOptionPrompt = window.prompt(
    'Would you like to REFILL your health, UPGRADE your attack, or LEAVE the store? Please enter one "REFILL", "UPGRADE", or "LEAVE" to make a choice.'
  );

  // use switch case to carry out action
  switch (shopOptionPrompt) {
    case 'refill':
    case 'REFILL':
        playerInfo.refillHealth();
      break;
    case 'upgrade':
    case 'UPGRADE':
        playerInfo.upgradeAttack();
      break;
    case 'leave':
    case 'LEAVE':
      window.alert('Leaving the store.');
      break;
    default:
      window.alert('You did not pick a valid option. Try again.');
      shop();
      break;
  }
};

// start first game when page loads
startGame();
