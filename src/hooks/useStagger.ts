export function getStaggerDelay(index: number, step = 60, base = 0): number {
    return base + index * step;
}

export function useStagger(count: number, step = 60, base = 0): number[] {
    return Array.from({ length: count }, (_, i) => getStaggerDelay(i, step, base));
}
