import input from "./input.txt";
import { isMainTest } from "../../utils/bun.ts";
import { parse } from "./shared.ts";

if (!isMainTest()) {
    console.log(solve(input));
}


export function solve(input: string): number {
    const locations = parse(input);

    const frequency = getFrequency(locations.r);

    return locations.l
        .map((l) => l * (frequency[l] ?? 0))
        .reduce((acc, curr) => acc + curr, 0);
}

type Frequency = Record<number, number>;

function getFrequency(arr: number[]): Frequency {
    return arr.reduce((acc, curr) => {
        acc[curr] = acc[curr] ? acc[curr] + 1 : 1;
        return acc;
    }, {} as Frequency);
}

