export function linspace(start: number, stop: number, n: number) {
    const delta = (stop - start) / (n - 1);
    return Array.from(Array(n), (_, i) => start + i * delta);
}

/**
 * Generates an array of n random IDs
 * @param n the number of IDs to generate
 * @returns an array of ID strings
 */
export function generateIDs(n: number) {
    const IDs = [];

    for (let i = 0; i < n; i++) {
        IDs.push(crypto.randomUUID());
    }

    return IDs;
}