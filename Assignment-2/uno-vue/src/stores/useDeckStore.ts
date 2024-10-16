// stores/deckStore.ts
import { defineStore } from 'pinia';

export const useDeckStore = defineStore('deckStore', {
    state: () => ({
        deck: new UnoDeck(),
    }),
    actions: {
        drawCard(): Card {  
            return this.deck.drawCard();
        },
        discardCard(card: Card): void { 
            this.deck.discard(card);
        },
        shuffleDeck(): void {  
            this.deck.shuffle();
        },
        resetDeck(): void {  
            this.deck.resetDeck();
        },
        getTopDiscard(): Card {  
            return this.deck.getTopDiscard();
        },
    },
});
