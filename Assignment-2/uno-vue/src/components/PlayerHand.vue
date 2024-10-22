<template>
    <div class="player-hand">
      <div 
        v-for="(card, index) in playerHand" 
        :key="index" 
        class="card" 
        @click="playCard(card)"
        :style="{ backgroundImage: `url(${getCardImage(card)})` }"
      >
      </div>
    </div>
  </template>
  
  <script>
  import { useGameStore } from '../stores/game'; 
  import { computed } from 'vue';
  
  export default {
    name: 'PlayerHand',
    setup() {
      const gameStore = useGameStore();
  
      const playerHand = computed(() => gameStore.players[gameStore.currentPlayer].hand);
  
      const getCardImage = (card) => {
        return `/images/cards/${card.color}_${card.value}.png`;  
      };

      // Play a card
      const playCard = (card) => {
        gameStore.playCard(gameStore.currentPlayer, card);
      };
  
      return {
        playerHand,
        playCard,
        getCardImage, 
      };
    }
  };
  </script>
  
  <style scoped>
  .player-hand {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 20px;
    background-color: #f5f5f5;
    height: 150px;
    position: absolute;
    bottom: 0;
    width: 100%;
  }
  
  .card {
    width: 80px;
    height: 120px;
    background-size: cover;
    background-position: center;
    margin: 0 5px;
    transition: transform 0.3s ease, box-shadow 0.3s ease;
  }
  
  .card:hover {
    transform: translateY(-20px);
    box-shadow: 0px 8px 15px rgba(0, 0, 0, 0.3);
  }
  </style>
  