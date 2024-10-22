<template>
    <div class="game-container">
      <CurrentCard />
  
      <div class="player-bottom">
        <PlayerHand :playerIndex="0" />
      </div>
  
      <div class="player-top">
        <BotHand :playerIndex="1" />
      </div>
  
      <div class="player-left">
        <BotHand :playerIndex="2" vertical />
      </div>
  
      <div class="player-right">
        <BotHand :playerIndex="3" vertical />
      </div>
  
      <Deck />
    </div>
  </template>
  
  <script>
  import PlayerHand from './PlayerHand.vue'; // Import PlayerHand component
  import BotHand from './BotHand.vue'; // Import BotHand component
  import CurrentCard from './CurrentCard.vue'; // Import CurrentCard component
  import Deck from './Deck.vue'; // Import Deck component
  
  export default {
    components: {
      PlayerHand,
      BotHand,
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
  