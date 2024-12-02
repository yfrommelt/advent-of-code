import { expect, test } from "bun:test";
import { isSafe, solve } from "./p1.ts";
import input from "./input.test.txt";

test("test solve input function", () => {
    expect(solve(input)).toBe(2);
});

test("test isSafe function", () => {
    expect(isSafe([7,6,4,2,1])).toBeTrue();
    expect(isSafe([1,2,7,8,9])).toBeFalse();
    expect(isSafe([9,7,6,2,1])).toBeFalse();
    expect(isSafe([1,3,2,4,5])).toBeFalse();
    expect(isSafe([8,6,4,4,1])).toBeFalse();
    expect(isSafe([1,3,6,7,9])).toBeTrue();
});
