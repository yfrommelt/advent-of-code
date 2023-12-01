import {expect, test} from "bun:test";
import {parse, solve} from './p1.ts'

test("test parse line function", () => {
    expect(parse('1abc2')).toBe(12);
    expect(parse('pqr3stu8vwx')).toBe(38);
    expect(parse('a1b2c3d4e5f')).toBe(15);
    expect(parse('treb7uchet')).toBe(77);
});

test("test solve input function", () => {
    expect(solve(`1abc2
pqr3stu8vwx
a1b2c3d4e5f
treb7uchet`)).toBe(142);
});