import input from './input.txt'
import { isMainTest } from '../../utils/bun.ts'

if (!isMainTest()) {
    console.log(solve(input))
}

export function solve(input: string): number {
    return input
        .split(/\r?\n/)
        .map(solveLine)
        .reduce((sum, val) => sum + val, 0)
}

export function solveLine(line: string) {
    const [schema, rawValidation] = line.split(' ')
    const validation = rawValidation.split(',').map(Number)
    const unknownMatches = [...schema.matchAll(/\?/g)]
    const unknownIdx: number[] = unknownMatches.map(
        (match) => match.index as number
    )

    const possibleArrangements = getPossibleArrangements(unknownIdx.length)

    let possibleCount = 0
    possibleArrangements.forEach((possibleArrangement) => {
        let possibleArrangementSchema = schema
        unknownIdx.forEach((index, position) => {
            possibleArrangementSchema =
                possibleArrangementSchema.substring(0, index) +
                possibleArrangement[position] +
                possibleArrangementSchema.substring(index + 1)
        })
        if (isSchemaValid(possibleArrangementSchema, validation)) {
            possibleCount++
        }
    })
    return possibleCount
}

function isSchemaValid(schema: string, validation: number[]): boolean {
    const groups = schema
        .replaceAll(/\.+/g, ' ')
        .trim()
        .split(' ')
        .map((part) => part.length)

    return (
        groups.length === validation.length &&
        groups.every((val, index) => val === validation[index])
    )
}

function getPossibleArrangements(amount: number): string[][] {
    let possibleArrangements = []
    for (let i = 0; i < 1 << amount; i++) {
        let possibleArrangement = []
        for (let j = amount - 1; j >= 0; j--) {
            possibleArrangement.push(Boolean(i & (1 << j)) ? '.' : '#')
        }
        possibleArrangements.push(possibleArrangement)
    }

    return possibleArrangements
}
