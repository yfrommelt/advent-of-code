import { expect, test } from 'bun:test'
import { solve } from './p2.ts'
import input from './input.test.txt'

test('test solve input function', () => {
    expect(solve(input, 10)).toBe(1030)
    expect(solve(input, 100)).toBe(8410)
})
