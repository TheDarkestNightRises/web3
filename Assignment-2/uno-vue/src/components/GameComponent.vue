<template>
    <div class="game-container">
      <CurrentCard />
  
      <!-- Placeholder for Player 1 (bottom) -->
      <div class="player-bottom">
        <PlayerHand :playerIndex="0" />
      </div>
  
      <!-- Placeholder for Player 2 (top) -->
      <div class="player-top">
        <PlayerHand :playerIndex="1" />
      </div>
  
      <!-- Placeholder for Player 3 (left) -->
      <div class="player-left">
        <PlayerHand :playerIndex="2" vertical />
      </div>
  
      <!-- Placeholder for Player 4 (right) -->
      <div class="player-right">
        <PlayerHand :playerIndex="3" vertical />
      </div>
  
      <Deck />
    </div>
  </template>
  
  <script>
  import PlayerHand from './PlayerHand.vue'; // Import PlayerHand component
  import CurrentCard from './CurrentCard.vue'; // Import CurrentCard component
  import Deck from './Deck.vue'; // Import Deck component
  
  export default {
    components: {
      PlayerHand,
      CurrentCard,
      Deck,
    },
  };
  </script>
  
  <style>
  .game-container {
    position: relative;
    width: 100%;
    height: 100vh; /* Full height for positioning */
    display: flex;
    justify-content: center;
    align-items: center;
  }
  
  .player-bottom {
    position: absolute;
    bottom: 10px; /* Position player 1 at the bottom */
    left: 50%;
    transform: translateX(-50%);
  }
  
  .player-top {
    position: absolute;
    top: 10px; /* Position player 2 at the top */
    left: 50%;
    transform: translateX(-50%);
  }
  
  .player-left {
    position: absolute;
    top: 50%;
    left: 10px; /* Adjust as necessary */
    transform: translateY(-50%);
  }
  
  .player-right {
    position: absolute;
    top: 50%;
    right: 10px; /* Adjust as necessary */
    transform: translateY(-50%);
  }
  
  .current-card {
    width: 120px; 
    height: 180px; 
    background-size: cover;
    background-position: center;
    margin: 0 auto;
    position: absolute;
    top: 50%;
    left: 50%; 
    transform: translate(-50%, -50%); 
    z-index: 10; 
  }
  </style>
  