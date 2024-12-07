import input from "./input.txt";
import { isMainTest } from "../../utils/bun.ts";
import { Direction, InvalidMove, LabMap, move, turn } from "./shared.ts";

if (!isMainTest()) {
    console.log(solve(input));
}

export function solve(input: string): number {
    let currentPosition: [number, number] = [0, 0];
    let currentDirection = Direction.UP;

    const map: LabMap = input
        .split(/\r?\n/)
        .map((row: string, x) => row.split("").map((cell: string, y) => {
            if (![".", "#"].includes(cell)) {
                currentPosition = [x, y];
            }

            return cell;
        }));

    let blocked = 0;
    map.forEach((row, x) => {
        row.forEach((cell, y) => {
            if (cell === ".") {
                const blockedHypothetical = JSON.parse(JSON.stringify(map));
                blockedHypothetical[x][y] = "#";
                const existed = bruteForce(blockedHypothetical, currentPosition, currentDirection);
                if (!existed) {
                    blocked++;
                }
            }
        });
    });

    return blocked;

}

function bruteForce(map: LabMap, currentPosition: [number, number], currentDirection: Direction): boolean {
    let existed = false;
    const mapSize = map.length * map[0].length;
    let sample = mapSize * 2;

    while (!existed) {
        if (sample === 0) {
            break;
        }

        try {
            currentPosition = move(currentPosition, currentDirection, map);
        } catch (e: unknown) {
            if (e instanceof Error) {
                if (e.message === InvalidMove.EXITED) {
                    existed = true;
                }

                if (e.message === InvalidMove.WALL) {
                    currentDirection = turn(currentDirection);
                }
            }
        }

        sample--;
    }

    return existed;
}
