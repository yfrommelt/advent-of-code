import input from "./input.txt";
import { isMainTest } from "../../utils/bun.ts";
import { parse } from "./shared.ts";

if (!isMainTest()) {
    console.log(solve(input));
}

export function solve(input: string): number {
    const locations = parse(input);

    locations.l.sort();
    locations.r.sort();

    let distance = 0;
    locations.l.forEach((l, i) => {
        const r = locations.r[i];
        distance += Math.abs(l - r);
    });

    return distance;
}


