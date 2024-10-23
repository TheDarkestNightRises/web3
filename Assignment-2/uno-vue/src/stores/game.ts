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
      return !topCard || 
             card.color === topCard.color || 
             card.value === topCard.value || 
             card.color === 'wild';
    },

    getValidCards(playerIndex: number): Card[] {
      const player = this.players[playerIndex];
      return player.hand.filter(this.isCardValid);
    },

    handleSpecialCard(card: Card) {
      console.log(`Handling special card: ${JSON.stringify(card)}`);
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
          break;
      }
    },

    skipNextPlayer() {
      console.log(`Skipping turn of the next player.`);
      this.currentPlayer += this.direction; // Skip the next player
      this.normalizeCurrentPlayer();
    },

    reverseDirection() {
      this.direction *= -1;
      console.log(`Direction reversed. Current direction: ${this.direction}`);
    },

    drawCardsForNextPlayer(count: number) {
      this.currentPlayer += this.direction;
      this.normalizeCurrentPlayer();

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
      const colors: Array<'red' | 'green' | 'blue' | 'yellow'> = ['red', 'green', 'blue', 'yellow'];
      const randomColor = colors[Math.floor(Math.random() * colors.length)];
      card.color = randomColor;
    },

    normalizeCurrentPlayer() {
      if (this.currentPlayer >= this.players.length) {
        this.currentPlayer = 0;
      } else if (this.currentPlayer < 0) {
        this.currentPlayer = this.players.length - 1;
      }
      console.log(`Current player is now: ${this.players[this.currentPlayer].name}`);
    },

    playCard(playerIndex: number, card: Card) {
      if (this.isCardValid(card)) {
        const player = this.players[playerIndex];
        player.hand = player.hand.filter(c => c !== card); // Remove the card from player's hand
        this.discardPile.push(card); // Add the card to the discard pile
        console.log(`${player.name} played a card: ${JSON.stringify(card)}`);
        this.handleSpecialCard(card); // Handle any special actions
        this.nextPlayer();
      } else {
        console.log(`Invalid card played by ${playerIndex}: ${JSON.stringify(card)}`);
      }
    },

    nextPlayer() {
      this.currentPlayer += this.direction;
      this.normalizeCurrentPlayer();
      if (this.players[this.currentPlayer].isBot) {
        this.botPlayCard(); // If the next player is a bot, let it play
      }
    },

    botPlayCard() {
      const bot = this.players[this.currentPlayer];
      const validCards = this.getValidCards(this.currentPlayer);

      if (validCards.length > 0) {
        const randomCard = validCards[Math.floor(Math.random() * validCards.length)];
        this.playCard(this.currentPlayer, randomCard);
      } else {
        this.drawCardForPlayer(this.currentPlayer);
      }
    },

    drawCardForPlayer(playerIndex: number) {
      const player = this.players[playerIndex];
      const card = this.deck.pop();
      if (card) {
        player.hand.push(card);
        console.log(`${player.name} drew a card: ${JSON.stringify(card)}`);
      }
      this.nextPlayer(); // Proceed to the next player
    },

    createDeck(): Card[] {
      const colors: Array<'red' | 'green' | 'blue' | 'yellow'> = ['red', 'green', 'blue', 'yellow'];
      const deck: Card[] = [];

      colors.forEach((color) => {
        for (let i = 0; i <= 9; i++) {
          deck.push({ color, value: i });
          if (i !== 0) {
            deck.push({ color, value: i }); // Two of each number except 0
          }
        }
        ['skip', 'reverse', '+2'].forEach((action) => {
          deck.push({ color, value: action as 'skip' | 'reverse' | '+2' });
          deck.push({ color, value: action as 'skip' | 'reverse' | '+2' });
        });
      });

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
      this.gameOver = true;
    },
  },
});
