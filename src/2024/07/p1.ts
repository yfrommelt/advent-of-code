import input from "./input.txt";
import { isMainTest } from "../../utils/bun.ts";

if (!isMainTest()) {
    console.log(solve(input));
}

export function solve(input: string): number {
    return input.split(/\r?\n/)
        .map(resultIfValid)
        .reduce((sum, val) => sum + val, 0);
}

function resultIfValid(row: string): number {
    const [rawExpected, rawParts] = row.split(": ");

    const expected = Number(rawExpected);
    const parts = rawParts.split(" ").map(Number);


    const combinations = getCombinations(parts.length - 1);

    const isValid = combinations.some((combination) => {
        let result = parts[0];
        combination.split("").forEach((val, index) => {
            if (val === "+") {
                result = result + parts[index + 1];
            }
            if (val === "*") {
                result = result * parts[index + 1];
            }
        });

        return result === expected;
    });

    return isValid ? expected : 0;
}

function getCombinations(size: number): string[] {
    const combinations: string[] = [];
    for (let i = 0; i < 2 ** size; i++) {
        combinations.push(i.toString(2).padStart(size, "0").replace(/0/g, "+").replace(/1/g, "*"));
    }

    return combinations;
}