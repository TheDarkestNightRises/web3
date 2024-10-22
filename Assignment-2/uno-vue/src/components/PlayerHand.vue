<template>
    <div class="player-hand" v-if="showHand">
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
    props: {
      playerIndex: {
        type: Number,
        required: true,
      },
      showHand: {
        type: Boolean,
        default: true,
      },
    },
    setup(props) {
      const gameStore = useGameStore();
  
      const playerHand = computed(() => {
        const players = gameStore.players;
        return players && players[props.playerIndex] ? players[props.playerIndex].hand : [];
      });
  
      const getCardImage = (card) => {
        return card ? `/images/cards/${card.color}_${card.value}.png` : '';
      };
  
      const playCard = (card) => {
        gameStore.playCard(props.playerIndex, card);
      };
  
      return {
        playerHand,
        playCard,
        getCardImage, 
      };
    },
  };
  </script>
  
  <style scoped>
  .player-hand {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 10px;
    height: 100px; /* Adjust height for visual spacing */
  }
  .card {
    width: 80px; /* Adjust the size as needed */
    height: 120px; /* Adjust the size as needed */
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
  