export type Grid = Row[]

export type Row = Col[]

export type Col = {
    rowIdx: number
    colIdx: number
    value: string
    isNumber: boolean
    isGearChar: boolean
}

export function getSurroundNumbers(grid: Grid, col: Col): Col[] {
    if (!col.isGearChar) {
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


export function getPartIdx(grid: Grid, col: Col): string {
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