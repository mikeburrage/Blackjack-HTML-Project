// ---------------------
// ---- To do list -----
// ---------------------
// + Fix layout
// + Add deck spot to layout
// + Only allow he user to enter in a 1 or 10 when an Ace is drawn
// + Splitting the deck
// + Add Betting

var startDeal = 4;
var deckTotal = 52;
var theDeck = [];
var playersHand = [];
var playerIndex = 0;
var dealersHand = [];
var dealerIndex = 0;

var playersDealtTotal = 0;
var dealersDealtTotal = 0;


function setLayoutSize() {

	var jToolkit = java.awt.Toolkit.getDefaultToolkit();
	var jScreenSize = jToolkit.getScreenSize();
	
	screenW = jScreenSize.width;
	screenH = jScreenSize.height;

	var mainDiv = document.getElementById("main_container");
	mainDiv.style.width = screenW;
	mainDiv.style.height = screenH;
	
	/*
	var mainDiv = document.getElementById("main_container");
	mainDiv.style.width = '1100px';
	mainDiv.style.height = '700px';
	mainDiv.style.position = "relative";
	mainDiv.style.backgroundPosition = "50% 50%";
	mainDiv.style.border = "thin solid black";
	*/
}


function createDeck() {

	var text = "";
	var i;
	var counter = 1;
	var faceCounter = 1;
	var face;
	
	for (i = 0; i < deckTotal; i++) {
    
		switch (faceCounter) {
				
			case 1:
				face = "diamonds";
				break;
   			
			case 14:
				face = "spades";
				break;
    
			case 27:
				face = "clubs";
				break;
    
			case 40:
				face = "hearts";
				break;							
		}
	
		faceCounter = faceCounter + 1;
	
		switch (counter) {
				
			case 1:
				theDeck[i] = face + "_ace";
				break;
   			
			case 11:
				theDeck[i] = face + "_jack";
				break;
    
			case 12:
				theDeck[i] = face + "_queen";
				break;
    
			case 13:
				theDeck[i] =  face + "_king";
				counter = 0;
				break;
							
			default: 
				theDeck[i] =  face + "_" + counter;
		}
		counter = counter + 1;
	}
}

function shuffleDeck() {
	
	var temporaryValue;
	var randomIndex;
	
	for (var i = 0; i < theDeck.length; i++) {
	
		randomIndex = Math.floor(Math.random() * (i+1));
		temporaryValue = theDeck[randomIndex];
		theDeck[randomIndex] = theDeck[i]; 
		theDeck[i] = temporaryValue;
	}
}

function startingDeal() {

	for(cardCounter = 0; cardCounter < startDeal; cardCounter++) {
	
		// ---------------------------------------------		
		// ---- The CSS code to position the cards -----
		// ---------------------------------------------
		//var currentCard = document.getElementById('thumb'+ cardCounter).style;
		//currentCard.position = "absolute";
		//currentCard.top = topPos + "px";
		//currentCard.left = leftPos + "px";
		
		// determines if a card goes into the players or dealers hand
		if ((cardCounter == 0) || ((cardCounter % 2) == 0)) {
    
			playersHand[playerIndex] = theDeck[cardCounter];
			playerIndex++;
			
			getTotalOfDealtPlayersCards(theDeck[cardCounter]);
			remove_card(cardCounter);
			
		} else {
		
			dealersHand[dealerIndex] = theDeck[cardCounter];
			dealerIndex++;
			
			getTotalOfDealtDealersCards(theDeck[cardCounter]);
			remove_card(cardCounter);
		}
		
		disablePlayBtn();
		enableHitBtn();
		enableStayBtn();
		
		// Debugger Line
		document.getElementById("dealtCards").innerHTML = "Dealer dealt " + (cardCounter+1) + " cards.";
	}
	
	for(handCounter = 0; handCounter < playersHand.length; handCounter++) {
	
		var cardImg = document.createElement("IMG");
		
		cardImg.setAttribute("src", "cards/" + playersHand[handCounter] + ".png");
		cardImg.setAttribute("height", "150");
		cardImg.setAttribute("width", "100");
		cardImg.setAttribute('id', 'thumb'+ handCounter);
		document.getElementById('player_container').appendChild(cardImg);
	}
	
	for(dealerCounter = 0; dealerCounter < dealersHand.length; dealerCounter++) {
	
		var cardImg = document.createElement("IMG");
		
		cardImg.setAttribute("src", "cards/" + dealersHand[dealerCounter] + ".png");
		cardImg.setAttribute("height", "150");
		cardImg.setAttribute("width", "100");
		cardImg.setAttribute('id', 'thumb'+ dealerCounter);
		document.getElementById('dealer_container').appendChild(cardImg);
	}
	// Debugger Line
	document.getElementById("totalCards").innerHTML = "The total number of cards are :" + theDeck.length + ".";
}

function hit_me() {

	var text = "";
	var i = 0;
	
	text = text + theDeck[i] + "<br>";

		if ((theDeck.length == 0) || ((theDeck.length % 2) == 0)) {
	
			getTotalOfDealtPlayersCards(theDeck[i]);
			
				var playersCardImg = document.createElement("IMG");
		
				playersCardImg.setAttribute("src", "cards/" + theDeck[i] + ".png");
				playersCardImg.setAttribute("height", "150");
				playersCardImg.setAttribute("width", "100");
				//playersCardImg.setAttribute('id', 'thumb' + handCounter);
				document.getElementById('player_container').appendChild(playersCardImg);
			
		} else {
	
			getTotalOfDealtDealersCards(theDeck[i]);
			
				var dealersCardImg = document.createElement("IMG");
		
				dealersCardImg.setAttribute("src", "cards/" + theDeck[i] + ".png");
				dealersCardImg.setAttribute("height", "150");
				dealersCardImg.setAttribute("width", "100");
				//dealersCardImg.setAttribute('id', 'thumb' + handCounter);
				document.getElementById('dealer_container').appendChild(dealersCardImg);
		}
	// Debugger Line
	document.getElementById("theDealtCard").innerHTML = "The dealt card was:" + text;
	remove_card(i);
}

function remove_card(index) {

	theDeck.splice(index, 1);
	// Debugger Line
	document.getElementById("totalCards").innerHTML = "The total number of cards are :" + theDeck.length + ".";
}

function getTotalOfDealtDealersCards(passedCard) {
	
	var underScorcePosition = passedCard.indexOf("_");
	var passedNum = passedCard.substring(underScorcePosition+1, underScorcePosition+2);
	
	if(passedNum == "j" || passedNum == "q" || passedNum == "k"  || passedNum == 1) {
	
		passedNum = 10;
	
	} else if(passedNum == "a") {
	
		//do {
			//only allow he user to enter in a 1 or 11
			var aceOrOne = prompt("Do you want the value of this Ace to be a One or a Eleven?", "");
		
			if (aceOrOne != null && (aceOrOne == 1 || aceOrOne == 11)) {

				passedNum = aceOrOne;
				//break;
			}
		//} while (aceOrOne != 1 || aceOrOne != 11);
	
	}
	
	dealersDealtTotal = dealersDealtTotal + parseInt(passedNum);
	
	if(checkTotal(dealersDealtTotal) == true) {
	
		document.getElementById("moreThan21").innerHTML = "Dealer is bust";
		document.getElementById("winOrLose").innerHTML = "Winner Winner Chicken Dinner";
		disablePlayBtn();
		disableHitBtn();
		disableStayBtn();
		enableResetBtn();
	}
	// Debugger Line
	document.getElementById("totalValueofDealersCards").innerHTML = "The total value of the dealt cards is: " + dealersDealtTotal;
}

function getTotalOfDealtPlayersCards(passedCard) {
	
	var underScorcePosition = passedCard.indexOf("_");
	var passedNum = passedCard.substring(underScorcePosition+1, underScorcePosition+2);
	
	if(passedNum == "a" || passedNum == "j" || passedNum == "q" || passedNum == "k"  || passedNum == 1) {
	
		passedNum = 10;
	}
	
	playersDealtTotal = playersDealtTotal + parseInt(passedNum);
	
	if(checkTotal(playersDealtTotal) == true) {
	
		document.getElementById("moreThan21").innerHTML = "Player is bust";
		document.getElementById("winOrLose").innerHTML = "Sorry you lose, play again?";
		disablePlayBtn();
		disableHitBtn();
		disableStayBtn();
		enableResetBtn();
	}
	// Debugger Line
	document.getElementById("totalValueofPlayersCards").innerHTML = "The total value of the dealt cards is: " + playersDealtTotal;
}

function checkTotal(passedTotal) {

	if(passedTotal > 21) {
	
		return true;
		
	} else {
	
		return false;
	}
}

function disablePlayBtn() {
    
	document.getElementById("playBtn").disabled = true;
}

function enablePlayBtn() {
    
	document.getElementById("playBtn").disabled = false;
}

function disableHitBtn() {
    
	document.getElementById("hitBtn").disabled = true;
}

function enableHitBtn() {
    
	document.getElementById("hitBtn").disabled = false;
}

function disableStayBtn() {
    
	document.getElementById("stayBtn").disabled = true;
}

function enableStayBtn() {
    
	document.getElementById("stayBtn").disabled = false;
}

function disableResetBtn() {
    
	document.getElementById("resetBtn").disabled = true;
}

function enableResetBtn() {
    
	document.getElementById("resetBtn").disabled = false;
}

function clearField() {

	var playerCardImages = document.getElementById('player_container');
	var dealerCardImages = document.getElementById('dealer_container');
	
	
	while (playerCardImages.firstChild) {
		
		playerCardImages.removeChild(playerCardImages.firstChild);
	}
	
	while (dealerCardImages.firstChild) {
		
		dealerCardImages.removeChild(dealerCardImages.firstChild);
	}
}

function resetDebuggerText() {

	document.getElementById("totalCards").innerHTML = "The total number of cards are : " + deckTotal;
	document.getElementById("dealtCards").innerHTML = "Dealer dealt no cards.";
	document.getElementById("theDealtCard").innerHTML = "The dealt card was: Blank";
	document.getElementById("totalValueofDealersCards").innerHTML = "The total value of the dealers dealt cards is: " + dealersDealtTotal;
	document.getElementById("totalValueofPlayersCards").innerHTML = "The total value of the players dealt cards is: " + playersDealtTotal;
}

function resetGame() {

	startDeal = 4;
	deckTotal = 52;
	theDeck = [];
	playersHand = [];
	playerIndex = 0;
	dealersHand = [];
	dealerIndex = 0;
	playersDealtTotal = 0;
	dealersDealtTotal = 0;
	
	createDeck();
	shuffleDeck();
	clearField();
	resetDebuggerText();
	
	enablePlayBtn();
	
	document.getElementById("moreThan21").innerHTML = "";
	document.getElementById("winOrLose").innerHTML = "";
}