import input from './input.txt'
import {getInstruction, parseMap} from "./shared.ts";
import {isMainTest} from "../../utils/bun.ts";

if (!isMainTest()) {
    console.log(solve(input))
}

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
