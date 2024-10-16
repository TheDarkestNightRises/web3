<template>
  <div id="app">
    <header>
      <h1>Uno Game</h1>
    </header>
    <main>
      <div class="game-area">
        <Game />
      </div>
      <div v-if="gameOver" class="game-over">
        <h2>Game Over!</h2>
        <p>Player {{ winningPlayer }} wins!</p>
        <button @click="restartGame">Play Again</button>
      </div>
    </main>
  </div>
</template>

<script>
import Game from './components/Game.vue';
import { useGameStore } from './stores/useGameStore';
import { computed } from 'vue';

export default {
  components: {
    Game,
  },
  setup() {
    const store = useGameStore();
    const gameOver = computed(() => store.gameOver);
    const winningPlayer = computed(() => {
      return store.players.find(player => player.hand.length === 0)?.id;
    });

    const restartGame = () => {
      store.initializeGame();
    };

    return {
      gameOver,
      winningPlayer,
      restartGame,
    };
  },
};
</script>

<style scoped>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  text-align: center;
  background-color: #f4f4f4;
  min-height: 100vh;
  padding: 20px;
}

header {
  background: #ffcc00;
  padding: 10px;
  border-radius: 5px;
}

h1 {
  margin: 0;
}

.game-area {
  margin: 20px 0;
  border: 1px solid #ccc;
  border-radius: 10px;
  padding: 20px;
  background-color: white;
}

.game-over {
  background-color: #ff6666;
  color: white;
  padding: 20px;
  border-radius: 10px;
}

button {
  background-color: #4CAF50;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

button:hover {
  background-color: #45a049;
}
</style>
