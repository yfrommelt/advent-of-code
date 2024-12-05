import input from "./input.txt";
import { isMainTest } from "../../utils/bun.ts";

if (!isMainTest()) {
    console.log(solve(input));
}

export function solve(input: string): number {
    const rows = input.split(/\r?\n/);

    let sum = 0;
    rows.forEach((row, i) => {
        row.split("").forEach((char, j) => {
            if (char === "A" && checkSurrounding(rows, i, j)) {
                sum++;
            }
        });
    });

    return sum;
}

function checkSurrounding(rows: string[], i: number, j: number): boolean {
    const topLeft = rows[i - 1]?.[j - 1];
    const topRight = rows[i - 1]?.[j + 1];
    const bottomLeft = rows[i + 1]?.[j - 1];
    const bottomRight = rows[i + 1]?.[j + 1];

    const isTopRightToBottomLeft = (topLeft === "M" && bottomRight === "S") || topLeft === "S" && bottomRight === "M";
    const isTopLeftToBottomRight = (topRight === "M" && bottomLeft === "S") || topRight === "S" && bottomLeft === "M";

    return isTopRightToBottomLeft && isTopLeftToBottomRight;
}