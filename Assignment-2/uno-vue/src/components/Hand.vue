<template>
    <div>
      <h3>Your Hand:</h3>
      <div v-for="card in cards" :key="card.color + card.value" @click="play(card)">
        <span :style="{ color: card.color }">{{ card.value }}</span>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      cards: Array,
    },
    methods: {
      play(card) {
        this.$emit('playCard', card);
      },
    },
  };
  </script>
  
  <style scoped>
  /* Add your styles here */
  </style>
  