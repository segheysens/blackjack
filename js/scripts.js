var deck = [];
var playerHand = [];
var dealerHand = [];
var winCounter = 0;
var turnCounter = 0;

var wins = $(".wins");
var turn = $(".turn");

newGame();

var test;
// add eventListener to each button
$("#NewGame").eq(0).click( function(event){newGame();} );
$("#Hit").eq(0).click( function(event){hitPlayer();} );
$("#Pass").eq(0).click( function(event){passPlayer();} );

// newGame() function creates a new deck then shuffles it
function newGame() {
  deck = [];
  playerHand = [];
  dealerHand = [];
  winCounter = 0;
  turnCounter = 0;

  //console.log();
  // Clear the visuals (card div's) on the gameboard
  clearTable();

  wins.html(winCounter.toString());


  for (var suit = 0; suit <= 3; suit++){
    for(var face = 2; face <= 14; face++ ){

      // face of card (separate cardValue function)
      // Suits: 0 = spades, 1 = hearts, 2 = diamonds, 3 = clubs
      // Examples: '22' is 2 of diamonds, 'a0' is ace of spades
      switch(face){
        case 2:
        case 3:
        case 4:
        case 5:
        case 6:
        case 7:
        case 8:
        case 9:
          deck.push(face.toString() + suit.toString());
          break;
        case 10:
          deck.push('0' + suit.toString());
          break;
        case 11:
          deck.push('j' + suit.toString());
          break;
        case 12:
          deck.push('q' + suit.toString());
          break;
        case 13:
          deck.push('k' + suit.toString());
          break;
        default:
          deck.push('a' + suit.toString());
      }
    }
  }

  //Randomize the deck
  shuffleDeck();
  //Start the first turn
  console.log("A new game start with a new deck with "+deck.length+" cards!");
  newTurn();

}

function newTurn(){
  //At the end of a game, there will be <4 cards to deal out
  if (deck.length < 4){
    wins.html("You won "+winCounter.toString()+ " out of " + turnCounter.toString()+"!");
    return true;
  }
  turnCounter++;
  dealerPlay();
  hitPlayer();
  dealerPlay();
  hitPlayer();
  console.log("A new turn has begun.");

  checkForBlackjacks();
}

/* I found an awesome explanation of an O(n) array randomizer called the
Fisher-Yates Shuffle. If you're not familiar, check out a fantastic
explanation here: http://bost.ocks.org/mike/shuffle/     */
function shuffleDeck() {
  var m = deck.length, t, i;

  // While there remain elements to shuffle…
  while (m) {

    // Pick a remaining element…
    i = Math.floor(Math.random() * m--);

    // And swap it with the current element.
    t = deck[m];
    deck[m] = deck[i];
    deck[i] = t;
  }
}

// Simple function to return the respective classes for each suit
// |-> will be utilized when creating the card elements
function suitClassName(card){
  var suit = card.substring(1);

  switch (suit){
    case '0':
      return "spade";
      break;
    case '1':
      return "heart";
      break;
    case '2':
      return "diamond";
      break;
    default:
      return "club";
  }
}

// A card is passed as a string, and the numeric value is returned
// *If the card is an Ace, an 'a' is returned - this case will be handled in the
// handValue function.
function cardValue(card){
  var face = card.substring(0,1);

  if (face=='2' || face=='3' || face=='4' || face=='5' || face=='6' ||
      face=='7' || face=='8' || face=='9') {

      return parseInt(face);
  }
  else if(face=='0' || face=='j' || face=='q' || face=='k'){
      return 10;
  }
  else {
      return 'a';
  }
}

// console.log(deck);

function handValue(hand){
  var sum = 0;
  var ace_eleven = false;
  for(var i = 0; i < hand.length; i++){
    // If the card is anything but an Ace, add its value to the sum
    if(typeof(cardValue(hand[i])) == 'number') {
      sum += cardValue(hand[i]);
    }
    // It's an ace. If the total value goes over 21, add 1 to the sum, otherwise, add 11
    // the ace_eleven keeps track of whether an ace is counted as 11
    else {
      if(sum + 11 <= 21){
        sum += 11;
        ace_eleven = true;
      } else {
        sum += 1;
      }
    }
  }

  // If an ace was counted as eleven, and the sum was pushed over 21,
  // treat the ace as a 1 (subtract 10).
  if ((sum > 21) && ace_eleven)
    return sum - 10;
  // Otherwise, just return the sum.
  else
    return sum;
}

// Function clearTable clears all of the visual "hands" on the table
function clearTable(){
  $(".card").remove();
  console.log("Cleared the table");
}

// Function hitPlayer inserts a card into the player's hand (logically and visually)
function hitPlayer(){
  // If the gplayer went bust, just return
  // if(handValue(playerHand) > 21){
  //   return false;
  // }
  // If the deck has been depleted
  if (deck.length < 4){
    wins.html("You won "+winCounter.toString()+ " out of " + turnCounter.toString()+"!");
    return true;
  }

  var card = deck.pop();
  playerHand.push(card);
  var suit = suitClassName(card);

  // Character for a diamond is shortened to &diams
  (suit == 'diamond') ? suit = 'diam' : suit = suit;

  var face = card.substring(0,1);
  // 0 represents a 10, convert for corner case
  (face == '0') ? face = '10' : face = face;

  $("#playerHand").append("<div class='card'> <p class='"+suit+"'>"+face+" &"+suit+
    "s;</p><p class='bottom-right "+suit+"'>"+face+" &"+suit+"s;</p></div>");
  //console.log($(".playerHand h2"));

  if(handValue(playerHand) > 21){
    dealerWins();
    newTurn();
  }
  checkForBlackjacks();
}

// Function passPlayer allows a player to pass/stand on his turn
function passPlayer(){
  //First, check if playerHand value < dealerHand -> if true, dealerWins()
  if(handValue(playerHand) < handValue(dealerHand)){
    dealerWins();
    newTurn();
  } // else if playerHand is equal to dealerHand, it's a tie -> clearTable() and start newTurn();
  else if(handValue(playerHand) == handValue(dealerHand)){
    playerHand = [];
    dealerHand = [];
    console.log("It's a tie!");
    clearTable();
    newTurn();
  } // else, the playerHand > dealerHand. dealer has to hit if < 17
  else {
    //if dealerHand < 17, dealerPlay (take another card)
    (handValue(dealerHand) < 17) ? dealerPlay() : console.log("Dealer is > 17 ("+handValue(dealerHand)+")");
    // if the dealer went bust, playerWins, otherwise, it's just like the player passed again
    playerWins();
    newTurn();

  }
}

// Function dealerPlay inserts a card into the dealer's hand (logically and visually)
function dealerPlay(){

  var card = deck.pop();
  dealerHand.push(card);

  // Change diamond to diam if needed (for character code)
  var suit = suitClassName(card);
  (suit == 'diamond') ? suit = 'diam' : suit = suit;

  // 0 is representative value for 10, change face if needed
  var face = card.substring(0,1);
  (face == '0') ? face = '10' : face = face;

  // If this is the first card being inserted, make it invisible
  if(dealerHand.length == 1){
    $("#dealerHand").append("<span class='card hole'><span></span></span>");
  }
  else{
    $("#dealerHand").append("<div class='card'> <p class='"+suit+"'>"+face+" &"+suit+
      "s;</p><p class='bottom-right "+suit+"'>"+face+" &"+suit+"s;</p></div>");
  }

  if(handValue(dealerHand) > 21){
    playerWins();
    newTurn();
    return false;
  }

}

function checkForBlackjacks(){
  //Check player and dealer for blackjacks
  if(handValue(playerHand) == 21){
    if(handValue(dealerHand) == 21){
      playerHand = [];
      dealerHand = [];
      console.log("It's a tie!");
      clearTable();
    }else{
      playerWins();
      newTurn();
    }
  }else if(handValue(dealerHand) == 21){
    dealerWins();
    newTurn();
  }
}

function playerWins(){
  console.log("Player won with the hand: "+playerHand+"and the dealer's hand was "+dealerHand);
  playerHand = [];
  dealerHand = [];
  winCounter++;
  //Update win counter
  wins.html(winCounter.toString()+ " out of " + turnCounter.toString());
  turn.html("current turn: "+(turnCounter+1));
  clearTable();
}

function dealerWins(){
  console.log("Dealer won with the hand: "+dealerHand+"and the player's hand was "+playerHand);
  playerHand = [];
  dealerHand = [];
  //Update win counter
  wins.html(winCounter.toString()+ " out of " + turnCounter.toString());
  turn.html("current turn: "+(turnCounter+1));
  clearTable();
}
