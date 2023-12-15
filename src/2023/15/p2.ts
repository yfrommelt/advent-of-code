import input from './input.txt'
import { isMainTest } from '../../utils/bun.ts'
import { hash } from './shared.ts'

if (!isMainTest()) {
    console.log(solve(input))
}

export function solve(input: string): number {
    const boxes = sortInBoxes(input)

    let output = 0
    boxes.forEach((slots, boxIdx) => {
        let slotIds = 0
        slots.forEach((value) => {
            slotIds++
            output += (boxIdx + 1) * value * slotIds
        })
    })

    return output
}

type Box = Map<string, number>

function sortInBoxes(input: string): Map<number, Box> {
    const boxes: Map<number, Box> = new Map()
    input.split(',').forEach((sequence) => {
        const [boxHash, value] = sequence.split(/[=-]/)
        const boxIdx = hash(boxHash)
        let slots = new Map<string, number>()
        if (boxes.has(boxIdx)) {
            slots = boxes.get(boxIdx) as Box
        }
        if (sequence.includes('=')) {
            slots.set(boxHash, Number(value))
        } else if (sequence.includes('-')) {
            slots.delete(boxHash)
        }
        boxes.set(boxIdx, slots)
    })

    return boxes
}
