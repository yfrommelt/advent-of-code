import input from "./input.txt";
import { isMainTest } from "../../utils/bun.ts";

if (!isMainTest()) {
    console.log(solve(input));
}

export function solve(input: string): number {
    return input
        .split(/\r?\n/)
        .map(getRowSum)
        .reduce((sum, val) => sum + val, 0);
}

function getRowSum(input: string): number {
    const matches = input.matchAll(/mul\((\d+),(\d+)\)/g);

    let sum = 0;
    for (const match of matches) {
        const [, a, b] = match;
        sum += Number(a) * Number(b);
    }

    return sum;
}