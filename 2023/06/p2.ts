import input from './input.txt'
import {getWinOptionCount, type Race} from "./shared.ts";

console.log(solve(input))

export function solve(input: string): number {
    const [timesInput, distancesInput] = input.split(/\r?\n/)
    const time = Number(timesInput.match(/\d+/g)?.join('') ?? 0);
    const distance =  Number(distancesInput.match(/\d+/g)?.join('') ?? 0);

    return getWinOptionCount({time, distance} as Race)
}
