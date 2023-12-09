import {expect, test} from "bun:test";
import {solve} from './p1.ts'
import input3 from './input3.test.txt'

test("test solve input function", () => {
    expect(solve(input3)).toBe(6);
});