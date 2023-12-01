import {expect, test} from "bun:test";
import {parse, solve} from './p2.ts'

test("test parse line function", () => {
    expect(parse('two1nine')).toBe(29);
    expect(parse('eightwothree')).toBe(83);
    expect(parse('abcone2threexyz')).toBe(13);
    expect(parse('xtwone3four')).toBe(24);
    expect(parse('4nineeightseven2')).toBe(42);
    expect(parse('zoneight234')).toBe(14);
    expect(parse('7pqrstsixteen')).toBe(76);
});

test("test solve input function", () => {
    expect(solve(`two1nine
eightwothree
abcone2threexyz
xtwone3four
4nineeightseven2
zoneight234
7pqrstsixteen`)).toBe(281);
});