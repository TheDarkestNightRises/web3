<template>
    <div>
      <h1>Uno Game Setup</h1>
      <button @click="startGame">Start Game</button>
    </div>
  </template>
  
  <script setup>
  import { useRoundStore } from '@/stores/roundStore';
  
  const roundStore = useRoundStore();
  
  const startGame = () => {
    roundStore.setPlayers([/* Initialize players here */]); // Add Human and Bot players
    roundStore.startRound(); // Start the round
  };
  </script>
  
  <style scoped>
  /* Add styles here */
  </style>
  