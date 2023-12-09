import input from './input.txt'
import {type Col, getPartIdx, getSurroundNumbers, type Grid} from "./shared.ts";
import {isMainTest} from "../../utils/bun.ts";

if (!isMainTest()) {
    console.log(solve(input))
}
export function solve(input: string): number {
    const grid = parseGrid(input)
    const gearsRatio = getGearsRatio(grid)
    return gearsRatio.reduce((sum, partNumber) => sum + partNumber, 0)
}

function parseGrid(input: string): Grid {
    const grid: Grid = []
    input.split(/\r?\n/).forEach((row, rowIdx) => {
        grid[rowIdx] = []
        row.split('').forEach((col, colIdx) => {
            grid[rowIdx][colIdx] = {
                rowIdx,
                colIdx,
                value: col,
                isNumber: Number.isInteger(Number(col)),
                isGearChar: col === '*',
            }
        })
    })
    return grid
}

function getGearsRatio(grid: Grid): number[] {
    let surroundingNumbers: Col[] = []
    grid.forEach(row => {
        row.forEach(col => {
            surroundingNumbers = surroundingNumbers.concat(filterSurroundNumbers(getSurroundNumbers(grid, col), grid))
        })
    })

    let partsIdx: string[] = []
    surroundingNumbers.forEach(col => {
        partsIdx = partsIdx.concat(getPartIdx(grid, col))
    })
    partsIdx = [...(new Set([...partsIdx]))]

    const output: number[] = []
    for (let i = 0; i < partsIdx.length - 1; i = i + 2) {
        const part1Idx = partsIdx[i]
        const part2Idx = partsIdx[i + 1]
        output.push(Number(part1Idx.split('-').at(2)) * Number(part2Idx.split('-').at(2)))
    }

    return output
}

function filterSurroundNumbers(surroundingNumbers: Col[], grid: Grid): Col[] {
    // not a gear if there is not two parts
    if (surroundingNumbers.length < 2) {
        return []
    }

    // parts in two different row
    const rowsIdx = surroundingNumbers.map(col => col.rowIdx)
    if (Math.min(...rowsIdx) !== Math.max(...rowsIdx)) {
        return surroundingNumbers
    }

    // parts in same row but seperated
    const colsIdx = surroundingNumbers.map(col => col.colIdx)
    const rowIdx = surroundingNumbers.at(0)?.rowIdx ?? 0
    const centerCol = grid[rowIdx][Math.min(...colsIdx) + 1]
    if (Math.max(...colsIdx) - Math.min(...colsIdx) > 1 && !centerCol.value.match(/\d/)) {
        return surroundingNumbers
    }

    return []
}
