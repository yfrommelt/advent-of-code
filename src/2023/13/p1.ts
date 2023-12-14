import input from './input.txt'
import { isMainTest } from '../../utils/bun.ts'
import {
    getPatternCols,
    type Mirror,
    parsePatterns,
    type Pattern,
} from './shared.ts'

if (!isMainTest()) {
    console.log(solve(input))
}

export function solve(input: string): number {
    return parsePatterns(input)
        .map(solvePattern)
        .reduce((sum, val) => sum + val, 0)
}

function solvePattern(pattern: Pattern): number {
    const scoreRows = getPatternScore(pattern)
    const scoreCols = getPatternScore(getPatternCols(pattern))

    return scoreRows * 100 + scoreCols
}

function getPatternScore(pattern: string[]): number {
    // console.log('----------------')
    // console.log(pattern.join('\n'))
    let mirrorIdx = 0
    const mirrors: Mirror[] = []
    pattern.forEach((item, index) => {
        if (item === pattern?.[index - 1]) {
            mirrors[mirrorIdx] = { isValid: true, middle: index }
            mirrorIdx++
            return
        }

        mirrors.forEach(({ isValid, middle }, mirrorIdx) => {
            if (!isValid) {
                // invalid reflexion canot became true again
                return
            } else if (middle === -1) {
                // not necessary to compute other side if middle not reached
                return
            }

            const otherSideIndex = middle - (index - middle) - 1
            if (otherSideIndex in pattern) {
                mirrors[mirrorIdx].isValid = item === pattern[otherSideIndex]
            }
        })
    })

    return (
        mirrors
            .filter(({ isValid }) => isValid)
            .map(({ middle }) => middle)
            .at(0) ?? 0
    )
}
