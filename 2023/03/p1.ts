import input from './input.txt'

console.log(solve(input))

export function solve(input: string): number {
    const grid = parseGrid(input)
    const partsNumbers = getPartsNumbers(grid)
    return partsNumbers.reduce((sum, partNumber) => sum + partNumber, 0)
}

type Grid = Row[]

type Row = Col[]

type Col = {
    rowIdx: number
    colIdx: number
    value: string
    isNumber: boolean
    isSpecialChar: boolean
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
                isSpecialChar: Boolean(col.match(/[^\d.]/)),
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

function getSurroundNumbers(grid: Grid, col: Col): Col[] {
    if (!col.isSpecialChar) {
        return []
    }
    const {rowIdx, colIdx} = col

    const output: Col[] = []
    for (let r = rowIdx - 1; r <= rowIdx + 1; r++) {
        for (let c = colIdx - 1; c <= colIdx + 1; c++) {
            if (r in grid && c in grid[r] && grid[r][c].isNumber) {
                output.push(grid[r][c])
            }
        }
    }

    return output
}


function getPartIdx(grid: Grid, col: Col): string {
    const row = grid[col.rowIdx]
    let partNumber = col.value
    let firstColIdx = col.colIdx

    let colIdx = col.colIdx - 1
    while (colIdx !== -1) {
        if (colIdx in row && row[colIdx].isNumber) {
            partNumber = row[colIdx].value + partNumber
            firstColIdx = row[colIdx].colIdx
            colIdx--
        } else {
            colIdx = -1
        }
    }

    colIdx = col.colIdx + 1
    while (colIdx !== -1) {
        if (colIdx in row && row[colIdx].isNumber) {
            partNumber = partNumber + row[colIdx].value
            colIdx++
        } else {
            colIdx = -1
        }
    }

    return [col.rowIdx, firstColIdx, partNumber].join('-')
}