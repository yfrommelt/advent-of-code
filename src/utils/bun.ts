export function isMainTest() {
    return Bun.main.match(/\.test\.ts/)
}
