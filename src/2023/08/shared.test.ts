import { expect, test } from 'bun:test'
import { getInstruction } from './shared.ts'

test('test getInstruction function', () => {
    expect(getInstruction('LLR', 0)).toBe('L')
    expect(getInstruction('LLR', 1)).toBe('L')
    expect(getInstruction('LLR', 2)).toBe('R')
    expect(getInstruction('LLR', 3)).toBe('L')
    expect(getInstruction('LLR', 8)).toBe('R')
    expect(getInstruction('LLR', 9)).toBe('L')
})
