export type Hand = {
    raw: string
    cards: number[]
    jokers: number
    bid: number
    multiplier: number
}

export function sortHands(a: Hand, b: Hand): number {
    if (a.multiplier !== b.multiplier) {
        return a.multiplier - b.multiplier
    }

    // check first cards in hand
    for (let i = 0; i < a.cards.length; i++) {
        if (a.cards[i] === b.cards[i]) {
            continue
        }
        return a.cards[i] - b.cards[i]
    }

    return 0
}
