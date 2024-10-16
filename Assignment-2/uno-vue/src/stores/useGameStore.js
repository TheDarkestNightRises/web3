// src/stores/useGameStore.js
import { defineStore } from 'pinia';

export const useGameStore = defineStore('game', {
  state: () => ({
    deck: [],
    players: [],
    currentPlayer: 0,
    direction: 1,
    discardPile: [],
    gameOver: false,
  }),
  actions: {
    initializeGame() {
      this.deck = this.createDeck();
      this.players = this.createPlayers(4); // Create 4 players including bots
      this.shuffleDeck();
      this.dealCards();
    },
    createDeck() {
      const colors = ['red', 'green', 'blue', 'yellow'];
      const deck = [];
      for (const color of colors) {
        for (let i = 0; i <= 9; i++) {
          deck.push({ color, value: i.toString() });
          if (i > 0) {
            deck.push({ color, value: i.toString() }); // Add a second card for 1-9
          }
        }
        deck.push({ color, value: 'skip' });
        deck.push({ color, value: 'reverse' });
        deck.push({ color, value: 'draw2' });
      }
      deck.push({ color: 'wild', value: 'wild' });
      deck.push({ color: 'wild', value: 'wild' }); // Two wild cards
      deck.push({ color: 'wild', value: 'draw4' });
      deck.push({ color: 'wild', value: 'draw4' }); // Two draw4 cards
      return deck;
    },
    shuffleDeck() {
      this.deck.sort(() => Math.random() - 0.5);
    },
    createPlayers(num) {
      const players = [];
      for (let i = 0; i < num; i++) {
        players.push({
          id: i,
          hand: [],
          isBot: i > 0, // First player is human, others are bots
        });
      }
      return players;
    },
    dealCards() {
      this.players.forEach((player) => {
        player.hand = this.deck.splice(0, 7);
      });
      this.discardPile.push(this.deck.pop()); // Start discard pile
    },
    playCard(card) {
      const player = this.players[this.currentPlayer];
      const topCard = this.discardPile[this.discardPile.length - 1];

      // Check if the card can be played
      if (
        card.color === topCard.color ||
        card.value === topCard.value ||
        card.color === 'wild'
      ) {
        // Play the card
        this.discardPile.push(card);
        player.hand = player.hand.filter((c) => c !== card);
        this.nextTurn();
      }
    },
    nextTurn() {
      if (this.players[this.currentPlayer].hand.length === 0) {
        this.gameOver = true;
        return;
      }
      this.currentPlayer += this.direction;
      if (this.currentPlayer >= this.players.length) {
        this.currentPlayer = 0;
      } else if (this.currentPlayer < 0) {
        this.currentPlayer = this.players.length - 1;
      }
    },
    actions: {
      // ...existing actions
      botPlay() {
        const player = this.players[this.currentPlayer];
        if (player.isBot) {
          const validCards = player.hand.filter((card) => 
            card.color === this.discardPile[this.discardPile.length - 1].color ||
            card.value === this.discardPile[this.discardPile.length - 1].value ||
            card.color === 'wild'
          );
    
          if (validCards.length > 0) {
            // Play a random valid card
            const cardToPlay = validCards[Math.floor(Math.random() * validCards.length)];
            this.playCard(cardToPlay);
          } else {
            // Draw a card and check if it can be played
            const drawnCard = this.deck.pop();
            player.hand.push(drawnCard);
            if (this.canPlay(drawnCard)) {
              this.playCard(drawnCard);
            } else {
              this.nextTurn();
            }
          }
        }
      },
      canPlay(card) {
        const topCard = this.discardPile[this.discardPile.length - 1];
        return (
          card.color === topCard.color ||
          card.value === topCard.value ||
          card.color === 'wild'
        );
      },
    },    
  },
});
