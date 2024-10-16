interface Round {
    players: Player[];
    currentPlayerIndex: number;
    deck: Deck;
    currentCard: Card | null;
    startRound(): void;
    nextPlayer(): void;
    //Add direction
}

class UnoRound implements Round {
    players: Player[] = [];
    currentPlayerIndex = 0;
    deck: Deck;
    currentCard: Card | null = null;

    constructor(deck: Deck) {
        this.deck = deck;
    }

    startRound() {
        this.currentCard = this.deck.drawCard();
    }

    nextPlayer() {
        this.currentPlayerIndex = (this.currentPlayerIndex + 1) % this.players.length;
    }
}
