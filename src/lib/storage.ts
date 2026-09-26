export function readFlag(key: string): boolean {
    try { return localStorage.getItem(key) === 'true'; } catch { return false; }
}

export function writeFlag(key: string, value: boolean) {
    try { localStorage.setItem(key, String(value)); } catch { return; }
}