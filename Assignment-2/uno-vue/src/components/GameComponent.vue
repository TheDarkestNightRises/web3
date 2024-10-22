<template>
    <div>
      <h1>Uno Game</h1>
      <CurrentCard />
      <PlayerHand />
      <Deck />
    </div>
  </template>
  
  <script>
  import PlayerHand from './PlayerHand.vue';
  import Deck from './Deck.vue';
  import CurrentCard from './CurrentCard.vue'; // Import CurrentCard component
  
  export default {
    components: {
      PlayerHand,
      Deck,
      CurrentCard, // Register the component
    },
  };
  </script>
  
  <style>
  /* Add any additional styles if necessary */
  </style>
  