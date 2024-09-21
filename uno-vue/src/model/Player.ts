class Player {
    public hand: Card[] = [];
    public unoCalled: boolean = false;

    constructor(public name: string) {}

    public draw(deck: UnoDeck) {
        const card = deck.drawCard();
        if (card) {
            this.hand.push(card);
        }
    }
    
    public playCard(index: number, topCard: Card): Card | undefined {
        if (this.hand[index]) {
            const card = this.hand[index];
            const isMatch =
                card.color === topCard.color ||
                card.value === topCard.value ||
                card.type === CardType.Wild;

            if (isMatch) {
                return this.hand.splice(index, 1)[0]; 
            }
        }
        return undefined;
    }

    public callUno() {
        this.unoCalled = true;
    }

    public resetUno() {
        this.unoCalled = false;
    }
}
