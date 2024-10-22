<template>
    <div class="current-card" :style="{ backgroundImage: `url(${getCardImage(currentCard)})` }"></div>
  </template>
  
  <script>
  import { computed } from 'vue';
  import { useGameStore } from '../stores/game';
  
  export default {
    setup() {
      const gameStore = useGameStore();
  
      const currentCard = computed(() => {
        return gameStore.discardPile[gameStore.discardPile.length - 1]; 
      });
  
      const getCardImage = (card) => {
        if (!card) return '';
        return `/images/cards/${card.color}_${card.value}.png`;
      };
  
      return {
        currentCard,
        getCardImage,
      };
    },
  };
  </script>
  
  <style scoped>
  .current-card {
    width: 120px; /* Adjust the size as needed */
    height: 180px; /* Adjust the size as needed */
    background-size: cover;
    background-position: center;
    margin: 0 auto;
    position: absolute;
    top: 50%;
    left: 50%; /* Center horizontally */
    transform: translate(-50%, -50%); /* Center vertically */
    z-index: 10; /* Ensure it appears above other elements */
  }
  </style>
  