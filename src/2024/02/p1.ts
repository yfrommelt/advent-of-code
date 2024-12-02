import input from "./input.txt";
import { isMainTest } from "../../utils/bun.ts";
import { isLevelDiffUnsafe } from "./shared.ts";

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

export function isSafe(report: number[]): boolean {
    if (report.length < 2) {
        return true;
    }

    const dir = Math.sign(report[1] - report[0]);
    let previous = report[0];

    const isUnsafe = report.some((level, i) => {
        if (i === 0) {
            return false;
        }

        if (isLevelDiffUnsafe(level, previous, dir)) {
            return true;
        }

        previous = level;
    });

    return !isUnsafe;
}


