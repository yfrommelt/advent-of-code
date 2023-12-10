import { expect, test } from 'bun:test'
import { solve } from './p2.ts'
import input3 from './input3.test.txt'
import input4 from './input4.test.txt'
import input5 from './input5.test.txt'

test('test solve input function', () => {
    expect(solve(input3)).toBe(4)
    expect(solve(input4)).toBe(8)
    expect(solve(input5)).toBe(10)
})
