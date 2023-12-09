import { expect, test } from 'bun:test'
import { solve } from './p1.ts'
import input1 from './input1.test.txt'
import input2 from './input2.test.txt'

test('test solve input function', () => {
    expect(solve(input1)).toBe(2)
    expect(solve(input2)).toBe(6)
})
