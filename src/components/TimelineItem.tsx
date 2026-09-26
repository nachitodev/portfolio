import type { CSSProperties } from 'react';

interface TimelineItemProps {
    index: number;
    title: string;
    url?: string;
    delay?: number;
    revealed?: boolean;
    className?: string;
}

export default function TimelineItem({
    index,
    title,
    url,
    delay = 0,
    revealed = true,
    className = '',
}: TimelineItemProps) {
    const formattedIndex = `${String(index + 1).padStart(2, '0')}.`;

    return (
        <li
            className={`timeline-item ${revealed ? 'rv-slide-left' : 'rv-hidden-left'} ${className}`.trim()}
            style={{ '--rv-delay': `${delay}ms` } as CSSProperties}
        >
            <span
                className={revealed ? 'rv-num-flicker' : ''}
                style={{
                    color: 'var(--color-accent-2)',
                    flexShrink: 0,
                    minWidth: '1.8rem',
                    '--rv-delay': `${delay}ms`,
                } as CSSProperties}
            >
                {formattedIndex}
            </span>
            {url ? (
                <a
                    href={url}
                    target="_blank"
                    rel="noreferrer"
                    className="timeline-link"
                >
                    {title}
                </a>
            ) : (
                <span style={{ color: 'var(--color-dim)' }}>{title}</span>
            )}
        </li>
    );
}
