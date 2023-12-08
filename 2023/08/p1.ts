import input from './input.txt'

console.log(solve(input))

export function solve(input: string): number {
    const instructions = input.split(/\r?\n/).at(0) as string
    const map = parseMap(input)

    let position = 'AAA'

    let steps = 0
    while (position !== 'ZZZ') {
        position = map[position][getInstruction(instructions, steps)]
        steps++
    }

    return steps
}

type Direction = {
    L: string
    R: string
}
type Map = Record<string, Direction>

function parseMap(input: string): Map {
    const map: Map = {}
    input.split(/\r?\n/).slice(2).forEach((line: string) => {
        const [pos, L, R] = line.replaceAll(/[=,()]/g, '').split(' ').filter(Boolean)
        map[pos] = {L, R}
    })

    return map
}

export function getInstruction(instructions: string, steps: number): keyof Direction {
    return instructions[steps % instructions.length] as keyof Direction
}