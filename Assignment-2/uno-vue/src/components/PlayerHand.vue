<!-- PlayerHand.vue -->
<template>
  <div class="player-hand" v-if="showHand">
    <Card 
      v-for="(card, index) in playerHand" 
      :key="index" 
      :card="card" 
      :isFaceUp="true" 
      :onClick="playCard"
    />
  </div>
</template>

<script>
import { useGameStore } from '../stores/game';
import { computed } from 'vue';
import Card from './Card.vue';

export default {
  name: 'PlayerHand',
  components: { Card },
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

    const playCard = (card) => {
      gameStore.playCard(props.playerIndex, card);
    };

    return {
      playerHand,
      playCard,
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
  height: 100px;
}
</style>
