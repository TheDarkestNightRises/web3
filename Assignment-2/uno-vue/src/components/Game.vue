<template>
    <div>
      <h1>Uno Game</h1>
      <div v-if="!gameOver">
        <h2>Current Player: {{ currentPlayer.id }}</h2>
        <h3>Discard Pile: {{ discardPile[discardPile.length - 1]?.color }} {{ discardPile[discardPile.length - 1]?.value }}</h3>
        <Hand :cards="currentPlayer.hand" @playCard="playCard" />
      </div>
      <div v-else>
        <h2>Game Over! Player {{ currentPlayer.id }} wins!</h2>
      </div>
    </div>
  </template>
  
  <script>
  import { useGameStore } from '../stores/useGameStore';
  import Hand from './Hand.vue';
  
  export default {
    components: {
      Hand,
    },
    setup() {
      const store = useGameStore();
      store.initializeGame();
  
      return {
        store,
        currentPlayer: computed(() => store.players[store.currentPlayer]),
        discardPile: computed(() => store.discardPile),
        gameOver: computed(() => store.gameOver),
        playCard: store.playCard,
      };
    },
  };
  </script>
  
  <style scoped>
  /* Add your styles here */
  </style>
  