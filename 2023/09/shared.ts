export function getDatasets(line: string): number[][] {
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

    return datasets
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