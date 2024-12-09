import input from "./input.txt";
import { isMainTest } from "../../utils/bun.ts";

if (!isMainTest()) {
    console.log(solve(input));
}

export function solve(input: string): number {
    let blocks = getBlocks(input);

    let defragmented = cleanTail(blocks);
    blocks.forEach((block, i) => {
        if (block === ".") {
            defragmented[i] = defragmented.pop() as string;
            defragmented = cleanTail(defragmented);
        }
    });
    defragmented = defragmented.filter(block => block !== undefined);

    return defragmented.reduce((sum, val, i) => sum + (Number(val) * i), 0);
}

function getBlocks(input: string): string[] {
    let blocks = "";
    let blockId = 0;
    input.split("").forEach((size, i) => {
        const isFile = (i % 2 === 0);
        blocks += new Array(Number(size)).fill(isFile ? blockId : ".").join("");

        if (isFile) {
            blockId++;
        }
    });

    return blocks.split("");
}


function cleanTail(blocks: string[]): string[] {
    const clean = [...blocks];
    while (true) {
        if (clean.at(-1) !== ".") {
            break;
        }
        clean.pop();
    }

    return clean;
}