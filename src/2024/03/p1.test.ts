import { expect, test } from "bun:test";
import { solve } from "./p1.ts";

test.each([
    ["mul(44,46)", 2024],
    ["xmul(2,4)%&mul[3,7]!@^do_not_mul(5,5)+mul(32,64]then(mul(11,8)mul(8,5))", 161],
    ["mul(4*", 0],
    ["mul(6,9!", 0],
    ["?(12,34)", 0],
    ["mul ( 2 , 4 )", 0],
])("test solve function for %s", (input, result) => {
    expect(solve(input)).toBe(result);
});