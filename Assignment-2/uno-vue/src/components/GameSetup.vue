<template>
    <div>
      <h1>Uno Game Setup</h1>
      <label for="numBots">Number of bots:</label>
      <select v-model="numBots">
        <option value="1">1</option>
        <option value="2">2</option>
        <option value="3">3</option>
      </select>
      <button @click="startGame">Start Game</button>
    </div>
  </template>
  
  <script>
  import { ref } from 'vue'; 
  import { useGameStore } from '../stores/game'; 
  import { useRouter } from 'vue-router';
  
  export default {
    setup() {
      const numBots = ref(1); 
      const gameStore = useGameStore(); 
      const router = useRouter(); 
  
      const startGame = () => {
        gameStore.initializeGame(numBots.value); 
        router.push({ name: 'GameComponent' }); 
      };
  
      return {
        numBots,
        startGame 
      };
    }
  };
  </script>
  