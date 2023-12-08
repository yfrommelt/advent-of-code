import {expect, test} from "bun:test";
import {getInstruction, solve} from './p1.ts'
import input1 from './input1.test.txt'
import input2 from './input2.test.txt'

test("test solve input function", () => {
    expect(solve(input1)).toBe(2);
    expect(solve(input2)).toBe(6);
});

test("test getInstruction function", () => {
    expect(getInstruction('LLR', 0)).toBe('L');
    expect(getInstruction('LLR', 1)).toBe('L');
    expect(getInstruction('LLR', 2)).toBe('R');
    expect(getInstruction('LLR', 3)).toBe('L');
    expect(getInstruction('LLR', 8)).toBe('R');
    expect(getInstruction('LLR', 9)).toBe('L');
});