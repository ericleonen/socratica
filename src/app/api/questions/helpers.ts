export function linspace(start: number, stop: number, n: number) {
    const delta = (stop - start) / (n - 1);
    return Array.from(Array(n), (_, i) => start + i * delta);
 }