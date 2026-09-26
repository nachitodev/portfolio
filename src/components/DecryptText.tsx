import { useEffect, useRef, useState } from 'react';

const GLITCH_CHARS = '!<>-_\\/[]{}—=+*^?#_';

interface DecryptTextProps {
    text: string;
    className?: string;
    duration?: number;
    delay?: number;
}

export default function DecryptText({ text, className, duration = 1000, delay = 0 }: DecryptTextProps) {
    const [display, setDisplay] = useState(() => text.split('').map(() => ' '));
    const frameRef = useRef<ReturnType<typeof setInterval> | null>(null);
    const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    useEffect(() => {
        const chars = text.split('');
        const resolved = new Array(chars.length).fill(false);
        const scrambleCycles = 8;
        const staggerPerChar = duration / (chars.length + scrambleCycles);
        let cycleCount = 0;

        timeoutRef.current = setTimeout(() => {
            frameRef.current = setInterval(() => {
                setDisplay(
                    chars.map((ch, i) => {
                        if (ch === ' ') return ' ';
                        if (resolved[i]) return ch;
                        const revealAt = scrambleCycles + i;
                        if (cycleCount >= revealAt) {
                            resolved[i] = true;
                            return ch;
                        }
                        return GLITCH_CHARS[Math.floor(Math.random() * GLITCH_CHARS.length)];
                    })
                );

                cycleCount++;

                if (resolved.every(Boolean)) {
                    if (frameRef.current !== null) clearInterval(frameRef.current);
                }
            }, staggerPerChar);
        }, delay);

        return () => {
            if (timeoutRef.current !== null) clearTimeout(timeoutRef.current);
            if (frameRef.current !== null) clearInterval(frameRef.current);
        };
    }, [text, duration, delay]);

    return <span className={className}>{display.join('')}</span>;
}
