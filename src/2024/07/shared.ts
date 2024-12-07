export function resultIfValid(row: string, base: number = 2): number {
    const [rawExpected, rawParts] = row.split(": ");

    const expected = Number(rawExpected);
    const parts = rawParts.split(" ").map(Number);


    const combinations = getCombinations(parts.length - 1, base);

    const isValid = combinations.some((combination) => {
        let result = parts[0];
        combination.split("").forEach((val, index) => {
            if (val === "+") {
                result = result + parts[index + 1];
            }
            if (val === "*") {
                result = result * parts[index + 1];
            }
            if (val === "|") {
                result = Number(String(result) + String(parts[index + 1]));
            }
        });

        return result === expected;
    });

    return isValid ? expected : 0;
}

function getCombinations(size: number, base: number = 2): string[] {
    const combinations: string[] = [];
    for (let i = 0; i < base ** size; i++) {
        combinations.push(i.toString(base).padStart(size, "0").replace(/0/g, "+").replace(/1/g, "*").replace(/2/g, "|"));
    }

    return combinations;
}