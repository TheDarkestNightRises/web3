<template>
    <div class="deck" v-if="deck.length > 0">
      <div class="card-container">
        <div
          v-for="(card, index) in limitedDeck"
          :key="index"
          class="uno-card"
          :style="{ 
            backgroundImage: `url('/images/cards/background.png')`,
            backgroundSize: 'cover',
            top: `${index * -2.4}px` 
          }"
        ></div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { computed } from 'vue';
  import { useGameStore } from '@/stores/game'; 
  
  const store = useGameStore();
  const deck = computed(() => store.deck);
  
  const limitedDeck = computed(() => deck.value.slice(0, 12));
  </script>
  
  <style scoped>
  .deck {
    position: fixed;
    right: 20px; 
    top: 50%;
    transform: translateY(-50%);
    height: 280px; 
    width: 180px;
  }
  
  .card-container {
    position: relative; 
    height: 100%; 
  }
  
  .uno-card {
    position: absolute;
    left: 50%; 
    transform: translateX(-50%); 
    height: 180px; 
    width: 120px; 
    border-radius: 10px; 
    border: 2px solid #eae6e7; 
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
    transition: transform 0.2s; 
    background-color: transparent; 
  }
  
  .uno-card:hover {
    transform: translateX(-50%) scale(1.05); 
  }
  
  </style>
  