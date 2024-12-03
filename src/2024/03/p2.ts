import input from "./input.txt";
import { isMainTest } from "../../utils/bun.ts";

if (!isMainTest()) {
    console.log(solve(input));
}

export function solve(input: string): number {
    const doParts = input.split("do()");

    let sum = 0;
    doParts.forEach(doPart => {
        const dontParts = doPart.split("don't()");
        const [onlyDo] = dontParts;

        const matches = onlyDo.matchAll(/mul\((\d+),(\d+)\)/g);

        for (const match of matches) {
            const [, a, b] = match;
            sum += Number(a) * Number(b);
        }
    });

    return sum;
}