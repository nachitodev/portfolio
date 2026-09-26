import { useEffect, useState } from 'react';

export function useTimecode() {
    const [tc, setTc] = useState({ h: 0, m: 0, s: 0, f: 0 });
    useEffect(() => {
        const id = setInterval(() => {
            setTc(prev => {
                let { h, m, s, f } = prev;
                f++;
                if (f >= 30) { f = 0; s++; }
                if (s >= 60) { s = 0; m++; }
                if (m >= 60) { m = 0; h++; }
                return { h, m, s, f };
            });
        }, 1000 / 30);
        return () => clearInterval(id);
    }, []);
    const p = (n: number) => String(n).padStart(2, '0');
    return `${p(tc.h)}:${p(tc.m)}:${p(tc.s)}:${p(tc.f)}`;
}