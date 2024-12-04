import input from "./input.txt";
import { isMainTest } from "../../utils/bun.ts";

if (!isMainTest()) {
    console.log(solve(input));
}

export function solve(input: string): number {
    const rows = input.split(/\r?\n/);
    const matrix = getMatrix(rows);

    let sum = 0;
    Object.values(matrix).forEach(rows => {
        rows.forEach(row => {
            sum += countInstances(row, "XMAS");
        });
    });

    return sum;
}

function getMatrix(rows: string[]) {
    const matrix: Record<string, string[]> = {};

    // horizontal
    matrix.leftToRight = rows;
    matrix.rightToLeft = matrix.leftToRight.map(row => row.split("").reverse().join(""));

    // vertical
    matrix.topToBottom = [];
    for (let i = 0; i < rows[0].length; i++) {
        matrix.topToBottom.push(rows.map(row => row[i]).join(""));
    }
    matrix.bottomToTop = matrix.topToBottom.map(row => row.split("").reverse().join(""));

    // diagonal
    matrix.topLeftToBottomRight = getDiagonal(rows, 0);
    matrix.bottomRightToTopLeft = matrix.topLeftToBottomRight.map(row => row.split("").reverse().join(""));
    matrix.topRightToBottomLeft = getDiagonal(rows, rows.length - 1);
    matrix.bottomLeftToTopRight = matrix.topRightToBottomLeft.map(row => row.split("").reverse().join(""));

    return matrix;
}

function getDiagonal(rows: string[], offset: number) {
    const matrix = [];
    for (let j = 1 - rows.length; j < rows[0].length; j++) {
        let buffer = "";
        for (let i = 0; i < rows.length; i++) {
            buffer += rows?.[i]?.[j + (offset ? offset - i : i)] ?? "";
        }
        matrix.push(buffer);
    }

    return matrix;
}

function countInstances(haystack: string, needle: string) {
    return haystack.split(needle).length - 1;
}
