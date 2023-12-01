import input from './input.txt'

console.log(solve(input))

export function solve(input: string): number {
    return input.split(/\r?\n/).map(parse).reduce((sum, val) => sum + val, 0)
}

export function parse(line: string): number {
    const numbers = line.replaceAll(/\D/g, '')
    return Number([numbers.at(0) ?? '0', numbers.at(-1) ?? '0'].join(''))
}