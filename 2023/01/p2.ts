import input from './input.txt'

console.log(solve(input))

export function solve(input: string): number {
    return input.split(/\r?\n/).map(parse).reduce((sum, val) => sum + val, 0)
}

export function parse(line: string): number {
    let numbers = ''
    for (let i = 0; i < line.length; i++) {
        if (Number.isFinite(Number(line.at(i)))) {
            numbers += line.at(i)
            continue
        }
        const parsedDigit = replaceAlpha(line.substring(i, i + 5))
        if (parsedDigit !== '' && Number.isFinite(Number(parsedDigit))) {
            numbers += parsedDigit
        }
    }
    return Number([numbers.at(0) ?? '', numbers.at(-1) ?? ''].join(''))
}

function replaceAlpha(slice: string): string {
    return slice
        .replaceAll(/one/g, '1')
        .replaceAll(/two/g, '2')
        .replaceAll(/three/g, '3')
        .replaceAll(/four/g, '4')
        .replaceAll(/five/g, '5')
        .replaceAll(/six/g, '6')
        .replaceAll(/seven/g, '7')
        .replaceAll(/eight/g, '8')
        .replaceAll(/nine/g, '9')
        .replaceAll(/\D/g, '')
}