var game = {
  deck: [],
  playerHand: [],
  dealerHand: [],
  winCounter: 0,
  turnCounter: 0,

  wins: $(".wins"),
  turn: $(".turn"),
  turnDescriptions: $(".turn-descriptions"),

  // newGame() function creates a new this.deck then shuffles it
  newGame: function() {
    // Clear the visuals (card div's) on the gameboard
    this.clearTable();
    this.turn.html("");
    this.turnDescriptions.html("");

    this.playerHand = [];
    this.dealerHand = [];
    this.winCounter = 0;
    this.deck = [];

    this.wins.html(this.winCounter.toString());

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
            this.deck.push(face.toString() + suit.toString());
            break;
          case 10:
            this.deck.push('0' + suit.toString());
            break;
          case 11:
            this.deck.push('J' + suit.toString());
            break;
          case 12:
            this.deck.push('Q' + suit.toString());
            break;
          case 13:
            this.deck.push('K' + suit.toString());
            break;
          default:
            this.deck.push('A' + suit.toString());
        }
      }
    }

    //Randomize the this.deck
    this.shuffleDeck();
    this.turnCounter = 0;
    //Start the first turn
    console.log("A new game starts with a new deck, "+this.deck.length+" cards!");
    this.newTurn();

  },

  newTurn: function() {
    this.playerHand = [];
    this.dealerHand = [];
    //At the end of a game, there will be <4 cards to deal out
    if (this.deck.length < 4){
      this.wins.html("You won "+this.winCounter.toString()+ " out of " + this.turnCounter.toString()+"!");
      this.turn.html("Here were your recent turns:");
      return true;
    }
    this.turnCounter++;
    console.log("A new turn has begun.");
    this.hitDealer();
    this.hitPlayer();
    this.hitDealer();
    this.hitPlayer();
    console.log("Turn "+this.turnCounter+" starts - the dealer with "+this.dealerHand+"("+this.handValue(this.dealerHand)+") and the player with "+this.playerHand+" ("+this.handValue(this.playerHand)+")");

    this.checkForBlackjacks();
  },

  /* I found an awesome explanation of an O(n) array randomizer called the
  Fisher-Yates Shuffle. If you're not familiar, check out a fantastic
  explanation here: http://bost.ocks.org/mike/shuffle/     */
  shuffleDeck: function() {
    var m = this.deck.length, t, i;

    // While there remain elements to shuffle…
    while (m) {

      // Pick a remaining element…
      i = Math.floor(Math.random() * m--);

      // And swap it with the current element.
      t = this.deck[m];
      this.deck[m] = this.deck[i];
      this.deck[i] = t;
    }
  },

  // Simple function to return the respective classes for each suit
  // |-> will be utilized when creating the card elements
  suitClassName: function(card) {
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
  },

  // A card is standed as a string, and the numeric value is returned
  // * If the card is an Ace, an 'a' is returned - this case will be handled in the
  // handValue function.
  cardValue: function(card){
    var face = card.substring(0,1);

    if (face=='2' || face=='3' || face=='4' || face=='5' || face=='6' ||
        face=='7' || face=='8' || face=='9') {

        return parseInt(face);
    }
    else if(face=='0' || face=='J' || face=='Q' || face=='K'){
        return 10;
    }
    else {
        return 'a';
    }
  },

  handValue: function(hand){
    var sum = 0;
    var ace_eleven = false;
    for(var i = 0; i < hand.length; i++){
      // If the card is anything but an Ace, add its value to the sum
      if(typeof(this.cardValue(hand[i])) == 'number') {
        sum += this.cardValue(hand[i]);
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
  },

  // Function clearTable clears all of the visible "hands" on the table
  clearTable: function() {
    $(".card").remove();
    console.log("Cleared the table");
  },

  // Function hitPlayer inserts a card into the player's hand (logically and visually)
  hitPlayer: function() {
    console.log("hitPlayer was called");
    // If the player went bust, just return
    if(this.handValue(this.playerHand) > 21){
      return false;
    }
    // If the this.deck has been depleted
    if (this.deck.length < 4){
      this.wins.html("You won "+this.winCounter.toString()+ " out of " + this.turnCounter.toString()+"!");
      this.turn.html("Here were your recent turns:");
      return true;
    }

    var card = this.deck.pop();
    this.playerHand.push(card);
    var suit = this.suitClassName(card);

    // Character for a diamond is shortened to &diams
    (suit == 'diamond') ? suit = 'diam' : suit = suit;

    var face = card.substring(0,1);
    // 0 represents a 10 card, converting for corner case
    (face == '0') ? face = '10' : face = face;

    $("#playerHand").append("<div class='card'> <p class='"+suit+"'>"+face+" &"+suit+
      "s;</p><p class='bottom-right "+suit+"'>"+face+" &"+suit+"s;</p></div>");
      // console.log("The player's card was a "+face+" of "+suit);
    // console.log($(".this.playerHand h2"));

    if(this.handValue(this.playerHand) > 21){
      console.log("Player just went bust with the hand "+this.playerHand+"("+this.handValue(this.playerHand)+")");
      this.dealerWins();
    };
    this.checkForBlackjacks();
  },

  // Function standPlayer allows a player to stand/stand on his turn
  standPlayer: function() {
    console.log("standPlayer was called");
    //First, check if this.playerHand value < this.dealerHand -> if true, dealerWins()
    if(this.handValue(this.playerHand) < this.handValue(this.dealerHand)){
      console.log("dealerWins from standPlayer");
      this.dealerWins();
    } // else if this.playerHand is equal to this.dealerHand, it's a tie -> clearTable() and start newTurn();
    else if(this.handValue(this.playerHand) === this.handValue(this.dealerHand)){
      this.playerHand = [];
      this.dealerHand = [];
      this.turnDescriptions.append("<li>On turn "+this.turnCounter+", the player and dealer tied with a hand of "+this.handValue(this.playerHand)+"</li>");
      this.clearTable();
      this.newTurn();
    } // else, the this.playerHand > this.dealerHand. dealer has to hit if < 17
    else {
      //while this.dealerHand < 17, hitDealer (take another card)
      while(this.handValue(this.dealerHand) < 17){
        this.hitDealer();
      }
      // if the dealer didn't go bust...
      if( this.handValue(this.dealerHand) <= 21) {
        if(this.handValue(this.dealerHand) > this.handValue(this.playerHand)){
          this.dealerWins();
        }
        else if (this.handValue(this.dealerHand) === this.handValue(this.playerHand)) {
          this.turnDescriptions.append("<li>On turn "+this.turnCounter+", the player and dealer tied with a hand of "+this.handValue(this.playerHand)+"</li>");
          this.clearTable();
          this.newTurn();
        }
        else {
          this.playerWins();
        }
      }
      // else the dealer went bust...
      else {
        this.playerWins();
      }

    }
  },

  // Function hitDealer inserts a card into the dealer's hand (logically and visually)
  hitDealer: function() {
    console.log("hitDealer was called");
    var card = this.deck.pop();
    this.dealerHand.push(card);

    // Change diamond to diam if needed (for character code)
    var suit = this.suitClassName(card);
    (suit == 'diamond') ? suit = 'diam' : suit = suit;

    // 0 is representative value for 10, change face if needed
    var face = card.substring(0,1);
    (face == '0') ? face = '10' : face = face;

    // If this is the first card being inserted, don't insert the suit/face value
    if(this.dealerHand.length == 1){
      $("#dealerHand").append("<span class='card hole'><span></span></span>");
    }
    else {
      $("#dealerHand").append("<div class='card'> <p class='"+suit+"'>"+face+" &"+suit+
        "s;</p><p class='bottom-right "+suit+"'>"+face+" &"+suit+"s;</p></div>");
    }

    if(this.handValue(this.dealerHand) > 21){
      console.log("Dealer just went bust with the hand "+this.dealerHand+", value: "+this.handValue(this.dealerHand));
      this.playerWins();
    }

  },

  checkForBlackjacks: function() {
    //Check player and dealer for blackjacks
    if(this.handValue(this.playerHand) === 21){
      if(this.handValue(this.dealerHand) === 21){
        this.playerHand = [];
        this.dealerHand = [];
        this.turnDescriptions.append("<li>On turn "+this.turnCounter+", the player and dealer tied with a hand of "+this.handValue(this.playerHand)+"</li>");
        this.clearTable();
        this.newTurn();
      }else{
        this.playerWins();
      }
    }else if(this.handValue(this.dealerHand) === 21){
      console.log("dealerWins from checkForBlackjacks");
      this.dealerWins();
    }
  },

  playerWins: function() {
    this.turnDescriptions.append("<li>On turn "+this.turnCounter+", the player won with a hand of "+this.handValue(this.playerHand)+" and the dealer's hand was "+this.handValue(this.dealerHand)+"</li>");
    this.playerHand = [];
    this.dealerHand = [];
    this.winCounter++;
    //Update win counter
    this.wins.html(this.winCounter.toString()+ " out of " + this.turnCounter.toString());
    this.turn.html("It's turn "+(this.turnCounter+1)+", and here were recent turns: ");
    this.clearTable();
    this.newTurn();
  },

  dealerWins: function() {
    this.turnDescriptions.append("<li>On turn "+this.turnCounter+", the dealer won with a hand of "+this.handValue(this.dealerHand)+" and the player's hand was "+this.handValue(this.playerHand)+"</li>");
    this.playerHand = [];
    this.dealerHand = [];
    //Update win counter
    this.wins.html(this.winCounter.toString()+ " out of " + this.turnCounter.toString());
    this.turn.html("It's turn "+(this.turnCounter+1)+", and here were recent turns: ");
    this.clearTable();
    this.newTurn();
  }
}
