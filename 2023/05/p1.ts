import input from './input.txt'
import {type Almanac, type Almanacs, parseInput} from "./shared.ts";
import {isMainTest} from "../../utils/bun.ts";

if (!isMainTest()) {
    console.log(solve(input))
}

export function solve(input: string): number {
    const {seeds, almanacs} = parseInput(input)

    return Math.min(...seeds.map((seed) => getLocation(seed, almanacs)))
}

function getLocation(seed: number, almanacs: Almanacs): number {
    let lastDestination: number = seed
    Object.values(almanacs).forEach(almanac => {
        lastDestination = getDestination(lastDestination, almanac)
    })
    return lastDestination
}

function getDestination(source: number, almanac: Almanac): number {
    let destination = source
    almanac.some(correspondance => {
        if (source >= correspondance.sourceStart && source <= correspondance.sourceStart + correspondance.range) {
            destination += correspondance.destinationStart - correspondance.sourceStart
            return true
        }
    })
    return destination
}