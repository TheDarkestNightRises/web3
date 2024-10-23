import { defineStore } from 'pinia';

type Card = {
  color: 'red' | 'green' | 'blue' | 'yellow' | 'wild';
  value: number | 'skip' | 'reverse' | '+2' | 'wild' | '+4';
};

type Player = {
  name: string;
  hand: Card[];
  isBot: boolean;
};

type GameState = {
  deck: Card[];
  players: Player[];
  currentPlayer: number;
  direction: 1 | -1;
  discardPile: Card[];
  gameOver: boolean;
  scores: Record<string, number>;
};

export const useGameStore = defineStore('game', {
  state: (): GameState => ({
    deck: [],
    players: [],
    currentPlayer: 0,
    direction: 1,
    discardPile: [],
    gameOver: false,
    scores: {},
  }),

  actions: {
    initializeGame(numBots: number) {
      console.log(`Initializing game with ${numBots} bots.`);
      this.deck = this.createDeck();
      this.shuffleDeck();
      this.players = this.createPlayers(numBots);
      this.dealCards();
      this.setInitialCard();
      this.currentPlayer = 0;
      this.direction = 1;
      this.gameOver = false;
    },

    setInitialCard() {
      let initialCard: Card | undefined;

      do {
        initialCard = this.deck.pop();
      } while (initialCard && (initialCard.color === 'wild' || initialCard.value === 'wild'));

      if (initialCard) {
        this.discardPile.push(initialCard);
        console.log(`Initial card set: ${JSON.stringify(initialCard)}`);
      }
    },

    isCardValid(card: Card): boolean {
      const topCard = this.discardPile[this.discardPile.length - 1];
      const isValid = !topCard || 
        card.color === topCard.color || 
        card.value === topCard.value || 
        card.color === 'wild';
      return isValid;
    },

    getValidCards(playerIndex: number): Card[] {
      const player = this.players[playerIndex];
      const validCards = player.hand.filter(this.isCardValid);
      console.log(`${player.name} has valid cards: ${JSON.stringify(validCards)}`);
      return validCards;
    },

    playCard(playerIndex: number, card: Card) {
      const player = this.players[playerIndex];

      // Check if the selected card is valid
      if (!this.isCardValid(card)) {
        console.log(`${player.name} attempted to play an invalid card: ${JSON.stringify(card)}`);
        return; // Invalid play, exit the function
      }

      // Remove the card from the player's hand and add it to the discard pile
      const cardIndex = player.hand.findIndex((c) => c === card);
      if (cardIndex !== -1) {
        player.hand.splice(cardIndex, 1);
        this.discardPile.push(card);
        console.log(`${player.name} played: ${JSON.stringify(card)}`);
        this.handleSpecialCard(card);

        // Check for a win condition
        if (player.hand.length === 0) {
          this.endGame(player.name);
        } else {
          this.changeTurn(); // Proceed to the next player's turn
        }
      }
    },

    drawCardForPlayer(playerIndex: number) {
      const player = this.players[playerIndex];
      const drawnCard = this.deck.pop();

      if (drawnCard) {
        player.hand.push(drawnCard);
        console.log(`${player.name} drew a card: ${JSON.stringify(drawnCard)}`);

        // If the drawn card is valid, let the player play it
        if (this.isCardValid(drawnCard)) {
          this.playCard(playerIndex, drawnCard);
        } else {
          this.changeTurn(); // If not valid, end their turn
        }
      } else {
        console.log("No cards left to draw.");
        this.changeTurn(); // No cards left to draw, end the turn
      }
    },

    handleSpecialCard(card: Card) {
      console.log(`Handling special card: ${JSON.stringify(card)}`); // Log the special card being handled
      switch (card.value) {
        case 'skip':
          this.skipNextPlayer();
          break;
        case 'reverse':
          this.reverseDirection();
          break;
        case '+2':
          this.drawCardsForNextPlayer(2);
          break;
        case '+4':
          this.drawCardsForNextPlayer(4);
          break;
        case 'wild':
          this.changeColor(card);
          console.log(`Wild card played, color changed to: ${card.color}`); // Log the color change for the wild card
          break;
      }
    },

    skipNextPlayer() {
      console.log(`Skipping the next player.`);
      this.currentPlayer += this.direction;
      if (this.currentPlayer >= this.players.length) {
        this.currentPlayer = 0;
      } else if (this.currentPlayer < 0) {
        this.currentPlayer = this.players.length - 1;
      }
    },

    reverseDirection() {
      this.direction *= -1;
      console.log(`Direction reversed. Current direction: ${this.direction}`);
    },

    drawCardsForNextPlayer(count: number) {
      console.log(`Drawing ${count} cards for the next player.`);
      this.currentPlayer += this.direction;
      if (this.currentPlayer >= this.players.length) {
        this.currentPlayer = 0;
      } else if (this.currentPlayer < 0) {
        this.currentPlayer = this.players.length - 1;
      }

      const nextPlayer = this.players[this.currentPlayer];
      for (let i = 0; i < count; i++) {
        const card = this.deck.pop();
        if (card) {
          nextPlayer.hand.push(card);
          console.log(`${nextPlayer.name} drew a card: ${JSON.stringify(card)}`);
        }
      }
    },

    changeColor(card: Card) {
      // Change this for the player to choose a color
      const colors: Array<'red' | 'green' | 'blue' | 'yellow'> = ['red', 'green', 'blue', 'yellow'];
      const randomColor = colors[Math.floor(Math.random() * colors.length)];
      card.color = randomColor; // Set a random color for the wild card
    },

    replenishDeck() {
      if (this.discardPile.length > 1) {
        const topCard = this.discardPile.pop();
        this.deck = [...this.discardPile];
        this.discardPile = [topCard!];
        this.shuffleDeck();
        console.log(`Deck replenished from discard pile. New deck size: ${this.deck.length}`);
      } else {
        console.log("No cards left in discard pile to replenish the deck.");
      }
    },

    changeTurn() {
      console.log(`Changing turn. Current player index: ${this.currentPlayer}`);
      // Check for valid cards before changing the turn
      const currentPlayer = this.players[this.currentPlayer];

      if (currentPlayer.isBot) {
        this.botPlayCard();
      } else {
        const validCards = this.getValidCards(this.currentPlayer);

        // If no valid cards, the player must draw a card
        if (validCards.length === 0) {
          this.drawCardForPlayer(this.currentPlayer);
        } else {
          // Optionally, you could show valid cards to the player here
          console.log(`${currentPlayer.name}, it's your turn. You have valid cards to play.`);
        }
      }

      // Move to the next player
      this.currentPlayer += this.direction;
      if (this.currentPlayer >= this.players.length) {
        this.currentPlayer = 0;
      } else if (this.currentPlayer < 0) {
        this.currentPlayer = this.players.length - 1;
      }
      console.log(`Next player is: ${this.players[this.currentPlayer].name}`);
    },

    botPlayCard() {
      const bot = this.players[this.currentPlayer];
      const validCards = this.getValidCards(this.currentPlayer); // Get valid cards for the bot

      if (validCards.length > 0) {
        const randomCard = validCards[Math.floor(Math.random() * validCards.length)];
        console.log(`${bot.name} is playing: ${JSON.stringify(randomCard)}`); // Log the card the bot is playing
        this.playCard(this.currentPlayer, randomCard);
      } else {
        this.drawCardForPlayer(this.currentPlayer); // If no valid cards, draw a card
      }
    },

    createDeck(): Card[] {
      const colors: Array<'red' | 'green' | 'blue' | 'yellow'> = ['red', 'green', 'blue', 'yellow'];
      const deck: Card[] = [];

      // Create number cards
      colors.forEach((color) => {
        for (let i = 0; i <= 9; i++) {
          deck.push({ color, value: i });
          if (i !== 0) {
            deck.push({ color, value: i }); // Two of each number except 0
          }
        }

        // Create action cards
        ['skip', 'reverse', '+2'].forEach((action) => {
          deck.push({ color, value: action as 'skip' | 'reverse' | '+2' });
          deck.push({ color, value: action as 'skip' | 'reverse' | '+2' });
        });
      });

      // Create wild cards
      for (let i = 0; i < 4; i++) {
        deck.push({ color: 'wild', value: 'wild' });
        deck.push({ color: 'wild', value: '+4' });
      }

      console.log(`Deck created with ${deck.length} cards.`);
      return deck;
    },

    shuffleDeck() {
      for (let i = this.deck.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [this.deck[i], this.deck[j]] = [this.deck[j], this.deck[i]];
      }
      console.log(`Deck shuffled.`);
    },

    createPlayers(numBots: number): Player[] {
      const players: Player[] = [{ name: 'Player 1', hand: [], isBot: false }];
      for (let i = 0; i < numBots; i++) {
        players.push({ name: `Bot ${i + 1}`, hand: [], isBot: true });
      }
      console.log(`Created players: ${JSON.stringify(players)}`);
      return players;
    },

    dealCards() {
      const numCards = 7; // Number of cards dealt to each player
      this.players.forEach((player) => {
        for (let i = 0; i < numCards; i++) {
          const card = this.deck.pop();
          if (card) {
            player.hand.push(card);
            console.log(`${player.name} received a card: ${JSON.stringify(card)}`);
          }
        }
      });
    },

    endGame(winnerName: string) {
      console.log(`${winnerName} wins!`);
      this.gameOver = true; // Mark the game as over
    },
  },
});
