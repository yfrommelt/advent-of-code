import {expect, test} from "bun:test";
import {solve} from './p2.ts'
import input from './input.test.txt'

test("test solve input function", () => {
    expect(solve(input)).toBe(46);
});