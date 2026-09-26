import { useEffect, useRef, useState } from 'react';

export interface TypewriterRow {
    cmd: string;
    out: string;
    href?: string;
}

interface UseTypewriterOptions {
    charDelay?: number;
    lineDelay?: number;
    enabled?: boolean;
}

export function useTypewriter(rows: TypewriterRow[], options: UseTypewriterOptions = {}) {
    const { charDelay = 28, lineDelay = 120, enabled = true } = options;

    const [isReduced] = useState(() =>
        typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches
    );

    const [visibleLines, setVisibleLines] = useState(() => (isReduced ? rows.length : 0));
    const [typedChars, setTypedChars] = useState(() => (isReduced ? 9999 : 0));
    const [isDone, setIsDone] = useState(() => isReduced);
    const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    useEffect(() => {
        if (!enabled || isReduced) return;

        let line = 0;
        let char = 0;

        function typeNext() {
            const currentRow = rows[line];
            if (!currentRow) {
                setIsDone(true);
                return;
            }
            const text = `$ ${currentRow.cmd}`;
            if (char <= text.length) {
                setTypedChars(char);
                char++;
                timerRef.current = setTimeout(typeNext, charDelay);
            } else {
                setVisibleLines(line + 1);
                setTypedChars(0);
                line++;
                char = 0;
                timerRef.current = setTimeout(typeNext, lineDelay);
            }
        }

        timerRef.current = setTimeout(typeNext, 200);

        return () => {
            if (timerRef.current) clearTimeout(timerRef.current);
        };
    }, [enabled, isReduced, rows, charDelay, lineDelay]);

    return { visibleLines, typedChars, isDone };
}
