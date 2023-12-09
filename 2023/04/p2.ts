import input from './input.txt'
import {isMainTest} from "../../utils/bun.ts";

if (!isMainTest()) {
    console.log(solve(input))
}

export function solve(input: string): number {
    const deck = input.split(/\r?\n/).map(parseCard)

    deck.forEach((card, index) => {
        for (let i = 1; i <= card.matches; i++) {
            if (index + i in deck) {
                deck[index + i].copies += card.copies
            }
        }
    })

    return deck.reduce((sum, card) => sum + card.copies, 0)
}

type Card = {
    number: number
    matches: number
    copies: number
}

function parseCard(line: string): Card {
    const [card, numbers] = line.split(':')
    const number = Number(card.match(/\d+/))
    const [wining, draws] = numbers.split('|')

    const winingNumber = parseNumbers(wining)
    const drawsNumber = parseNumbers(draws)

    return {
        number,
        matches: drawsNumber.filter(number => winingNumber.includes(number)).length,
        copies: 1
    } as Card
}

function parseNumbers(numbers: string): number[] {
    return numbers.trim().replaceAll(/\s+/g, '|').split('|').map(Number)
}