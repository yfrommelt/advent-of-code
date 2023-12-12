import input from './input.txt'
import { isMainTest } from '../../utils/bun.ts'
import { expandMap, getPaireDistance, getPaires, parseMap } from './shared.ts'

if (!isMainTest()) {
    console.log(solve(input))
}

export function solve(input: string): number {
    const map = parseMap(input)
    const mapExpanded = expandMap(map, 2)
    return getPaires(mapExpanded)
        .map(getPaireDistance)
        .reduce((sum, val) => sum + val, 0)
}
