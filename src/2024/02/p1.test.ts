import { expect, test } from "bun:test";
import { solve } from "./p1.ts";
import input from "./input.test.txt";

test("test solve input function", () => {
    expect(solve(input)).toBe(2);
});

test.each([
    ["7 6 4 2 1", 1],
    ["1 2 7 8 9", 0],
    ["9 7 6 2 1", 0],
    ["1 3 2 4 5", 0],
    ["8 6 4 4 1", 0],
    ["1 3 6 7 9", 1]
])("test solve function for %s", (input, result) => {
    expect(solve(input)).toBe(result);
});