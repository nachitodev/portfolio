import { useEffect, useRef, useState } from 'react';

export function useScrollReveal(threshold = 0.18, rootMargin = '0px') {
    const ref = useRef<HTMLElement | null>(null);
    const [revealed, setRevealed] = useState(() =>
        typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches
    );

    useEffect(() => {
        if (revealed) return;
        const el = ref.current;
        if (!el) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setRevealed(true);
                    observer.unobserve(entry.target);
                }
            },
            { threshold, rootMargin }
        );

        observer.observe(el);
        return () => observer.disconnect();
    }, [revealed, threshold, rootMargin]);

    return { ref, revealed };
}

export const useReveal = useScrollReveal;
