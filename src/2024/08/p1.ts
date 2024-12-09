import input from "./input.txt";
import { isMainTest } from "../../utils/bun.ts";

if (!isMainTest()) {
    console.log(solve(input));
}

export function solve(input: string): number {
    const rows = input.split(/\r?\n/);
    const antennas = parseMap(rows);

    let antinodes: AntinodeMap = [];
    antennas.forEach((a) => {
        antennas.forEach((b) => {
            if (a !== b && a.frequency === b.frequency) {
                antinodes = antinodes.concat(getAntinodes(a, b));
            }
        });
    });

    const antinodesInBounds = antinodes.filter((antinode) => {
        return antinode.x >= 0 &&
            antinode.x <= rows[0].length &&
            antinode.y >= 0 &&
            antinode.y <= rows.length;
    });

    const antinodesUnique = antinodesInBounds.filter((antinode, index, self) => {
        return index === self.findIndex((node) => (
            node.x === antinode.x && node.y === antinode.y
        ));
    });

    return antinodesUnique.length;
}

type Node = {
    x: number
    y: number
    frequency: string
}

type AntennaMap = Node[]
type AntinodeMap = Node[]

function parseMap(rows: string[]): AntennaMap {
    const antennas: AntennaMap = [];
    rows.forEach((line: string, y) => {
        line.split("").forEach((frequency: string, x) => {
            if (frequency !== ".") {
                antennas.push({
                    x,
                    y,
                    frequency
                });
            }
        });
    });

    return antennas;
}

function getAntinodes(a: Node, b: Node): AntinodeMap {
    const deltaX = Math.abs(a.x - b.x);
    const deltaY = Math.abs(a.y - b.y);

    const antinodes: AntinodeMap = [];
    if (a.x < b.x && a.y < b.y) {
        antinodes.push({ x: a.x - deltaX, y: a.y - deltaY, frequency: a.frequency });
        antinodes.push({ x: b.x + deltaX, y: b.y + deltaY, frequency: a.frequency });
    } else if (a.x > b.x && a.y > b.y) {
        antinodes.push({ x: a.x + deltaX, y: a.y + deltaY, frequency: a.frequency });
        antinodes.push({ x: b.x - deltaX, y: b.y - deltaY, frequency: a.frequency });
    } else if (a.x < b.x && a.y > b.y) {
        antinodes.push({ x: a.x - deltaX, y: a.y + deltaY, frequency: a.frequency });
        antinodes.push({ x: b.x + deltaX, y: b.y - deltaY, frequency: a.frequency });
    } else if (a.x > b.x && a.y < b.y) {
        antinodes.push({ x: a.x + deltaX, y: a.y - deltaY, frequency: a.frequency });
        antinodes.push({ x: b.x - deltaX, y: b.y + deltaY, frequency: a.frequency });
    }

    return antinodes;
}