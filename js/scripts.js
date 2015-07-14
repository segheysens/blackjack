var deck = [];
var playerHand = [];
var dealerHand = [];

newGame();

// newGame() function creates a new deck then shuffles it
function newGame() {
  deck = [];

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

// Function dealHand() pops two cards off of the deck and inserts them into playerHand. The deck
// was already randomized when it was created, so no need to do that now.
