<!-- BotHand.vue -->
<template>
  <div class="bot-hand" v-if="showHand">
    <Card 
      v-for="(card, index) in botHand" 
      :key="index" 
      :card="card" 
      :isFaceUp="true"
    />
  </div>
</template>

<script>
import { useGameStore } from '../stores/game';
import { computed } from 'vue';
import Card from './Card.vue';

export default {
  name: 'BotHand',
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

    const botHand = computed(() => {
      const players = gameStore.players;
      return players && players[props.playerIndex] ? players[props.playerIndex].hand : [];
    });

    return {
      botHand,
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
</style>
