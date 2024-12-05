import input from "./input.txt";
import { isMainTest } from "../../utils/bun.ts";
import { getMiddlePageNumber, isUpdateValid, OrderingRules } from "./shared.ts";

if (!isMainTest()) {
    console.log(solve(input));
}

export function solve(input: string): number {
    const rows = input.split(/\r?\n/);

    const orderingRules: OrderingRules = {};
    let sum = 0;
    rows.forEach(row => {
        if (row.length === 0) {
            return;
        }

        if (row.includes("|")) {
            orderingRules[row] = row.split("|");
            return;
        }

        if (!isUpdateValid(orderingRules, row)) {
            const orderedRow = sortPageNumbers(orderingRules, row);
            sum += getMiddlePageNumber(orderedRow);
        }
    });

    return sum;
}

function sortPageNumbers(orderingRules: OrderingRules, row: string): string {
    return row.split(",").sort((a, b) => {
        // A negative value indicates that a should come before b.
        if (orderingRules?.[`${a}|${b}`]) {
            return -1;
        }
        // A positive value indicates that a should come after b.
        if (orderingRules?.[`${b}|${a}`]) {
            return 1;
        }

        return 0;
    }).join(",");
}