import input from './input.txt'
import {getWinOptionCount, type Race} from "./shared.ts";
import {isMainTest} from "../../utils/bun.ts";

if (!isMainTest()) {
    console.log(solve(input))
}

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