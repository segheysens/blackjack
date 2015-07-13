var deck = [];


// newGame() function creates a new deck then shuffles it
function newGame() {
  deck = [];

  for (var suit = 0; suit <= 3; suit++){
    for(var face = 2; face <= 14; face++ ){

      // face of card (separate cardValue function)
      // Suits: 0 = spades, 1 = hearts, 2 = diamonds, 3 = clubs
      // Examples: '22' is 2 of diamonds, '0a' is ace of spades
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


newGame();

console.log(deck);
