type Cardinal = Pick<Node, 'n' | 's' | 'e' | 'w'>
type CardinalKeys = keyof Cardinal
type Node = {
    type: string
    x: number
    y: number
    id: string
    n: boolean
    s: boolean
    e: boolean
    w: boolean
    passedBy?: boolean
}
type Row = Node[]
type Map = Row[]

export type Point = [number, number]
export type Polygon = Point[]

export function parseMap(input: string): Map {
    return input.split(/\r?\n/).map((line: string, y) => {
        return line.split('').map((type: string, x) => {
            return {
                type,
                x,
                y,
                id: [x, y].join('-'),
                ...getNodeCardinalOutputs(type),
            }
        })
    })
}

export function solveMaze(map: Map) {
    const startingPoint = getStartingPoint(map)
    const polygon: Polygon = []
    let steps = 0
    let node: Node = startingPoint
    let prev: Node | undefined = undefined
    while (true) {
        const surroundingNodes = getSurroundingNodes(node, map).filter(
            (surroundingNode) => surroundingNode.id !== prev?.id
        )
        const next = surroundingNodes.at(0) as Node
        prev = node
        node = next
        node.passedBy = true
        polygon.push([node.x, node.y])
        steps++

        if (node.type === 'S' && prev !== undefined) {
            break
        }
    }

    return { steps, polygon }
}

function getNodeCardinalOutputs(type: string): Cardinal {
    switch (type) {
        case 'S':
            return { n: true, s: true, e: true, w: true }
        case '|':
            return { n: true, s: true, e: false, w: false }
        case '-':
            return { n: false, s: false, e: true, w: true }
        case 'L':
            return { n: true, s: false, e: true, w: false }
        case 'J':
            return { n: true, s: false, e: false, w: true }
        case '7':
            return { n: false, s: true, e: false, w: true }
        case 'F':
            return { n: false, s: true, e: true, w: false }
        case '.':
        default:
            return { n: false, s: false, e: false, w: false }
    }
}

function getStartingPoint(map: Map): Node {
    let startingPoint: Node = map[0][0]
    map.some((row) =>
        row.some((node) => {
            startingPoint = node
            return node.type === 'S'
        })
    )

    return startingPoint
}

function getSurroundingNodes(node: Node, map: Map): Node[] {
    const all: Record<CardinalKeys, Node | undefined> = {
        n: map[node.y - 1]?.[node.x],
        s: map[node.y + 1]?.[node.x],
        e: map[node.y]?.[node.x + 1],
        w: map[node.y]?.[node.x - 1],
    }

    const matchingConnexion: Record<CardinalKeys, CardinalKeys> = {
        n: 's',
        s: 'n',
        e: 'w',
        w: 'e',
    }

    Object.keys(all).forEach((key: string) => {
        const cardinal = key as CardinalKeys
        if (
            !node[cardinal] ||
            !all?.[cardinal]?.[matchingConnexion[cardinal]]
        ) {
            delete all[cardinal]
        }
    })

    return Object.values(all).filter(Boolean) as Node[]
}