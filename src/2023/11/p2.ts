import input from './input.txt'
import { isMainTest } from '../../utils/bun.ts'
import { expandMap, getPaireDistance, getPaires, parseMap } from './shared.ts'

if (!isMainTest()) {
    console.log(solve(input, 1_000_000))
}

export function solve(input: string, expansion: number): number {
    const map = parseMap(input)
    const mapExpanded = expandMap(map, expansion)
    return getPaires(mapExpanded)
        .map(getPaireDistance)
        .reduce((sum, val) => sum + val, 0)
}
