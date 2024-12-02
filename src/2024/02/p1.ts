import input from "./input.txt";
import { isMainTest } from "../../utils/bun.ts";
import { isSafe } from "./shared.ts";

if (!isMainTest()) {
    console.log(solve(input));
}

export function solve(input: string): number {
    return input
        .split(/\r?\n/)
        .map(report => report.split(/\s+/).map(Number))
        .filter(isSafe)
        .length;
}
