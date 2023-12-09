import input from './input.txt'
import {Almanac, Almanacs, parseInput} from "./shared.ts";
import {isMainTest} from "../../utils/bun.ts";

if (!isMainTest()) {
    console.log(solve(input))
}

type SeedRange = {
    from: number
    to: number
}

export function solve(input: string): number {
    const {seeds, almanacs} = parseInput(input)

    const seedsRange = seeds
        .map((seed, index) => {
            if (index % 2 === 0) return undefined
            return {
                from: seeds[index - 1],
                to: seeds[index - 1] + seed - 1,
            }
        })
        .filter(Boolean) as SeedRange[]

    let location = 0
    while (true) {
        const seed = getSeed(location, almanacs);
        if (seedsRange.some(({from, to}) => seed >= from && seed <= to)) {
            break;
        }
        location++
    }

    return location
}

function getSeed(location: number, almanacs: Almanacs): number {
    let lastSource: number = location
    Object.values(almanacs).reverse().forEach(almanac => {
        lastSource = getSource(lastSource, almanac)
    })
    return lastSource
}

function getSource(destination: number, almanac: Almanac): number {
    let source = destination
    almanac.some(correspondance => {
        if (destination >= correspondance.destinationStart && destination <= correspondance.destinationStart + correspondance.range) {
            source += correspondance.sourceStart - correspondance.destinationStart
            return true
        }
    })
    return source
}