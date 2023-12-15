import { expect, test } from 'bun:test'
import { solve } from './p1.ts'
import input from './input.test.txt'

test('test solve input function', () => {
    expect(solve('HASH')).toBe(52)
    expect(solve(input)).toBe(1320)
})
