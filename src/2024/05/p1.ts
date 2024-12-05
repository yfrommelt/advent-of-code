import input from "./input.txt";
import { isMainTest } from "../../utils/bun.ts";

if (!isMainTest()) {
    console.log(solve(input));
}

type OrderingRules = string[][]

export function solve(input: string): number {
    const rows = input.split(/\r?\n/);

    const orderingRules: OrderingRules = [];
    let sum = 0;
    rows.forEach(row => {
        if (row.length === 0) {
            return;
        }

        if (row.includes("|")) {
            orderingRules.push(row.split("|"));
            return;
        }

        if (isUpdateValid(orderingRules, row)) {
            sum += getMiddlePageNumber(row);
        }
    });

    return sum;
}

function isUpdateValid(orderingRules: OrderingRules, row: string) {
    for (const [a, b] of orderingRules) {
        // if b is before a, then it's invalid
        const regex = new RegExp(`${b}.*${a}`);
        if (regex.test(row)) {
            return false;
        }
    }

    // valid is all rules are satisfied
    return true;
}

function getMiddlePageNumber(row: string): number {
    const pages = row.split(",");
    const middleIndex = Math.floor(pages.length / 2);
    return Number(pages[middleIndex]);
}
