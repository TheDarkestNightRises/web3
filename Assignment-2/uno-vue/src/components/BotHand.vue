<template>
    <div class="bot-hand" v-if="showHand">
      <div
        v-for="(card, index) in botHand"
        :key="index"
        class="card"
        :style="{ backgroundImage: `url(${backImage})` }" 
      >
      </div>
    </div>
  </template>
  
  <script>
  import { useGameStore } from '../stores/game'; 
  import { computed } from 'vue';
  
  export default {
    name: 'BotHand',
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
  
      const botHand = computed(() => {
        const players = gameStore.players;
        return players && players[props.playerIndex] ? players[props.playerIndex].hand : [];
      });
  
      const backImage = '/images/cards/background.png'; 
  
      return {
        botHand,
        backImage,
      };
    },
  };
  </script>
  
  <style scoped>
  .bot-hand {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 10px;
    height: 100px; 
  }
  .card {
    width: 80px;
    height: 120px; 
    background-size: cover;
    background-position: center;
    margin: 0 5px;
  }
  </style>
  