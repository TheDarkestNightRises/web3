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
      this.discardPile = []; 
      this.currentPlayer = 0; 
      this.direction = 1;
      this.gameOver = false;
    },

    createDeck(): Card[] {
      const colors: Array<'red' | 'green' | 'blue' | 'yellow'> = ['red', 'green', 'blue', 'yellow'];
      const deck: Card[] = [];

      colors.forEach((color) => {
        for (let i = 0; i <= 9; i++) {
          deck.push({ color, value: i });
          if (i !== 0) {
            deck.push({ color, value: i });
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

    // playCard(playerIndex: number, card: Card) {
    //   this.discardPile.push(card);
    //   this.players[playerIndex].hand = this.players[playerIndex].hand.filter(c => c !== card);
    // },

    // drawCard(playerIndex: number) {
    //   if (this.deck.length === 0) {
    //     this.reshuffleDiscardPile();
    //   }
    //   const card = this.deck.pop();
    //   if (card) {
    //     this.players[playerIndex].hand.push(card);
    //   }
    // },

    // reshuffleDiscardPile() {
    //   const lastCard = this.discardPile.pop(); 
    //   this.deck = this.discardPile;
    //   this.shuffleDeck();
    //   this.discardPile = lastCard ? [lastCard] : [];
    // },
  },
});
