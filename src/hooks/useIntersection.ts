import { useEffect, useState } from 'react';
import type { RefObject } from 'react';

export function useIntersection(ref: RefObject<HTMLElement | null>, threshold = 0.5) {
    const [visible, setVisible] = useState(false);
    useEffect(() => {
        const el = ref.current;
        if (!el) return;
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) setVisible(true);
            },
            { threshold }
        );
        observer.observe(el);
        return () => observer.disconnect();
    }, [ref, threshold]);
    return visible;
}