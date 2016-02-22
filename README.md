# blackjack - http://segheysens.github.io/blackjack/
A small blackjack game created for the first project assignment during my GA Web Development Immersive.

# User Stories
* As a player, I should be able to start a new game so that I can play again
* As a player, I should be able to request a hand be dealt, so that I can begin playing
* As a player, I should be able to decide to "hit" or "stay", so that the game can progress
* As a player, I should be able to see whether I lost or won a hand (calculate the outcome)
* As a player, I should be able to keep track of how many times I have won or lost

/****************************************************************************************************/

# Implementation

While the above user stories outline the most basic functionality of the game, here are the
initial features that encompass the basic tasks that will need to be completed, and then some
reach/bonus features that may be implemented.

Necessary:
* logical representation of a deck and cards that can be "shuffled" (randomized)
  **Option 1 - Simplistic Array approach**
  |-> array of 52 strings, containing card names, values, and suit
    |-> calculate value of each from the name, and remove from deck
  |-> this way, the cards don't exist in memory after being removed from the array
  *Option 2 - OOP approach*
  |-> card objects
    |-> cards will have names and numerical values (2-10, Ace variates) as properties
  |-> deck Array
    |-> filled with  52 cards
* calculation of value the player's hand and the dealer's hand
  |-> separate function for determining value of a card (cardValue), then total value of a hand (handValue)
  |-> cardValue
    |-> **Option 1** numerical value will be determined by card name
    |-> *Option 2* each card object will have 'value' property
  |-> handValue
    |-> dependent on sum of cardValue's, special case when an Ace is in play
      |-> Aces determination could be a ternary op, 11 when handValue <= 21, 1 when handValue > 21
* Visual representation of the current cards
* Logical representation and view for player win counter
* Button for starting a New Game (/Restart)
* Button for choosing hit/pass

Nice-to-haves:
* Object-oriented design for cards - this structure could be reused in other card games
* Visual cards (more than text-based)
  |-> CSS animations
* Fake money to bet with (maybe $100 at the start of each game)
* Computer AI
* Multiplayer support



Final Review: http://segheysens.github.io/blackjack/
I utilized a spread of vanilla Javascript, jQuery selectors and modifiers, CSS, and HTML in this project. I gained a lot of practice with jQuery event listeners and modifiers, and CSS styling - those two would probably be my biggest takeaways from this first project. I also will need to commit more often as I write more complex code and avoid my urge to jump into solving the next problem. There are some styling issues that I need to address and certain user state cases I'd like to make more fluid for user experience. Some features I would liek to add include a balance for betting, and multiplayer support.
