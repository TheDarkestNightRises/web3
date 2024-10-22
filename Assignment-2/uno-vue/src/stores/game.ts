import { defineStore } from 'pinia';

// Define types for cards, players, and state
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
      this.deck = this.createDeck();
      this.shuffleDeck();
      this.players = this.createPlayers(numBots);
      this.dealCards();
      this.setInitialCard(); // Call the method to set the initial card
      this.currentPlayer = 0;
      this.direction = 1;
      this.gameOver = false;
    },

    setInitialCard() {
      let initialCard;

      // Draw until a non-wild card is found
      do {
        initialCard = this.deck.pop(); // Get the top card from the deck
      } while (initialCard && (initialCard.color === 'wild' || initialCard.value === 'wild'));

      // Place it on the discard pile if it's valid
      if (initialCard) {
        this.discardPile.push(initialCard);
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

      return deck;
    },

    shuffleDeck() {
      for (let i = this.deck.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [this.deck[i], this.deck[j]] = [this.deck[j], this.deck[i]];
      }
    },

    createPlayers(numBots: number): Player[] {
      const players: Player[] = [{ name: 'Player 1', hand: [], isBot: false }];
      for (let i = 0; i < numBots; i++) {
        players.push({ name: `Bot ${i + 1}`, hand: [], isBot: true });
      }
      return players;
    },

    dealCards() {
      const numCards = 7;
      this.players.forEach((player) => {
        for (let i = 0; i < numCards; i++) {
          player.hand.push(this.deck.pop()!);
        }
      });
    },
    
    // Additional methods for game play can be implemented here
  },
});
