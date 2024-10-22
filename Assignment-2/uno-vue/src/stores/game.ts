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
      let initialCard;

      do {
        initialCard = this.deck.pop(); 
      } while (initialCard && (initialCard.color === 'wild' || initialCard.value === 'wild'));

      if (initialCard) {
        this.discardPile.push(initialCard);
      }
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

    isCardValid(card: Card): boolean {
      const topCard = this.discardPile[this.discardPile.length - 1];
      return (
        !topCard ||
        card.color === topCard.color ||
        card.value === topCard.value ||
        card.color === 'wild'
      );
    },

    playCard(playerIndex: number, card: Card) {
      if (this.isCardValid(card)) {
        const player = this.players[playerIndex];
        const cardIndex = player.hand.findIndex((c) => c === card);

        if (cardIndex !== -1) {
          player.hand.splice(cardIndex, 1); 
          this.discardPile.push(card); 

          this.changeTurn();
        }
      }
    },

    changeTurn() {
      this.currentPlayer += this.direction;
      if (this.currentPlayer >= this.players.length) {
        this.currentPlayer = 0;
      } else if (this.currentPlayer < 0) {
        this.currentPlayer = this.players.length - 1;
      }

      if (this.players[this.currentPlayer].isBot) {
        this.botPlayCard();
      }
    },

    botPlayCard() {
      const bot = this.players[this.currentPlayer];
      const validCards = bot.hand.filter(this.isCardValid);

      if (validCards.length > 0) {
        const randomCard = validCards[Math.floor(Math.random() * validCards.length)];
        this.playCard(this.currentPlayer, randomCard);
      } else {
        this.changeTurn();
      }
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

  },
});
