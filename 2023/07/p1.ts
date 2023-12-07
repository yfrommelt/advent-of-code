import input from './input.txt'

console.log(solve(input))

type Hand = {
    raw: string
    cards: number[]
    bid: number
    multiplier: number
}

export function solve(input: string): number {
    const hands = input.split(/\r?\n/).map(parseHand).sort(sortHands);
    return hands.reduce((sum, hand, rank) => sum + hand.bid * (rank + 1), 0)
}

function parseHand(line: string): Hand {
    const [cards, bid] = line.split(' ')
    const values = cards.split('').map(getCardValue)
    return {
        raw: cards,
        cards: values,
        bid: Number(bid),
        multiplier: getHandMultiplier(values)
    } as Hand
}

function getCardValue(card: string): number {
    const CARD_SCORE: Record<string, number> = {
        'T': 10,
        'J': 11,
        'Q': 12,
        'K': 13,
        'A': 14,
    }

    return CARD_SCORE?.[card] ?? Number(card)
}

function getHandMultiplier(cards: number[]): number {
    const distribution = Object.values(cards.reduce((distribution, card) => {
        distribution?.[card] ? distribution[card]++ : distribution[card] = 1
        return distribution
    }, {} as Record<number, number>))

    // Five of a kind
    if (distribution.includes(5)) return 7
    // Four of a kind
    if (distribution.includes(4)) return 6
    // Full house
    if (distribution.includes(3) && distribution.includes(2)) return 5
    // Three of a kind
    if (distribution.includes(3)) return 4
    // Two pair
    if (distribution.filter(c => c === 2).length === 2) return 3
    // One pair
    if (distribution.includes(2)) return 2
    // High card
    return 1
}

function sortHands(a: Hand, b: Hand): number {
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