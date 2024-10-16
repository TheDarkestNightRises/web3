enum CardColor {
    Red = "Red",
    Yellow = "Yellow",
    Green = "Green",
    Blue = "Blue",
    Wild = "Wild"
}

enum CardType {
    Number = "Number",
    Skip = "Skip",
    Reverse = "Reverse",
    Draw2 = "Draw2",
    Wild = "Wild",
    WildDraw4 = "Wild_draw4"
}

interface Card {
    color : CardColor,
    type : CardType,
    value? : number
}
