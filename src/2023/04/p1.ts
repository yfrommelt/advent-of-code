import input from './input.txt'
import { isMainTest } from '../../utils/bun.ts'

if (!isMainTest()) {
    console.log(solve(input))
}

export function solve(input: string): number {
    return input
        .split(/\r?\n/)
        .map(parseCard)
        .reduce((sum, val) => sum + val, 0)
}

function parseCard(line: string) {
    const [, numbers] = line.split(':')
    const [wining, draws] = numbers.split('|')

    const winingNumber = parseNumbers(wining)
    const drawsNumber = parseNumbers(draws)

    let gain = 0
    drawsNumber.forEach((number) => {
        if (winingNumber.includes(number)) {
            gain = gain === 0 ? 1 : gain * 2
        }
    })

    return gain
}

function parseNumbers(numbers: string): number[] {
    return numbers.trim().replaceAll(/\s+/g, '|').split('|').map(Number)
}
