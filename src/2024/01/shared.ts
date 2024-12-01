type Locations = { l: number[], r: number[] };


export const parse = (input: string): Locations => {
    const locations: Locations = {
        l: [],
        r: []
    };
    input
        .split(/\r?\n/)
        .map(pair => pair.split(/\s+/))
        .forEach(([l, r]) => {
            locations.l.push(Number(l));
            locations.r.push(Number(r));
        });

    return locations;
};