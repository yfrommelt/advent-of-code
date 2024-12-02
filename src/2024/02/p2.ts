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
        .filter(isSafeTolerance)
        .length;
}

function isSafeTolerance(report: number[]): boolean {
    if (isSafe(report)) {
        return true;
    }

    const reports = report.map((_, i) => report.slice(0, i).concat(report.slice(i + 1)));

    return reports.some(isSafe);
}
