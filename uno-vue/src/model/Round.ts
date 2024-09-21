class Round {
    private deck: UnoDeck;
    private players: Player[];
    private currentPlayerIndex: number = 0;
    private currentCard: Card | undefined;
    private direction: number = 1; // 1 for clockwise, -1 for counterclockwise

    constructor(players: Player[]) {
        this.deck = new UnoDeck();
        this.players = players;
        this.startRound();
    }

    private startRound() {
        // Deal 7 cards to each player
        for (let i = 0; i < 7; i++) {
            this.players.forEach(player => player.draw(this.deck));
        }

        // Draw the first card for the discard pile
        this.currentCard = this.deck.drawCard();
        this.deck.discard(this.currentCard!);
        console.log(`Starting round with ${this.currentCard.value} of ${this.currentCard.color}`);
    }

    private getCurrentPlayer(): Player {
        return this.players[this.currentPlayerIndex];
    }

    public playTurn(player: Player, cardIndex: number) {
        const cardPlayed = player.playCard(cardIndex, this.currentCard!);
        if (cardPlayed) {
            this.currentCard = cardPlayed;
            this.deck.discard(cardPlayed); // Add played card to discard pile
            console.log(`${player.name} played ${cardPlayed.value} of ${cardPlayed.color}`);

            // Handle special cards
            this.handleSpecialCard(cardPlayed, player);
            player.resetUno();
        } else {
            player.draw(this.deck); // Draw a card if unable to play
            console.log(`${player.name} couldn't play and drew a card.`);
        }

        this.currentPlayerIndex = (this.currentPlayerIndex + this.direction + this.players.length) % this.players.length;
    }

    private handleSpecialCard(card: Card, player: Player) {
        if (card.type === CardType.Skip) {
            // Skip next player's turn
            this.currentPlayerIndex = (this.currentPlayerIndex + this.direction + this.players.length) % this.players.length;
        } else if (card.type === CardType.Reverse) {
            // Reverse the direction of play
            this.direction *= -1;
        } else if (card.type === CardType.Draw2) {
            // Next player draws two cards
            const nextPlayer = this.players[(this.currentPlayerIndex + this.direction + this.players.length) % this.players.length];
            nextPlayer.draw(this.deck);
            nextPlayer.draw(this.deck);
            console.log(`${nextPlayer.name} draws two cards.`);
        } else if (card.type === CardType.Wild) {
            // Choose a new color for wild
            const newColor: CardColor = CardColor.Red; // Simplified; choose color from player input in a real game
            this.currentCard!.color = newColor;
            console.log(`The new color is ${newColor}`);
        } else if (card.type === CardType.WildDraw4) {
            const nextPlayer = this.players[(this.currentPlayerIndex + this.direction + this.players.length) % this.players.length];
            for (let i = 0; i < 4; i++) {
                nextPlayer.draw(this.deck);
            }
            console.log(`${nextPlayer.name} draws four cards.`);
            // Change color logic as above
        }
    }

    public checkForWin(): Player | undefined {
        return this.players.find(player => player.isEmpty());
    }
}
