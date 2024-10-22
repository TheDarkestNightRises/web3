<template>
    <div>
      <h1>Uno Game</h1>
      <PlayerHand />
      <Deck />
    </div>
  </template>
  
  <script>
  import PlayerHand from './PlayerHand.vue'; 
  import Deck from './Deck.vue'; 
  
  export default {
    components: {
      PlayerHand,
      Deck,
    },
  };
  </script>
  
  <style>
  </style>
  