<!-- Card.vue -->
<template>
    <div 
      class="card" 
      @click="handleClick" 
      :style="{ backgroundImage: `url(${cardImage})` }"
    >
    </div>
  </template>
  
  <script>
  export default {
    name: 'Card',
    props: {
      card: {
        type: Object,
        required: true,
      },
      isFaceUp: {
        type: Boolean,
        default: false,
      },
      backImage: {
        type: String,
        default: '/images/cards/background.png',
      },
      onClick: {
        type: Function,
        default: null,
      },
    },
    computed: {
      cardImage() {
        return this.isFaceUp 
          ? `/images/cards/${this.card.color}_${this.card.value}.png` 
          : this.backImage;
      },
    },
    methods: {
      handleClick() {
        if (this.onClick) {
          this.onClick(this.card);
        }
      },
    },
  };
  </script>
  
  <style scoped>
  .card {
    width: 80px;
    height: 120px;
    background-size: cover;
    background-position: center;
    margin: 0 5px;
    transition: transform 0.3s ease, box-shadow 0.3s ease;
  }
  
  .card:hover {
    transform: translateY(-20px);
    box-shadow: 0px 8px 15px rgba(0, 0, 0, 0.3);
  }
  </style>
  