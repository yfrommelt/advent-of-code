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

    let existed = false;
    const visited = new Set<string>([currentPosition.join("-")]);

    while (!existed) {
        try {
            currentPosition = move(currentPosition, currentDirection, map);
            visited.add(currentPosition.join("-"));
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
    }

    return visited.size;
}
