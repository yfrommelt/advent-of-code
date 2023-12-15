import input from './input.txt'
import { isMainTest } from '../../utils/bun.ts'
import { hash } from './shared.ts'

if (!isMainTest()) {
    console.log(solve(input))
}

export function solve(input: string): number {
    return input
        .split(',')
        .map(hash)
        .reduce((sum, val) => sum + val, 0)
}
