import input from "./input.txt";
import { isMainTest } from "../../utils/bun.ts";
import { Direction, InvalidMove, LabMap, move, turn } from "./shared.ts";

if (!isMainTest()) {
    console.log(solve(input));
}

export function solve(input: string): number {
    let startingPosition: [number, number] = [0, 0];
    let startingDirection = Direction.UP;

    const map: LabMap = input
        .split(/\r?\n/)
        .map((row: string, x) => row.split("").map((cell: string, y) => {
            if (![".", "#"].includes(cell)) {
                startingPosition = [x, y];
            }

            return cell;
        }));

    let currentPosition = startingPosition;
    let currentDirection: Direction = startingDirection;

    let existed = false;
    const visited = new Map<string, Direction>();
    visited.set(currentPosition.join("-"), currentDirection);
    const blocked = new Set<string>();

    while (!existed) {
        try {
            currentPosition = move(currentPosition, currentDirection, map);
            if (visited.has(currentPosition.join("-")) &&
                visited.get(currentPosition.join("-")) === turn(currentDirection)) {
                const blockPosition = move(currentPosition, currentDirection, map);

                if (!blocked.has(blockPosition.join("-"))) {
                    blocked.add(blockPosition.join("-"));

                    // restart
                    currentPosition = startingPosition;
                    currentDirection = startingDirection;
                }
            }
            visited.set(currentPosition.join("-"), currentDirection);
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

    return blocked.size;
}
