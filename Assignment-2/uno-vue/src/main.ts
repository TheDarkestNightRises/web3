import { createApp } from 'vue';
import { createPinia } from 'pinia';
import { createRouter, createWebHistory } from 'vue-router';
import App from './App.vue'; 
import GameSetup from './components/GameSetup.vue'; 
import GameComponent from './components/GameComponent.vue';

const routes = [
  { path: '/', component: GameSetup, name: 'GameSetup' },
  { path: '/play', component: GameComponent, name: 'GameComponent' } 
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

const app = createApp(App);
app.use(router);
app.use(createPinia())

app.mount('#app');
