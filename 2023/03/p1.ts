import input from './input.txt'
import {type Col, getPartIdx, getSurroundNumbers, type Grid} from "./shared.ts";

console.log(solve(input))

export function solve(input: string): number {
    const grid = parseGrid(input)
    const partsNumbers = getPartsNumbers(grid)
    return partsNumbers.reduce((sum, partNumber) => sum + partNumber, 0)
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
                isGearChar: Boolean(col.match(/[^\d.]/)),
            }
        })
    })
    return grid
}

function getPartsNumbers(grid: Grid): number[] {
    let partsNumbers: Col[] = []
    grid.forEach(row => {
        row.forEach(col => {
            partsNumbers = partsNumbers.concat(getSurroundNumbers(grid, col))
        })
    })

    let partsIdx: string[] = []
    partsNumbers.forEach(col => {
        partsIdx = partsIdx.concat(getPartIdx(grid, col))
    })
    partsIdx = [...(new Set([...partsIdx]))]

    return partsIdx.map(partIdx => Number(partIdx.split('-').at(2)))
}

