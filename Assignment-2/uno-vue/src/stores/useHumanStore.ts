import { defineStore } from 'pinia';

export const useHumanPlayerStore = defineStore('humanPlayerStore', {
    state: () => ({
        player: new HumanPlayer(1), 
    }),
    actions: {
        addCard(card: Card): void {
            this.player.hand.push(card);
        },
        playCard(card: Card): void {
            const cardIndex = this.player.hand.findIndex(c => c === card);
            if (cardIndex !== -1) {
                this.player.playCard(card);
                this.player.hand.splice(cardIndex, 1); 
            } else {
                throw new Error("Card not found in hand.");
            }
        },
        hasUno(): boolean {
            return this.player.hand.length === 1;
        },
        resetHand(): void {
            this.player.hand = [];
        },
    },
});
