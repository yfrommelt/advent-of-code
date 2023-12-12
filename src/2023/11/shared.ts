type Node = {
    type: string
    x: number
    y: number
}
type Row = Node[]
export type Map = Row[]
type Pair = [Node, Node]

export function parseMap(input: string): Map {
    return input.split(/\r?\n/).map((line, y) =>
        line.split('').map((node, x) => ({
            type: node,
            x,
            y,
        }))
    )
}

export function expandMap(map: Map, expansion: number): Map {
    // find empty rows and cols
    const emptyRowIdx = map
        .filter((row) => !row.some((node) => node.type === '#'))
        .map((row) => row.at(0)?.y)
        .filter(Boolean) as number[]

    const cols: Record<number, Node[]> = {}
    map.forEach((row) => {
        row.forEach((node, x) => {
            if (!(x in cols)) {
                cols[x] = []
            }
            cols[x].push(node)
        })
    })
    const emptyColIdx = Object.values(cols)
        .filter((col) => !col.some((node) => node.type === '#'))
        .map((col) => col.at(0)?.x)
        .filter(Boolean) as number[]

    // expand the map
    let mapExpanded: Map = map
    mapExpanded.forEach((row, y) => {
        row.forEach((node, x) => {
            const xExpansion =
                emptyColIdx.filter((idx) => idx <= x).length * (expansion - 1)
            const yExpansion =
                emptyRowIdx.filter((idx) => idx <= y).length * (expansion - 1)
            node.x = x + xExpansion
            node.y = y + yExpansion
        })
    })

    return mapExpanded
}

export function getPaires(map: Map): Pair[] {
    const galaxies = map
        .map((row) =>
            row
                .map((node) => (node.type === '#' ? node : undefined))
                .filter(Boolean)
        )
        .flat() as Node[]

    return galaxies.flatMap((left, index) =>
        galaxies.slice(index + 1).map((right) => [left, right] as Pair)
    )
}

export function getPaireDistance([left, right]: Pair): number {
    const x = Math.max(left.x, right.x) - Math.min(left.x, right.x)
    const y = Math.max(left.y, right.y) - Math.min(left.y, right.y)
    return x + y
}
