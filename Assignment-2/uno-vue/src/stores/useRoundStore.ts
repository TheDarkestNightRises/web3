// stores/roundStore.ts
import { defineStore } from 'pinia';
import { useDeckStore } from './useDeckStore';

export const useRoundStore = defineStore('roundStore', {
    state: () => ({
        round: new UnoRound(useDeckStore().deck), 
    }),
    actions: {
        startRound(): void { 
            this.round.startRound();
        },
        nextPlayer(): void { 
            this.round.nextPlayer();
        },
        setPlayers(players: Player[]): void { 
            this.round.players = players;
        },
    },
});
