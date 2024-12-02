export const isLevelDiffUnsafe = (level: number, previous: number, dir: number): boolean => {
    const diff = level - previous;

    // The levels are either all increasing or all decreasing
    if (Math.sign(dir) !== Math.sign(diff)) {
        return true;
    }

    // Any two adjacent levels differ by at least one
    if (level === previous) {
        return true;
    }

    // Any two adjacent levels differ at most three
    if (Math.abs(diff) > Math.abs(3 * dir)) {
        return true;
    }

    // default to safe
    return false;
};