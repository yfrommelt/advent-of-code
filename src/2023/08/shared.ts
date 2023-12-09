type Direction = {
    L: string
    R: string
}

export type Map = Record<string, Direction>

export function parseMap(input: string): Map {
    const map: Map = {}
    input
        .split(/\r?\n/)
        .slice(2)
        .forEach((line: string) => {
            const [pos, L, R] = line
                .replaceAll(/[=,()]/g, '')
                .split(' ')
                .filter(Boolean)
            map[pos] = { L, R }
        })

    return map
}

export function getInstruction(
    instructions: string,
    steps: number
): keyof Direction {
    return instructions[steps % instructions.length] as keyof Direction
}
