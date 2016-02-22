// Start the game (all object-oriented-like)!
game.newGame();

// add eventListener to the game controls
$("#NewGame").eq(0).click( function(event){game.newGame();} );
$("#Hit").eq(0).click( function(event){game.hitPlayer();} );
$("#Stand").eq(0).click( function(event){game.standPlayer();} );
// If a user clicks on the "Instructions" button or tries to close the Instructions, toggle that jawn
$("#instructions-button").click( function(event){$('#instructions').toggle();} );
$(".instructions-container h1").click( function(event){$('#instructions').toggle();} );
