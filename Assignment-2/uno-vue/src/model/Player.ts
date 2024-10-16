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
    
    public playCard(index: number): Card | undefined {
        if (this.hand[index]) {
            const card = this.hand[index];
            return this.hand.splice(index, 1)[0]; 
        }
        return undefined;
    }

    public callUno() {
        this.unoCalled = true;
    }

    public resetUno() {
        this.unoCalled = false;
    }

    public isEmpty(): boolean {
        return this.hand.length === 0;
    }
}
