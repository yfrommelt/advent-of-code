import input from "./input.txt";
import { isMainTest } from "../../utils/bun.ts";

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

function isSafe(report: number[]): boolean {
    if (report.length < 2) {
        return true;
    }

    const dir = report[0] - report[1] > 0 ? -1 : 1;
    let previous = report[0];

    const isUnsafe = report.some((level, i) => {
        if (i === 0) {
            return false;
        }

        if (level - previous > 3 * dir) {
            return true;
        }

        previous = level;
    });

    return !isUnsafe;
}


