

///// GLOBAL /////
$(document).ready(function() {

	const freshDeck = createDeck();
	var theDeck = freshDeck
	var playersHand = [];
	var dealersHand = [];


	function createDeck() {
		// Local variable newDeck.
		var newDeck = [];
		// Local variable that will not be changed.
		const suits = ['h','s','d','c'];
		// Outer loop for card values
		for(let s = 0; s < suits.length; s++) {
			// Inner loop for card values
			for(let c = 1; c <= 13; c++) {
				newDeck.push(c + suits[s]);
			}
		}
		return newDeck;
	}

	$('.deal-button').click(function() {
		console.log("The user clicked deal!");
		theDeck = shuffleDeck();
		// The deck is shuffled. Update the player and dealer's hand.
		// The player always gets the first card in the deck.
		playersHand.push(theDeck.shift());
		dealersHand.push(theDeck.shift());
		playersHand.push(theDeck.shift());
		dealersHand.push(theDeck.shift());

		console.log(theDeck.length)
		placeCard('player', 1, playersHand[0]);
		placeCard('dealer', 1, dealersHand[0]);
		placeCard('player', 2, playersHand[1]);
		placeCard('dealer', 2, dealersHand[1]);

		calculateTotal(playersHand, 'player');
		calculateTotal(dealersHand, 'dealer');

	});

	$('.hit-button').click(function(){
		console.log("User clicked hit!");
		calculateTotal(playersHand, 'player');
		calculateTotal(dealersHand, 'dealer');
		playersHand.push(theDeck.shift());
		placeCard('player', playersHand.length, playersHand[playersHand.length-1]);
		calculateTotal(playersHand, 'player');
	});

	$('.stand-button').click(function(){

		// Control goes to the dealer.
		// Rules of blackjack for dealer:
		// 	- If total is less than 17, dealer must hit.
		// 	- If total is 17 or greater, dealer 

		var dealerTotal = calculateTotal(dealersHand, 'dealer');
		while(dealerTotal < 17) {
			dealersHand.push(theDeck.shift());
			dealerTotal = calculateTotal(dealersHand, 'dealer');
			placeCard('dealer', dealersHand.length, dealersHand[dealersHand.length-1]);
		}

	});

	function checkWin() {
		var playerTotal = calculateTotal(playersHand, 'player');
		var dealerTotal = calculateTotal(dealersHand, 'dealer');
		if (playerTotal > 21) {
			// Player busts and loses
		} else if (dealerTotal > 21) {
			// Dealer busts and loses
		} else if (playerTotal > dealerTotal) {
			// Player wins
		} else if (dealerTotal > playerTotal) {
			// Dealer wins
		} else {
			// Tie
		} 

		// Other possibilities:
		//	playersHand.length = 2 AND playerTotal = 21... Blackjack
		//  dealersHand.length = 2 AND dealerTotal = 21... Blackjack

	}

	function calculateTotal(hand,who) {
		var total = 0;
		var thisCardValue = 0;
		for(let i = 0; i < hand.length; i++) {
			thisCardValue = Number(hand[i].slice(0,-1));
			total += thisCardValue;
		}
		var classSelector = "." + who + "-total";
		$(classSelector).html(total);
		return total;
	}


	function placeCard(who,where,cardToPlace) {
		var classSelector = "." + who + '-cards .card-' + where;
		// console.log(classSelector);
		$(classSelector).html('<img src="images/' + cardToPlace + '.png">');
	}


	var shuffleDeck = function() {

		var shuffledDeck = [];

		for (let i = 0; i < 52; i++) {
			var randomCard = theDeck[Math.floor(Math.random()*(theDeck.length))];
			shuffledDeck.push(randomCard);
			var randomCardIndex = theDeck.indexOf(randomCard);
			theDeck.splice(randomCardIndex, 1);
		} 

		console.log(shuffledDeck);
		return shuffledDeck;
	}

});