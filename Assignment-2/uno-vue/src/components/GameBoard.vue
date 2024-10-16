<!-- src/components/GameBoard.vue -->
<template>
    <div>
      <h1>UNO Game</h1>
      <div>
        <h2>Your Hand</h2>
        <div class="hand">
          <div v-for="card in playerHand" :key="card.id" @click="playCard(card)">
            {{ card.value }} {{ card.color }}
          </div>
        </div>
      </div>
  
      <div>
        <h2>Current Discard</h2>
        <div>
          <p>{{ topDiscard.color }} {{ topDiscard.value }}</p>
        </div>
      </div>
  
      <div v-if="gameOver">
        <h2>Game Over</h2>
        <button @click="resetGame">Play Again</button>
      </div>
    </div>
  </template>
  
  <script setup>
  import { computed, ref } from 'vue';
  import { useHumanPlayerStore } from '@/stores/humanPlayerStore';
  import { useDeckStore } from '@/stores/deckStore';
  import { useRoundStore } from '@/stores/roundStore';
  
  const humanPlayerStore = useHumanPlayerStore();
  const deckStore = useDeckStore();
  const roundStore = useRoundStore();
  
  const playerHand = computed(() => humanPlayerStore.player.hand);
  const topDiscard = computed(() => deckStore.getTopDiscard());
  const gameOver = ref(false);
  
  const playCard = (card) => {
    try {
      humanPlayerStore.playCard(card);
      if (humanPlayerStore.hasUno()) {
        alert('You have Uno!');
      }
      roundStore.nextPlayer(); // Logic for moving to the next player
    } catch (error) {
      alert(error.message);
    }
  };
  
  const resetGame = () => {
    humanPlayerStore.resetHand(); // Reset the human player's hand
    deckStore.resetDeck(); // Reset the deck
    gameOver.value = false;
  };
  </script>
  
  <style scoped>
  .hand {
    display: flex;
    gap: 10px;
  }
  </style>
  