import input from './input.txt'

const almanacs: Record<string, Almanac> = {}

console.log(solve(input))

export function solve(input: string): number {
    let seeds: number[] = []
    let almanacKey: string = ''
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

    return Math.min(...seeds.map(getSeedLocation))
}

type Almanac = Correspondance[]

type Correspondance = {
    destinationStart: number
    sourceStart: number
    range: number
}

function getSeedLocation(seed: number): number {
    let lastDestination: number = seed
    Object.values(almanacs).forEach(almanac => {
        lastDestination = getDestination(lastDestination, almanac)
    })
    return lastDestination
}

function getDestination(source: number, almanac: Almanac): number {
    let destination = source
    almanac.some(correspondance => {
        if (source >= correspondance.sourceStart && source <= correspondance.sourceStart + correspondance.range) {
            destination += correspondance.destinationStart - correspondance.sourceStart
            return true
        }
    })
    return destination
}