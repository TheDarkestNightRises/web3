interface Player {
    id: number;
    hand: Card[];
    hasUno: boolean;
    playCard(card: Card): void;
}

class Bot implements Player {
    id: number;
    hand: Card[] = [];
    hasUno = false;

    constructor(id: number) {
        this.id = id;
    }

    playCard(card: Card) {

    }
}


class HumanPlayer implements Player {
    id: number;
    hand: Card[] = [];
    hasUno = false;

    constructor(id: number) {
        this.id = id;
    }

    playCard(card: Card): void {
        const cardIndex = this.hand.findIndex(c => c === card);
        if (cardIndex !== -1) {
            this.hand.splice(cardIndex, 1); 
        } else {
            throw new Error("Card not in hand.");
        }
    }

    checkUno(): boolean {
        return this.hand.length === 1;
    }

    resetHand(): void {
        this.hand = [];
    }
}
