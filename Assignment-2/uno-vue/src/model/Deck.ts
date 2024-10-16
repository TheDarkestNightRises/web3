interface Deck {
    drawCard(): Card;
    discard(card: Card): void;
    shuffle(): void;
    resetDeck(): void;
    getTopDiscard(): Card;
}

class UnoDeck implements Deck {
    private drawPile: Card[] = [];
    private discardPile: Card[] = [];

    constructor() {
        this.initializeDeck();
        this.shuffle();
    }

    private initializeDeck() {
        const colors = [CardColor.Red, CardColor.Yellow, CardColor.Green, CardColor.Blue];
        const specialCards = [CardType.Skip, CardType.Reverse, CardType.Draw2];

        // Add number cards 0-9 (each twice except 0, which is once per color)
        for (const color of colors) {
            this.drawPile.push({ color, type: CardType.Number, value: 0 });
            for (let i = 1; i <= 9; i++) {
                this.drawPile.push({ color, type: CardType.Number, value: i });
                this.drawPile.push({ color, type: CardType.Number, value: i });
            }

            // Add two of each special card per color
            for (const special of specialCards) {
                this.drawPile.push({ color, type: special });
                this.drawPile.push({ color, type: special });
            }
        }

        // Add wild cards (4 of each)
        for (let i = 0; i < 4; i++) {
            this.drawPile.push({ color: CardColor.Wild, type: CardType.Wild });
            this.drawPile.push({ color: CardColor.Wild, type: CardType.WildDraw4 });
        }
    }

    public drawCard(): Card {
        if (this.drawPile.length === 0) {
            this.resetDeck();
        }
        return this.drawPile.pop()!;
    }

    public discard(card: Card): void {
        this.discardPile.push(card);
    }

    public shuffle(): void {
        for (let i = 0; i < this.drawPile.length - 1; i++) {
            const j = Math.floor(Math.random() * (this.drawPile.length - i) + i);
            const temp = this.drawPile[j];
            this.drawPile[j] = this.drawPile[i];
            this.drawPile[i] = temp;
        }
    }

    public resetDeck(): void {
        this.drawPile = this.discardPile;
        this.discardPile = [];
        this.shuffle();
    }

    public getTopDiscard(): Card {
        return this.discardPile[this.discardPile.length - 1];
    }
}
