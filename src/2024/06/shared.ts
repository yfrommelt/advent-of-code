export enum Direction {
    UP = "UP",
    DOWN = "DOWN",
    LEFT = "LEFT",
    RIGHT = "RIGHT",
}

export enum InvalidMove {
    WALL = "WALL",
    EXITED = "EXITED",
}

export type LabMap = string[][];

export function move(position: [number, number], direction: Direction, map: LabMap): [number, number] {
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

export function turn(direction: Direction): Direction {
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