import input from './input.txt'
import {type Hand, sortHands} from "./shared.ts";
import {isMainTest} from "../../utils/bun.ts";

if (!isMainTest()) {
    console.log(solve(input))
}

export function solve(input: string): number {
    const hands = input.split(/\r?\n/).map(parseHand).sort(sortHands);
    return hands.reduce((sum, hand, rank) => sum + hand.bid * (rank + 1), 0)
}

function parseHand(line: string): Hand {
    const [cards, bid] = line.split(' ')
    const values = cards.split('').map(getCardValue)
    const jokers = cards.length - values.filter(Boolean).length
    return {
        raw: cards,
        cards: values,
        jokers,
        bid: Number(bid),
        multiplier: getHandMultiplier(values, jokers)
    } as Hand
}

function getCardValue(card: string): number {
    const CARD_SCORE: Record<string, number> = {
        'J': 0,
        'T': 10,
        'Q': 12,
        'K': 13,
        'A': 14,
    }

    return CARD_SCORE?.[card] ?? Number(card)
}

function getHandMultiplier(cards: number[], jokers: number): number {
    const distribution = Object.values(cards.filter(Boolean).reduce((distribution, card) => {
        distribution?.[card] ? distribution[card]++ : distribution[card] = 1
        return distribution
    }, {} as Record<number, number>)).sort().reverse()

    // Five of a kind
    if (distribution[0] + jokers === 5 || jokers === 5) return 7
    // Four of a kind
    if (distribution[0] + jokers === 4) return 6
    // Full house
    if (distribution[0] + jokers === 3 && distribution[1] === 2) return 5
    // Three of a kind
    if (distribution[0] + jokers === 3) return 4
    // Two pair
    if (distribution[0] + jokers === 2 && distribution[1] === 2) return 3
    // One pair
    if (distribution[0] + jokers === 2) return 2
    // High card
    return 1
}
