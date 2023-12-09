export type Race = {
    time: number
    distance: number
}

export function getWinOptionCount(race: Race): number {
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
