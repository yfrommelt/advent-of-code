import input from './input.txt'
import { isMainTest } from '../../utils/bun.ts'

const MAX_AVAILABLE = {
    red: 12,
    green: 13,
    blue: 14,
}

if (!isMainTest()) {
    console.log(solve(input))
}

export function solve(input: string): number {
    return input
        .split(/\r?\n/)
        .map(parseGame)
        .reduce((sum, game) => sum + (game.isPossible ? game.id : 0), 0)
}

type Game = {
    id: number
    throws: Throw[]
    isPossible?: boolean
}

type Throw = {
    red?: number
    green?: number
    blue?: number
    isPossible?: boolean
}

function parseGame(line: string): Game {
    const matches = line.match(/Game\s(?<id>\d+):\s(?<throws>.*)/)
    const game: Game = {
        id: Number(matches?.groups?.id ?? 0),
        throws: [],
    }

    game.throws = matches?.groups?.throws.split('; ').map(parseThrow) ?? []
    game.isPossible = isGamePossible(game)

    return game
}

function parseThrow(subset: string): Throw {
    const set: Throw = Object.fromEntries(
        subset.split(', ').map((pair) => {
            const matches = pair.match(/(?<number>\d+)\s(?<color>\w+)/)
            return [
                matches?.groups?.color,
                Number(matches?.groups?.number ?? 0),
            ]
        })
    )
    set.isPossible = isThrowPossible(set)
    return set
}

function isThrowPossible(set: Throw): boolean {
    return (
        (set?.red ?? 0) <= MAX_AVAILABLE.red &&
        (set?.green ?? 0) <= MAX_AVAILABLE.green &&
        (set?.blue ?? 0) <= MAX_AVAILABLE.blue
    )
}

function isGamePossible(game: Game): boolean {
    return game.throws.every((subset) => subset.isPossible)
}
