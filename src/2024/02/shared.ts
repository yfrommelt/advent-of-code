export function isSafe(report: number[]): boolean {
    if (report.length < 2) {
        return true;
    }

    const dir = Math.sign(report[1] - report[0]);

    const isUnsafe = report.some((level, i) => {
        if (i === report.length - 1) {
            return false;
        }

        const next = report[i + 1];
        const diff = next - level;

        // The levels are either all increasing or all decreasing
        if (Math.sign(dir) !== Math.sign(diff)) {
            return true;
        }

        // Any two adjacent levels differ by at least one
        if (level === next) {
            return true;
        }

        // Any two adjacent levels differ at most three
        if (Math.abs(diff) > Math.abs(3 * dir)) {
            return true;
        }

        // default to safe
        return false;
    });

    return !isUnsafe;
}