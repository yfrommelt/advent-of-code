import input from './input.txt'

console.log(solve(input))

export function solve(input: string): number {
    return input.split(/\r?\n/).map(solveLine).reduce((sum, val) => sum + val, 0)
}

function solveLine(line: string): number {
    const dataset = line.split(' ').map(Number)
    const datasets = [dataset]

    // going down
    let depth = 0
    while (true) {
        if (isAllZero(datasets[depth])) {
            break
        }
        datasets[depth + 1] = subtractDataset(datasets[depth])
        depth++
    }

    // going up
    datasets[depth] = datasets[depth].concat(0)
    while (depth > 0) {
        datasets[depth - 1].push((datasets[depth - 1].at(-1) ?? 0) + (datasets[depth].at(-1) ?? 0))
        depth--
    }

    return datasets[depth].at(-1) ?? 0
}

function subtractDataset(dataset: number[]): number[] {
    const output = []
    for (let i = 0; i < dataset.length - 1; i++) {
        output.push(dataset[i + 1] - dataset[i])
    }

    return output
}

function isAllZero(dataset: number[]): boolean {
    return !dataset.some(n => n !== 0)
}