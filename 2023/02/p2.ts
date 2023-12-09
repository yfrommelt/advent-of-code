import input from './input.txt'
import {isMainTest} from "../../utils/bun.ts";

if (!isMainTest()) {
    console.log(solve(input))
}

export function solve(input: string): number {
    return input.split(/\r?\n/).map(parseGame).map(getGameMaxPower).reduce((sum, val) => sum + val, 0)
}

type Game = {
    id: number
    throws: Throw[]
}

type Throw = {
    red?: number
    green?: number
    blue?: number
}

function parseGame(line: string): Game {
    const matches = line.match(/Game\s(?<id>\d+):\s(?<throws>.*)/)
    const game: Game = {
        id: Number(matches?.groups?.id ?? 0),
        throws: [],
    }

    game.throws = matches?.groups?.throws.split('; ').map(parseThrow) ?? []

    return game
}

function parseThrow(subset: string): Throw {
    return Object.fromEntries(subset.split(', ').map(pair => {
        const matches = pair.match(/(?<number>\d+)\s(?<color>\w+)/)
        return [matches?.groups?.color, Number(matches?.groups?.number ?? 0)]
    }))
}

function getGameMaxPower(game: Game): number {
    const max: Required<Throw> = {
        red: 1,
        green: 1,
        blue: 1,
    }
    game.throws.forEach(subset => {
        Object.entries(subset).forEach(([color, number]) => {
            if (max[color as keyof Throw] < number) {
                max[color as keyof Throw] = number
            }
        })
    })
    return max.red * max.green * max.blue
}