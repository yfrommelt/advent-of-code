type Patterns = Pattern[]
export type Pattern = string[]

export function parsePatterns(input: string): Patterns {
    const patterns: Patterns = [[]]
    let patternIdx = 0

    input.split(/\r?\n/).forEach((line: string) => {
        if (line.length === 0) {
            patternIdx++
            patterns[patternIdx] = []
            return
        }

        patterns[patternIdx].push(line)
    })

    return patterns
}

export function getPatternCols(pattern: Pattern): string[] {
    const cols: string[] = []
    const firstRow = pattern.at(0) ?? ''

    for (let col = 0; col < firstRow?.length; col++) {
        cols.push(pattern.map((row) => row[col]).join(''))
    }

    return cols
}

export type Mirror = {
    isValid: boolean
    middle: number
}
