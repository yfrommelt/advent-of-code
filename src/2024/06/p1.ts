import input from "./input.txt";
import { isMainTest } from "../../utils/bun.ts";

if (!isMainTest()) {
    console.log(solve(input));
}

enum Direction {
    UP = "UP",
    DOWN = "DOWN",
    LEFT = "LEFT",
    RIGHT = "RIGHT",
}

enum InvalidMove {
    WALL = "WALL",
    EXITED = "EXITED",
}

type Map = string[][];

export function solve(input: string): number {
    let currentPosition: [number, number] = [0, 0];
    let currentDirection = Direction.UP;

    const map: Map = input
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

function move(position: [number, number], direction: Direction, map: Map): [number, number] {
    const [x, y] = position;
    let nextPosition = position;
    switch (direction) {
        case Direction.UP:
            nextPosition = [x - 1, y];
            break;
        case Direction.DOWN:
            nextPosition = [x + 1, y];
            break;
        case Direction.LEFT:
            nextPosition = [x, y - 1];
            break;
        case Direction.RIGHT:
            nextPosition = [x, y + 1];
            break;
    }

    if (!map[nextPosition[0]]?.[nextPosition[1]]) {
        throw new Error(InvalidMove.EXITED);
    }

    if (map[nextPosition[0]][nextPosition[1]] === "#") {
        throw new Error(InvalidMove.WALL);
    }

    return nextPosition;
}

function turn(direction: Direction): Direction {
    switch (direction) {
        case Direction.UP:
            return Direction.RIGHT;
        case Direction.RIGHT:
            return Direction.DOWN;
        case Direction.DOWN:
            return Direction.LEFT;
        case Direction.LEFT:
            return Direction.UP;
    }
}