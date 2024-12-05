export type OrderingRules = Record<string, string[]>

export function isUpdateValid(orderingRules: OrderingRules, row: string) {
    for (const rule of Object.values(orderingRules)) {
        const [a, b] = rule;
        // if b is before a, then it's invalid
        const regex = new RegExp(`${b}.*${a}`);
        if (regex.test(row)) {
            return false;
        }
    }

    // valid is all rules are satisfied
    return true;
}

export function getMiddlePageNumber(row: string): number {
    const pages = row.split(",");
    const middleIndex = Math.floor(pages.length / 2);
    return Number(pages[middleIndex]);
}
