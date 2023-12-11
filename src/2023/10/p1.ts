import input from './input.txt'
import { isMainTest } from '../../utils/bun.ts'
import { parseMap, solveMaze } from './shared.ts'

if (!isMainTest()) {
    console.log(solve(input))
}

export function solve(input: string): number {
    const map = parseMap(input)
    const { steps } = solveMaze(map)
    return steps / 2
}
