<template>
  <div class="deck" @click="drawCard">
    <div 
      class="card" 
      v-for="(card, index) in stackedCards" 
      :key="index" 
      :style="getCardStyle(index)"
    >
    </div>
  </div>
</template>

<script>
import { computed } from 'vue';
import { useGameStore } from '../stores/game'; 

export default {
  name: 'Deck',
  setup() {
    const gameStore = useGameStore();

    const stackedCards = computed(() => {
      return gameStore.deck.length > 0 ? gameStore.deck : []; 
    });

    const drawCard = () => {
      if (stackedCards.value.length > 0) {
        gameStore.drawCard(gameStore.currentPlayer); 
      }
    };

    const getCardStyle = (index) => {
      return {
        backgroundImage: 'url(/images/cards/background.png)',
      };
    };

    return {
      stackedCards,
      drawCard,
      getCardStyle,
    };
  },
};
</script>

