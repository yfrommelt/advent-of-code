export function hash(input: string): number {
    let output = 0
    input.split('').forEach((char) => {
        output += char.codePointAt(0) ?? 0
        output *= 17
        output = output % 256
    })

    return output
}
