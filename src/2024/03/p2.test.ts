import { expect, test } from "bun:test";
import { solve } from "./p2.ts";

test.each([
    ["xmul(2,4)&mul[3,7]!^don't()_mul(5,5)+mul(32,64](mul(11,8)undo()?mul(8,5))", 48],
    ["mul(1,1)don't()mul(1,1)do()do()mul(1,1)don't()don't()mul(1,1)", 2],
])("test solve function for %s", (input, result) => {
    expect(solve(input)).toBe(result);
});