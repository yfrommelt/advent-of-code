import input from './input.txt'

console.log(solve(input))

export function solve(input: string): number {
    const [timesInput, distancesInput] = input.split(/\r?\n/)
    const times = timesInput.match(/\d+/g)?.map(Number);
    const distances = distancesInput.match(/\d+/g)?.map(Number);

    if (!times?.length || !distances?.length) {
        return 0
    }

    const races = times.map((time, index) => ({time, distance: distances[index]} as Race))

    return races.map(getWinOptionCount).reduce((sum, val) => sum * val, 1)
}

type Race = {
    time: number
    distance: number
}

function getWinOptionCount(race: Race): number {
    let winOptionCount = 0
    for (let time = 0; time < race.time; time++) {
        if (isWin(time, race)) {
            winOptionCount++
        }
    }

    return winOptionCount
}

function isWin(time: number, race: Race): boolean {
    const remainingTime = race.time - time
    return remainingTime * time > race.distance
}
