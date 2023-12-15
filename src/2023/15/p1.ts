import input from './input.txt'
import { isMainTest } from '../../utils/bun.ts'

if (!isMainTest()) {
    console.log(solve(input))
}

export function solve(input: string): number {
    return input
        .split(',')
        .map(hashSequence)
        .reduce((sum, val) => sum + val, 0)
}

function hashSequence(sequence: string): number {
    let value = 0
    sequence.split('').forEach((char) => {
        value += char.codePointAt(0) ?? 0
        value *= 17
        value = value % 256
    })

    return value
}
