import input from './input.txt'
import { getDatasets } from './shared.ts'
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

function solveLine(line: string): number {
    const datasets = getDatasets(line)
    let depth = datasets.length - 1

    // going up
    datasets[depth].push(0)
    while (depth > 0) {
        datasets[depth - 1].push(
            (datasets[depth - 1].at(-1) ?? 0) + (datasets[depth].at(-1) ?? 0)
        )
        depth--
    }

    return datasets[depth].at(-1) ?? 0
}
