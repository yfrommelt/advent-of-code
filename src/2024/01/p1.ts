import input from "./input.txt";
import { isMainTest } from "../../utils/bun.ts";

type Locations = { l: number[], r: number[] };
const locations: Locations = {
    l: [],
    r: []
};

if (!isMainTest()) {
    console.log(solve(input));
}

export function solve(input: string): number {
    input
        .split(/\r?\n/)
        .map(pair => pair.split(/\s+/))
        .forEach(([l, r]) => {
            locations.l.push(Number(l));
            locations.r.push(Number(r));
        });

    locations.l.sort();
    locations.r.sort();

    let distance = 0;
    locations.l.forEach((l, i) => {
        const r= locations.r[i]
        distance += Math.abs(l - r);
    });

    return distance;
}


