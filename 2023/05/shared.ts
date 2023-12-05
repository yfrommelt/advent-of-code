export type Almanacs = Record<string, Almanac>
export type Almanac = Correspondance[]
export type Correspondance = {
    destinationStart: number
    sourceStart: number
    range: number
}

export function parseInput(input: string): { seeds: number[], almanacs: Almanacs } {
    let seeds: number[] = []
    let almanacKey: string = ''
    const almanacs: Almanacs = {}
    input.split(/\r?\n/).forEach(line => {
        if (line.length < 2) {
            return
        }

        if (line.includes(':')) {
            const [title, s] = line.split(':')
            if (title === 'seeds') {
                seeds = s.trim().split(' ').map(Number)
            }
            if (title.includes('map')) {
                almanacKey = title.split(' ').at(0) ?? ''
                almanacs[almanacKey] = []
            }
            return
        }

        const correspondance = line.split(' ')
        almanacs[almanacKey].push({
            destinationStart: Number(correspondance.at(0)),
            sourceStart: Number(correspondance.at(1)),
            range: Number(correspondance.at(2)),
        })
    })

    return {seeds, almanacs}
}
