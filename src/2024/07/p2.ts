import input from "./input.txt";
import { isMainTest } from "../../utils/bun.ts";
import { resultIfValid } from "./shared.ts";

if (!isMainTest()) {
    console.log(solve(input));
}

export function solve(input: string): number {
    return input.split(/\r?\n/)
        .map((row) => resultIfValid(row, 3))
        .reduce((sum, val) => sum + val, 0);
}

