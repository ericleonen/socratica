/**
* Generates an array of n evenly spaced numbers ranging from start to stop inclusive
* @param start 
* @param stop 
* @param n 
* @returns an array of numbers
*/
export function linspace(start: number, stop: number, n: number) {
   const delta = (stop - start) / (n - 1);
   return Array.from(Array(n), (_, i) => start + i * delta);
}