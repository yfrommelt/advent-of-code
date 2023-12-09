import input from './input.txt'
import { getInstruction, parseMap } from './shared.ts'
import { isMainTest } from '../../utils/bun.ts'

if (!isMainTest()) {
    console.log(solve(input))
}

export function solve(input: string): number {
    const instructions = input.split(/\r?\n/).at(0) as string
    const map = parseMap(input)

    const startingPositions = Object.keys(map).filter((position) =>
        position.endsWith('A')
    )

    const steps = startingPositions.map((position) => {
        let steps = 0
        while (!position.endsWith('Z')) {
            position = map[position][getInstruction(instructions, steps)]
            steps++
        }

        return steps
    })

    return lcm(...steps)
}

// https://www.30secondsofcode.org/js/s/lcm/
function lcm(...arr: number[]) {
    const gcd = (x: number, y: number): number => (!y ? x : gcd(y, x % y))
    const _lcm = (x: number, y: number) => (x * y) / gcd(x, y)
    return [...arr].reduce((a, b) => _lcm(a, b))
}
