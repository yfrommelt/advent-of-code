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

        if (isUpdateValid(orderingRules, row)) {
            sum += getMiddlePageNumber(row);
        }
    });

    return sum;
}
